import { Socket } from "socket.io";
import constants from "./utils/constants";
import { createGame, DrawCard, GameInfo, JoinGame, PlayCard } from "./controllers/gameController";
import { io } from "./server";

export const socketLogic = (socket: Socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on("Get-Game-List", () => {
    socket.emit("Game-List", constants.GameBoard)
  });

  socket.on("Get-Game-Info", (data) => GameInfo(socket, io, data));

  socket.on("Create-Game", (data) => createGame(socket, io, data));

  socket.on("Join-Game", (data) => JoinGame(socket, io, data));

  socket.on("Play-Card", (data) => PlayCard(socket,io, data))
  
  socket.on("Draw-Card", (data) => DrawCard(socket,io, data))

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });

  socket.on("chat message", (msg: string) => {
    console.log(`Client ${socket.id} sent message: ${msg}`);
  });
};
