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
  helpers.JoinRoomByName(socket, name);

  //? Emit the updated GameBoard to all the clients
  io.emit("Game-List", helpers.getGameSummaries(constants.GameBoard));
  socket.emit("Get-Game-Data", Game);
};

type JoinGameData = {
  username: string;
  lobby: string;
};

export const JoinGame = (socket: Socket, io: Io, data: JoinGameData) => {
  const { username, lobby } = data;

  //? Join Room
  const GameLobby = `game-${lobby}`;
  helpers.JoinRoomByName(socket, lobby);

  //? Notify other clients in the same room that a new user has joined
  socket.to(GameLobby).emit("user joined", data.username);
  console.log(`${username} Joined Room: ${GameLobby}`);

  //? Find the game board with the same name as data.name and increment the player count
  const foundGame = constants.GameBoard.find(
    (game) => game.name === data.lobby
  );
  if (foundGame) {
    foundGame.players.push({
      name: username,
    });
    //? Emit the updated GameBoard to all the clients
    io.emit("Game-Data", foundGame);
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
  const Room = helpers.findRoomByName(io, data);
  if (Room && Room.has(socket.id)) {
    console.log(`User ${socket.id} requested ${RoomName} data `);

    let Game = constants.GameBoard.find((game) => game.name === data);

    if (
      Game.players.length == Game.maxplayers &&
      Game.status == "Waiting To Start"
    ) {
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
    if (
      player.name === data.playerName &&
      player.name === Game.currentPlayerTurn
    ) {
      const cardIndex = player.deck.findIndex((card) => card.src === data.card);
      if (cardIndex !== -1) {
        player.deck.splice(cardIndex, 1);

        Game.discardPile.push({
          src: data.card,
          ...(data.color && { color: data.color }),
        });

        const nextPlayerIndex = (index + 1) % Game.players.length;
        Game.currentPlayerTurn = Game.players[nextPlayerIndex].name;

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
          io.to(`game-${Game.name}`).emit("Player-Won", player.name);

          //socket.emit("Player-Gift", null);
          const GameIndex = constants.GameBoard.findIndex(
            (Game) => Game.id === Game.id
          );
          constants.GameBoard.splice(GameIndex, 1);
          //TODO FIX Game Score Save
          return;
        }

        if (data.effect) {
          console.log(data.effect);
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
