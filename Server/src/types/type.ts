import { Server, Socket as socket } from "socket.io";

export interface Game {
  id: number;
  name: string;
  leader: string;
  coins: number;
  players: {
    name: string;
    deck?: { src: string }[];
  }[];
  maxplayers: number;
  currentPlayerTurn: string;
  drawPile: Card[];
  discardPile: Card[];
  status: "Currently Live" | "Finished" | "Waiting To Start";
  gamemode: "default" | "custom"; 
  started: boolean,
}

export interface GameSummary {
  id: number;
  name: string;
  leader: string;
  coins: number;
  players: {
    name: string;
    coins: number;
  }[];
  maxplayers: number;
  status: "Currently Live" | "Finished" | "Waiting To Start";
  gamemode: "default" | "custom";
}

export type Io = Server;
export type Socket = socket;
export type Card = { src: string, color?: string }