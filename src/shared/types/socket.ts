export type GameAction =
  | "search_game"
  | "game_found"
  | "game_start"
  | "game_ready"
  | "game_green"
  | "game_click"
  | "game_result"
  | "game_error"
  | "opponent_left";

export interface BaseSocketMessage {
  action: GameAction;
}

export interface SearchGameMessage extends BaseSocketMessage {
  action: "search_game";
  token: string;
}

export interface GameFoundMessage extends BaseSocketMessage {
  action: "game_found";
  game_id: string;
  opponent_ip: string;
}

export interface GameStartMessage extends BaseSocketMessage {
  action: "game_start";
  game_id: string;
}

export interface GameReadyMessage extends BaseSocketMessage {
  action: "game_ready";
  game_id: string;
}

export interface GameGreenMessage extends BaseSocketMessage {
  action: "game_green";
  game_id: string;
  start_time: number;
}

export interface GameClickMessage extends BaseSocketMessage {
  action: "game_click";
  game_id: string;
  reaction_time: number;
}

export interface GameResultMessage extends BaseSocketMessage {
  action: "game_result";
  winner: string;
  reaction_times: {
    [key: string]: number;
  };
}

export interface GameErrorMessage extends BaseSocketMessage {
  action: "game_error";
  error: string;
}

export interface OpponentLeftMessage extends BaseSocketMessage {
  action: "opponent_left";
}

export type SocketMessage =
  | SearchGameMessage
  | GameFoundMessage
  | GameStartMessage
  | GameReadyMessage
  | GameGreenMessage
  | GameClickMessage
  | GameResultMessage
  | GameErrorMessage
  | OpponentLeftMessage;

export type MessageHandler = (data: SocketMessage) => void;
