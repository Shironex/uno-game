import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketLogic } from "./socket";
import routes from "./routes/index";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
  })
);

//? Disable Powered by Express
app.disable("x-powered-by");

//? Json Convert
app.use(express.json());

//! Api
app.use("/api/v1/", routes);

app.use(express.static('client/build'));


//! Socket Connection
io.on("connection", socketLogic);

//! Database Connection
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});