export type GameState = "waiting" | "ready" | "green" | "finished";

export interface GameSliceState {
  isInGame: boolean;
  gameId: string | null;
  gameState: GameState;
  startTime: number | null;
  reactionTime: number | null;
  isSearching: boolean;
  opponentIp: string | null;
}
