import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Playermodel, { IPlayer } from "model/player";

interface IAddPlayerRequest {
  body: {
    Player: string;
  };
}

const addPlayer = asyncHandler(async (request: Request & IAddPlayerRequest, response: Response) => {
  const { Player } = request.body;

  // Data check
  if (!Player) {
    response.status(400).json({ message: "All field are required " });
    return;
  }

  // Does user exist in our database already?
  const duplicatePlayer = await Playermodel.findOne({ name: Player }).lean<IPlayer>().exec();

  if (duplicatePlayer) {
    response.status(409).json({ message: "Player Already exist" });
    return;
  }

  // Password Hash
  const userObject: IPlayer = { 
    email: "",
    username: "",
  };
  const newPlayer = await Playermodel.create(userObject);

  if (newPlayer) {
    response.status(201).json({
      message: `Created new Player ${newPlayer.username}`,
      username: newPlayer.username,
    });
  } else {
    response.status(400).json({ message: "Invalid user data received" });
  }
});

export default addPlayer;
