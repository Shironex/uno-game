import { Server, Socket } from "socket.io";
import { type Card, type Game, type GameSummary } from "types/type";

export default {
  getGameSummaries(games: Game[]): GameSummary[] {
    return games.map((game) => {
      const playerSummaries = game.players.map((player) => ({
        name: player.name,
        coins: 0,
      }));
      return {
        id: game.id,
        name: game.name,
        coins: game.coins,
        leader: game.leader,
        players: playerSummaries,
        maxplayers: game.maxplayers,
        status: game.status,
        gamemode: game.gamemode,
      };
    });
  },
  findGameByName: (name: string, gameBoard: Game[]) =>
    gameBoard.find((game) => game.name === name),
  findRoomByName: (io: Server, name: string) => {
    return io.sockets.adapter.rooms.get(name);
  },
  findSocketInRoom: (io: Server, socket: Socket, name: string) =>
  {
    const room = io.sockets.adapter.rooms.get(name);
    if (room && room.has(socket.id)) {
      return true;
    }
    return false;
  },
  RemoveSocketInRoom: (io: Server, name: string) => {
    const room = io.sockets.adapter.rooms.get(name);
    if (room)
    {
      room.forEach((socketPlayer) => {
        const player = io.sockets.sockets.get(socketPlayer);
        if (player)
        {
          player.leave(name);
        }
        const deletedRoom = io.sockets.adapter.rooms.delete(name);
        console.log(deletedRoom);
      })
    }
  },
  JoinRoomByName: (io: Server, socket: Socket, name: string) => {
    const allRooms = io.sockets.adapter.rooms.get(name);
    return socket.join(name);
  },
  shuffleArray: <T>(array: T[]): T[] => {
    let currentIndex: number = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  isSpecialCard: (card: string): boolean => {
    return (
      card.startsWith("skip") ||
      card.startsWith("_") ||
      card.startsWith("D2") ||
      card === "W" ||
      card === "D4W"
    );
  },
  isValidCard: (card: string, topCard: Card) => {

      const color = card[card.length - 1];
      const value = card.substring(0, card.length - 1);
    
      const topColor = topCard.color || topCard.src[topCard.src.length - 1];
      const topValue = topCard.src.substring(0, topCard.src.length - 1);
      if (color === topColor || value === topValue)
      {
        return true;
      }
      else
      {
        return false;
      }
  }
};
