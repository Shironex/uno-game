const errorvalidate = {
  PLAYER_NOT_EXIST: {
    code: "PLAYER_NOT_EXIST",
    message: "Player do not exist in our database.",
  },
  PLAYER_NOT_FOUND: {
    code: "PLAYER_NOT_FOUND",
    message: "Player not found in our database.",
  },
  PLAYER_IN_GAME_EXIST: {
    code: "PLAYER_IN_GAME_EXIST",
    message: "Player is already in this game.",
  },
  NOT_ENOUGH_COINS: {
    code: "NOT_ENOUGH_COINS",
    message: "You do not have enough coins to create a game.",
  },
  NOT_PLAYER_TURN: {
    code: "NOT_PLAYER_TURN",
    message: "Its not you turn.",
  },
  GAME_NOT_EXIST: {
    code: "GAME_NOT_EXIST",
    message: "A game with this name dont exist.",
  },
  GAME_ALREADY_EXISTS: {
    code: "GAME_ALREADY_EXISTS",
    message: "A game with the same name already exists.",
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error. Please try again later.",
  },
  // add more error codes and messages here
};

export class CustomError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "CustomError";
    Error.captureStackTrace(this, CustomError);
  }
}

export default errorvalidate;
