import { Server, Socket } from "socket.io";
import { type Card, type Game } from "types/type";

export default {
  findGameByName: (name: string, gameBoard: Game[]) =>
    gameBoard.find((game) => game.name === name),
  findRoomByName: (io: Server, name) => {
    const roomId = `game-${name}`;
    return io.sockets.adapter.rooms.get(roomId);
  },
  JoinRoomByName: (socket: Socket, name: string) => {
    const roomId = `game-${name}`;
    return socket.join(roomId);
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
