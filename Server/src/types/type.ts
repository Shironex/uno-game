import { Server, Socket as socket } from "socket.io";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Game {
  id: number;
  name: string;
  creator: string;
  players: {
    name: string;
    deck?: { src: string }[];
  }[];
  maxPlayers: number;
  currentPlayerTurn: string;
  drawPile: Card[];
  discardPile: Card[];
  status: "waiting" | "in progress" | "finished";
  started: boolean,
}

export type Io = Server;
export type Socket = socket;
export type Card = { src: string, color?: string }