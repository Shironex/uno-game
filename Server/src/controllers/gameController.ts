import constants from "../utils/constants";
import helpers from "../utils/helpers";
import { type Game, type Socket, type Io } from "../types/type";
import errorvalidate, { CustomError } from "../utils/error";
import colorPrint from "../ColorPrint";

type CreateGameData = {
  id: string;
  leader: string;
  name: string;
  maxplayers: number;
  coins: number;
};

async function removeCoinsFromBalance(id: string, coins: number): Promise<void> {
  try {
    const response = await fetch(`/api/v1/user/remove-balance`, {
      method: 'POST',
      body: JSON.stringify({ id, coins }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new CustomError(errorvalidate.PLAYER_NOT_EXIST.code, errorvalidate.PLAYER_NOT_EXIST.message )
        case 409:
          throw new CustomError(errorvalidate.NOT_ENOUGH_COINS.code, errorvalidate.NOT_ENOUGH_COINS.message )
        case 500:
          throw new CustomError(errorvalidate.INTERNAL_SERVER_ERROR.code, errorvalidate.INTERNAL_SERVER_ERROR.message )
        default:
          throw new CustomError(errorvalidate.INTERNAL_SERVER_ERROR.code, errorvalidate.INTERNAL_SERVER_ERROR.message )
      }
    }
  } catch (error) {
    console.error(error.code, error.message); // logs the error code
    throw error;
  }
}

async function AddCoinsToBalance(id: string, coins: number): Promise<void> {
  try {
    const response = await fetch(`api/v1/user/add-balance`, {
      method: 'POST',
      body: JSON.stringify({ id, coins }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new CustomError(errorvalidate.PLAYER_NOT_FOUND.code, errorvalidate.PLAYER_NOT_FOUND.message )
        case 500:
          throw new CustomError(errorvalidate.INTERNAL_SERVER_ERROR.code, errorvalidate.INTERNAL_SERVER_ERROR.message )
        default:
          throw new CustomError(errorvalidate.INTERNAL_SERVER_ERROR.code, errorvalidate.INTERNAL_SERVER_ERROR.message )
      }
    }
  } catch (error) {
    console.error(error.code, error.message); // logs the error code
    throw error;
  }
}


export const createGame = async (socket: Socket, io: Io, data: CreateGameData) => {
  const { leader, name, maxplayers, coins } = data;

  const room = helpers.findRoomByName(io, `game-${data.name}`);
  if (room) {
    socket.emit('Server Error', {code: errorvalidate.GAME_ALREADY_EXISTS.code, message:  errorvalidate.GAME_ALREADY_EXISTS.message});
  } else {
    try {
      await removeCoinsFromBalance(data.id, coins);
      colorPrint(32,36,"Create Game Handler", `> Received message from ${data.leader} to create lobby: ${data.name} `);


      const id = constants.getNewGameid();

      const Game: Game = {
        id: id,
        name,
        coins,
        leader,
        players: [{ id: data.id , name: leader }],
        maxplayers,
        currentPlayerTurn: leader,
        status: "Waiting To Start",
        gamemode: "default",
        started: false,
        discardPile: [],
        drawPile: [],
      };

      constants.GameBoard.push(Game);

      //* Join Room
      helpers.JoinRoomByName(io, socket, `game-${data.name}`);

      socket.emit("Game-Created", data.name);

      //* Emit the updated GameBoard to all the clients
      io.emit("Game-List", helpers.getGameSummaries(constants.GameBoard));

      const GameData = helpers.excludeIdFromPlayers(Game);

      socket.emit("Get-Game-Data", GameData);
    } catch (error) {
      socket.emit('Server Error', {code: error.code, message: error.message});
    }
  }
};


type JoinGameData = {
  id: string;
  username: string;
  lobby: string;
};

export const JoinGame = async (socket: Socket, io: Io, data: JoinGameData) => {
  const { username, lobby } = data;

  //* Join Game Lobby
  const GameLobby = `game-${lobby}`;
  const FindSocketInRoom = helpers.findSocketInRoom(io, socket, GameLobby);
  const GameToJoin = helpers.findGameByName(lobby)
  const IsUserInGame = helpers.IsUserInGame(GameToJoin, username);  

  if (!GameToJoin)
  {
    socket.emit("Server Error", {
      code: errorvalidate.GAME_NOT_EXIST.code,
      message: errorvalidate.GAME_NOT_EXIST.message,
    });
    return;
  }

  if (IsUserInGame)
  {
    socket.emit("Server Error", {
      code: errorvalidate.PLAYER_IN_GAME_EXIST.code,
      message: errorvalidate.PLAYER_IN_GAME_EXIST.message,
    });
    return;
  }

  if (FindSocketInRoom)
  {
    socket.emit("Server Error", {
      code: errorvalidate.INTERNAL_SERVER_ERROR.code,
      message: errorvalidate.INTERNAL_SERVER_ERROR.message,
    });
    return;
  }

  try {
    await removeCoinsFromBalance(data.id, GameToJoin.coins);

    helpers.JoinRoomByName(io, socket, GameLobby);

    GameToJoin.players.push({
      id: data.id,
      name: username,
    });

    colorPrint(32,36,"Join Game Handler", `> Player: ${username} have joined ${lobby} lobby!`);
    socket.to(GameLobby).emit("user joined", data.username);

    //* Emit update players count to others in Game
    const GameData = helpers.excludeIdFromPlayers(GameToJoin);
    io.emit("Game-Data", GameData);

    //* Emit the updated GameBoard to all the clients
    io.emit("Game-List", helpers.getGameSummaries(constants.GameBoard));

    //* Emit success Join so user will be redirect to game lobby
    socket.emit("Game-User-Join");
  } catch (error) {
    socket.emit('Server Error', {code: error.code, message: error.message});
  }

};


const GameStart = (game: Game): Game => {
  let shuffledCards = helpers.shuffleArray(constants.AllCards);

  //* Shuffle the deck until the top card is valid
  while (helpers.isSpecialCard(shuffledCards[0])) {
    shuffledCards = helpers.shuffleArray(constants.AllCards);
  }
  
  //* Our Top card going to be first card in game also we remove it so it wont be copied
  game.discardPile = [{ src: shuffledCards[0] }];
  shuffledCards.splice(0, 1);

  //* We are going to get random 7 cards from our shuffledCards to each player
  game.players = game.players.map((player) => {
    player.deck = [];
    for (let i = 0; i < 7; i++) {
      const RandomCard = Math.floor(Math.random() * shuffledCards.length);
      const newCard = {
        src: shuffledCards[RandomCard],
      };
      player.deck.push(newCard);
      shuffledCards.splice(RandomCard, 1);
    }
    return player;
  });

  //* Left cards going to be for draw in game
  game.drawPile = shuffledCards.map((card) => ({ src: card }));
  return game;
};

export const GameInfo = (socket: Socket, io: Io, name: string) => {
  const RoomName = `game-${name}`;
  const isUserInGame = helpers.findSocketInRoom(io, socket, RoomName);

  if (!isUserInGame)
  {
    //* User isnt in game lobby so we disconnect him to prevent trying to break to game
    socket.disconnect();
  }
  
  const Game = helpers.findGameByName(name)
  if (!Game)
  {
    //* Game have not been found with given name
    socket.emit("Server Error", {
      code: errorvalidate.GAME_NOT_EXIST.code,
      message: errorvalidate.GAME_NOT_EXIST.message,
    });
    return;
  }
  if (Game.players.length == Game.maxplayers && Game.status === "Waiting To Start") {
    //* Game have full lobby we can start it
    Game.status = "Currently Live";
    colorPrint(32,36,"Game Info Handler", `> Game: ${RoomName} is starting live !`);
    const GameData = helpers.excludeIdFromPlayers(GameStart(Game));
    socket.emit("Get-Game-Data", GameData);
  } 
  else
  {
    //* New Player joined and game havent started let give him game data
    const GameData = helpers.excludeIdFromPlayers(Game);
    socket.emit("Get-Game-Data", GameData);
  }
};

type PlayCardData = {
  gameId: number;
  playerName: string;
  card: string;
  color?: string;
  effect?: string;
  uno?: boolean;
};

export const PlayCard = async (socket: Socket, io: Io, data: PlayCardData) => {
  let Game = helpers.findGameById(data.gameId)
  //* Game setup check
  if (Game.started == false) {
    Game.started = true;
  }
  //* Find current player
  const player = Game.players.find((player) => player.name === data.playerName);

  if (!player || player.name !== Game.currentPlayerTurn) {
    return;
  }

  //* Find placed cacrd
  const cardIndex = player.deck.findIndex((card) => card.src === data.card);

  if (cardIndex === -1) {
    return;
  }

  //* Remove Card
  player.deck.splice(cardIndex, 1);

  //* Push it to top for dicard Pile
  Game.discardPile.push({
    src: data.card,
    ...(data.color && { color: data.color }),
  });

  //* Get Next Player Index
  const nextPlayerIndex = (Game.players.indexOf(player) + 1) % Game.players.length;
  const nextPlayer = Game.players[nextPlayerIndex];
  Game.currentPlayerTurn = nextPlayer.name;

  //* Does Player had 2 cards and placed so now he have only 1 did he said uno ?
  if (player.deck.length == 1 && !data.uno) {
    player.deck.push(...Game.drawPile.splice(-2));
  }

  //* Does Player placed his last card
  if (player.deck.length === 0) {
    const gameData = helpers.excludeIdFromPlayers(Game);

    //* Show last card before win notification
    io.to(`game-${gameData.name}`).emit("Player-Played-Card", {
      started: gameData.started,
      players: gameData.players,
      discardPile: gameData.discardPile,
      currentPlayerTurn: gameData.currentPlayerTurn,
    });

    //* Give notification for all players who lost and navigate to main lobby
    socket.to(`game-${gameData.name}`).emit("Player-Lose", player.name);

    //* Give winner his coins and emit notification
    try {
      await AddCoinsToBalance(player.id, gameData.coins * gameData.maxplayers);
    } catch (error) {
      socket.emit('Server Error', {code: error.code, message: error.message});
    }
    socket.emit("Player-Win", null);
    //* Remove game from global gameboard
    const gameIndex = constants.GameBoard.findIndex((game) => game.id === Game.id);
    constants.GameBoard.splice(gameIndex, 1);
    helpers.RemoveSocketInRoom(io, `game-${gameData.name}`);
    return;
  }

  //* Wildcard and +2 +4 cards check
  if (data.effect) {
    switch (data.effect) {
      //* + 4 card
      case "D4":
        nextPlayer.deck.push(...Game.drawPile.splice(-4));
        break;
      //* + 2 card
      case "D2":
        nextPlayer.deck.push(...Game.drawPile.splice(-2));
        break;
      //* Skip/block card
      case "Skip":
        Game.currentPlayerTurn = Game.players[(nextPlayerIndex + 1) % Game.players.length].name;
        break;
      //* Reverse turn card
      case "Reverse":
        Game.players.reverse();
        Game.currentPlayerTurn = Game.players[(nextPlayerIndex - 1 + Game.players.length) % Game.players.length].name;
        break;
      default:
        break;
    }
  }

  //* Update game board data to players
  const gameData = helpers.excludeIdFromPlayers(Game);

  io.to(`game-${gameData.name}`).emit("Player-Played-Card", {
    started: gameData.started,
    players: gameData.players,
    discardPile: gameData.discardPile,
    currentPlayerTurn: gameData.currentPlayerTurn,
  });
};

type DrawCardData = {
  gameId: number;
  playerName: string;
};

export const DrawCard = (socket: Socket, io: Io, data: DrawCardData) => {
  let game = helpers.findGameById(data.gameId);
  if (game.started == false) {
    game.started = true;
  }

  //* Get current Player
  const currentPlayer = game.players.find((player) => player.name === data.playerName);

  //* Player tjat was not his turn was trying to draw card 
  if (!currentPlayer || currentPlayer.name !== game.currentPlayerTurn) {
    socket.emit('Server Error', {code: errorvalidate.NOT_PLAYER_TURN.code, message: errorvalidate.NOT_PLAYER_TURN.message});
    return;
  }

  //* Draw cards ended we take all card expect top one from discard ans shuffle them
  if (game.drawPile.length === 0) {
    const topDiscard = game.discardPile.pop();
    game.drawPile = helpers.shuffleArray(game.discardPile);
    game.discardPile = [topDiscard];
  }

  //* Get last card from draw cards and put it to player
  const drawnCard = game.drawPile.pop();
  currentPlayer.deck.push(drawnCard);

  //* Find next player index
  const nextPlayerIndex = (game.players.indexOf(currentPlayer) + 1) % game.players.length;
  const nextPlayer = game.players[nextPlayerIndex];
  game.currentPlayerTurn = nextPlayer.name;

  //! Not finished need refactor to another function with changes
  //TODO Add logic to ask for prompts if player wanna use wild or special card
  //* If plauer draw card and it have valid number or color and its not wild or spacial card auto place it 
  const TopCard = game.discardPile[game.discardPile.length - 1];
  const NewCard = currentPlayer.deck[currentPlayer.deck.length - 1];

  if ( !helpers.isSpecialCard(NewCard.src) && helpers.isValidCard(NewCard.src, TopCard)) 
  {
    game.discardPile = [...game.discardPile, currentPlayer.deck.pop()];
    
    socket.emit(
      "Card-Placed",
      game.discardPile[game.discardPile.length - 1].src
    );
  }

  //* Send updated data to players
  const GameData = helpers.excludeIdFromPlayers(game);

  io.to(`game-${GameData.name}`).emit("Player-Played-Card", {
    started: GameData.started,
    players: GameData.players,
    drawPile: GameData.drawPile,
    discardPile: GameData.discardPile,
    currentPlayerTurn: GameData.currentPlayerTurn,
  });
};
