export type player = {
  name: string;
  coins: number;
};

export interface Game {
  id: number;
  name: string;
  coins: number;
  status: "Currently Live" | "Finished" | "Waiting To Start";
  leader: string;
  prize: number;
  players: player[];
  maxplayers: number;
  gamemode: "default" | "custom"; 
}

