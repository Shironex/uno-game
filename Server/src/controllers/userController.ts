import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Playermodel, { IPlayer } from "../model/player";

interface IAddPlayerRequest {
  body: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
  };
}

const RegisterPlayer = asyncHandler(async (request: Request & IAddPlayerRequest, response: Response) => {
  const { id, email, firstname, lastname, username } = request.body;
  console.log(request.body);

  // Does user exist in our database already?
  //const duplicatePlayer = await Playermodel.findOne({ name: Player }).lean<IPlayer>().exec();

  // if (duplicatePlayer) {
  //   response.status(409).json({ message: "Player Already exist" });
  //   return;
  // }

  // Password Hash
  const userObject: IPlayer = { 
    clerkid: id,
    email,
    firstname,
    lastname,
    username
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

export default RegisterPlayer;
