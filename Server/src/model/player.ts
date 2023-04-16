import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  gameswon: [{ type: Number, default: 0 }],
  gameslost: [{ type: Number, default: 0 }],
  coins: [{ type: Number, default: 100 }],
});

export interface IPlayer {
  email: string;
  username: string;
  gameswon?: number;
  gameslost?: number;
  coins?: number;
}

const Playermodel = model("User", playerSchema);

export default Playermodel;
