import { Socket } from "socket.io";
import constants from "./utils/constants";
import { createGame, DrawCard, GameInfo, JoinGame, PlayCard } from "./controllers/gameController";
import { io } from "./server";
import helpers from "./utils/helpers";
import colorPrint from "./ColorPrint";

export const socketLogic = (socket: Socket) => {
  colorPrint(94,35,"Socket Handler", `> Client ${socket.id} connected `);

  socket.on("Get-Game-List", () => {
    socket.emit("Game-List", helpers.getGameSummaries(constants.GameBoard))
  });

  socket.on("Get-Game-Info", (data) => GameInfo(socket, io, data));

  socket.on("Create-Game", (data) => createGame(socket, io, data));

  socket.on("Join-Game", (data) => JoinGame(socket, io, data));

  socket.on("Play-Card", (data) => PlayCard(socket,io, data))
  
  socket.on("Draw-Card", (data) => DrawCard(socket,io, data))

  socket.on("disconnect", () => {
    colorPrint(31,30,"Socket Handler", `> Client ${socket.id} disconnected `);
  });

  socket.on("chat message", (msg: string) => {
    console.log(`Client ${socket.id} sent message: ${msg}`);
  });
};
