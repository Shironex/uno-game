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

export const RegisterPlayer = asyncHandler(
  async (request: Request & IAddPlayerRequest, response: Response) => {
    const { id, email, firstname, lastname, username } = request.body;

    //* Does user exist in our database already?
    const duplicatePlayer = await Playermodel.findOne({ email }).lean().exec();

    if (duplicatePlayer) {
      response.status(409).json({ message: "Player Already exist" });
      return;
    }

    const userObject: IPlayer = {
      clerkid: id,
      email,
      firstname,
      lastname,
      username,
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
  }
);

export const CheckPlayerBalance = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params;
    //* Does user exist in our database already?
    const Player = await Playermodel.findOne({ clerkid: id  }).lean().exec();

    if (!Player) {
      response.status(404).json({ message: "Player not found" });
      return;
    }
  
    response.status(201).json(Player.coins);
  }
);

interface IupdatePlayerRequest {
  body: {
    id: string;
    coins: number;
  };
}

export const RemovePlayerBalance  = asyncHandler(
  async (request: Request & IupdatePlayerRequest, response: Response) => {
    const { id, coins } = request.body;
    //* Does user exist in our database already?
    const Player = await Playermodel.findOne({ clerkid: id  }).lean().exec();
    if (!Player) {
      response.status(404).json({ message: "Player not found" });
      return;
    }

    if (Player.coins < coins)
    {
      response.status(409).json({ message: "Player dont have enough coins" });
      return;
    }
    
    const updatedPlayer = await Playermodel.findOneAndUpdate(
      { clerkid: id },
      { $inc: { coins: -coins } }, // subtract coins from the current balance
      { new: true } // return the updated document
    ).exec();


    if (updatedPlayer)
    {
      response.status(200).json({ message: "Balance updated successfully" });
    }
    else
    {
      response.status(500).json({ message: "Server got error when requesting data" });
      return;
    }
   
  }
);

export const AddPlayerBalance  = asyncHandler(
  async (request: Request & IupdatePlayerRequest, response: Response) => {
    const { id, coins } = request.body;
    //* Does user exist in our database already?
    const Player = await Playermodel.findOne({ clerkid: id  }).lean().exec();

    if (!Player) {
      response.status(404).json({ message: "Player not found" });
      return;
    }

    const updatedPlayer = await Playermodel.findOneAndUpdate(
      { clerkid: id },
      { $inc: { coins: +coins } }, // subtract coins from the current balance
      { new: true } // return the updated document
    ).exec();


    if (updatedPlayer)
    {
      response.status(200).json({ message: "Balance updated successfully" });
    }
    else
    {
      response.status(500).json({ message: "Server got error when requesting data" });
      return;
    }
   
  }
);
