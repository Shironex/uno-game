import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema({
  clerkid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  gameswon: { type: Number, default: 0 },
  gameslost: { type: Number, default: 0 },
  coins: { type: Number, default: 5000 },
});

export interface IPlayer {
  clerkid: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  gameswon?: number;
  gameslost?: number;
  coins?: number;
}

const Playermodel = model("User", playerSchema);

export default Playermodel;
