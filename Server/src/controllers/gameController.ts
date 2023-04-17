import constants from "../utils/constants";
import helpers from "../utils/helpers";
import { type Game, type Socket, type Io } from "../types/type";

type CreateGameData = {
  leader: string;
  name: string;
  maxplayers: number;
  coins: number;
};

export const createGame = (socket: Socket, io: Io, data: CreateGameData) => {
  const { leader, name, maxplayers, coins } = data;
  const id = constants.getNewGameid();

  const room = helpers.findRoomByName(io, `game-${data.name}`);
  if (room) {
    console.log(`Room already exist game-${data.name}`);
    console.log(room);

    socket.emit("Game-Exist");
  } else {
    console.log("Received message from client to create lobby:", data);

    const Game: Game = {
      id: id,
      name,
      coins,
      leader,
      players: [{ name: leader }],
      maxplayers,
      currentPlayerTurn: leader,
      status: "Waiting To Start",
      gamemode: "default",
      started: false,
      discardPile: [],
      drawPile: [],
    };
    constants.GameBoard.push(Game);

    //? Join Room
    helpers.JoinRoomByName(io, socket, `game-${data.name}`);

    socket.emit("Game-Created", data.name);
    //? Emit the updated GameBoard to all the clients
    io.emit("Game-List", helpers.getGameSummaries(constants.GameBoard));
    socket.emit("Get-Game-Data", Game);
  }
};

type JoinGameData = {
  username: string;
  lobby: string;
};

export const JoinGame = (socket: Socket, io: Io, data: JoinGameData) => {
  const { username, lobby } = data;

  // Join Room
  const GameLobby = `game-${lobby}`;
  const FindUserInRoom = helpers.findSocketInRoom(io, socket, GameLobby);
  const GameToJoin = constants.GameBoard.find((game) => game.name === data.lobby);
  const IsUserInGame = GameToJoin.players.some((player) => player.name === username);  
  
  console.log(IsUserInGame);

  if (!FindUserInRoom && GameToJoin && !IsUserInGame) {
    helpers.JoinRoomByName(io, socket, GameLobby);

    GameToJoin.players.push({
      name: username,
    });

    socket.to(GameLobby).emit("user joined", data.username);
    io.emit("Game-Data", GameToJoin);
    socket.emit("Game-User-Join");
  } else if (IsUserInGame) {
    socket.emit("Game-User-Exist");
  }
};

const GameStart = (Game: Game) => {
  let shuffledCards = helpers.shuffleArray(constants.AllCards);

  // Shuffle the deck until the top card is valid
  while (helpers.isSpecialCard(shuffledCards[0])) {
    shuffledCards = helpers.shuffleArray(constants.AllCards);
  }
  Game.discardPile = [{ src: shuffledCards[0] }];
  shuffledCards.splice(0, 1);

  Game.players.forEach((player, index) => {
    player.deck = [];
    for (let i = 0; i < 7; i++) {
      const RandomCard = Math.floor(Math.random() * shuffledCards.length);
      const newCard = {
        src: shuffledCards[RandomCard],
      };
      player.deck.push(newCard);
      shuffledCards.splice(RandomCard, 1);
    }
  });

  const drawPile = shuffledCards.map((card) => ({ src: card }));
  Game.drawPile = drawPile;
  return Game;
};

export const GameInfo = (socket: Socket, io: Io, data: string) => {
  const RoomName = `game-${data}`;
  const IsInGame = helpers.findSocketInRoom(io, socket, RoomName);
  // console.log(`${socket.id} want ${RoomName} Data`);

  if (IsInGame) {
    // console.log(`User ${socket.id} requested ${RoomName} data `);

    let Game = constants.GameBoard.find((game) => game.name === data);

    if (Game.players.length == Game.maxplayers && Game.status == "Waiting To Start") 
    {
      Game.status = "Currently Live";
      console.log(`Game: ${RoomName} is starting`);
      GameStart(Game);
    }

    socket.emit("Get-Game-Data", Game);
  } else {
    socket.disconnect();
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

export const PlayCard = (socket: Socket, io: Io, data: PlayCardData) => {
  let Game = constants.GameBoard.find((game) => game.id === data.gameId);
  if (Game.started == false) Game.started = true;

  Game.players.forEach(async (player, index) => {
    if ( player.name === data.playerName && player.name === Game.currentPlayerTurn) 
    {
      const cardIndex = player.deck.findIndex((card) => card.src === data.card);
      if (cardIndex !== -1) {
        player.deck.splice(cardIndex, 1);

        Game.discardPile.push({
          src: data.card,
          ...(data.color && { color: data.color }),
        });



        if (player.deck.length == 1) {
          if (data.uno) {
            //? Continue we have pressed uno
          } else {
            player.deck = [...player.deck, ...Game.drawPile.slice(-2)];
            Game.drawPile = Game.drawPile.slice(0, -2);
          }
        }

        if (player.deck.length == 0) {
          //? Player won
          io.to(`game-${Game.name}`).emit("Player-Played-Card", {
            started: Game.started,
            players: Game.players,
            discardPile: Game.discardPile,
            currentPlayerTurn: Game.currentPlayerTurn,
          });
          io.to(`game-${Game.name}`).emit("Player-Won", player.name);

          //socket.emit("Player-Gift", null);
          const GameIndex = constants.GameBoard.findIndex(
            (Game) => Game.id === Game.id
          );
          constants.GameBoard.splice(GameIndex, 1);
          helpers.RemoveSocketInRoom(io, `game-${Game.name}`);
          //TODO FIX Game Score Save
          //TODO ADD Player data
          return;
        }

        const nextPlayerIndex = (index + 1) % Game.players.length;
        Game.currentPlayerTurn = Game.players[nextPlayerIndex].name;

        if (data.effect) {
          switch (data.effect) {
            case "D4":
              Game.players[nextPlayerIndex].deck = [
                ...Game.players[nextPlayerIndex].deck,
                ...Game.drawPile.slice(-4),
              ];
              Game.drawPile = Game.drawPile.slice(0, -4);
              break;
            case "D2":
              Game.players[nextPlayerIndex].deck = [
                ...Game.players[nextPlayerIndex].deck,
                ...Game.drawPile.slice(-2),
              ];
              Game.drawPile = Game.drawPile.slice(0, -2);
              break;
            case "Skip":
              const NewIndex = (index + 2) % Game.players.length;
              Game.currentPlayerTurn = Game.players[NewIndex].name;
              break;
            case "Reverse":
              Game.players.reverse();
              Game.currentPlayerTurn = Game.players[nextPlayerIndex].name;
              break;

            default:
              break;
          }
        }

        io.to(`game-${Game.name}`).emit("Player-Played-Card", {
          started: Game.started,
          players: Game.players,
          discardPile: Game.discardPile,
          currentPlayerTurn: Game.currentPlayerTurn,
        });
      }
    }
  });
};

type DrawCardData = {
  gameId: number;
  playerName: string;
};

export const DrawCard = (socket: Socket, io: Io, data: DrawCardData) => {
  let Game = constants.GameBoard.find((game) => game.id === data.gameId);
  if (Game.started == false) Game.started = true;

  Game.players.forEach((player, index) => {
    if (
      player.name === data.playerName &&
      player.name === Game.currentPlayerTurn
    ) {
      if (Game.drawPile.length === 0) {
        // shuffle discard pile and make last card on top the new draw pile card
        const topDiscard = Game.discardPile.pop();
        Game.drawPile = helpers.shuffleArray(Game.discardPile);
        Game.discardPile = [topDiscard];
      }
      player.deck = [...player.deck, Game.drawPile.pop()];
      const nextPlayerIndex = (index + 1) % Game.players.length;
      Game.currentPlayerTurn = Game.players[nextPlayerIndex].name;

      const TopCard = Game.discardPile[Game.discardPile.length - 1];
      const NewCard = player.deck[player.deck.length - 1];
      if (
        !helpers.isSpecialCard(NewCard.src) &&
        helpers.isValidCard(NewCard.src, TopCard)
      ) {
        console.log("Walid Add");
        Game.discardPile = [...Game.discardPile, player.deck.pop()];
        socket.emit(
          "Card-Placed",
          Game.discardPile[Game.discardPile.length - 1].src
        );
      }

      io.to(`game-${Game.name}`).emit("Player-Played-Card", {
        started: Game.started,
        players: Game.players,
        drawPile: Game.drawPile,
        discardPile: Game.discardPile,
        currentPlayerTurn: Game.currentPlayerTurn,
      });
    }
  });
};
