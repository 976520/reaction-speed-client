import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type GameState = "waiting" | "ready" | "green" | "finished";

interface GameSliceState {
  isInGame: boolean;
  gameId: string | null;
  gameState: GameState;
  startTime: number | null;
  reactionTime: number | null;
  isSearching: boolean;
  opponentIp: string | null;
}

const initialState: GameSliceState = {
  isInGame: false,
  gameId: null,
  gameState: "waiting",
  startTime: null,
  reactionTime: null,
  isSearching: false,
  opponentIp: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
      state.isInGame = true;
    },
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload;
    },
    setStartTime: (state, action: PayloadAction<number | null>) => {
      state.startTime = action.payload;
    },
    setReactionTime: (state, action: PayloadAction<number | null>) => {
      state.reactionTime = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    resetGame: (state) => {
      state.isInGame = false;
      state.gameId = null;
      state.gameState = "waiting";
      state.startTime = null;
      state.reactionTime = null;
      state.isSearching = false;
    },
    setOpponentIp: (state, action: PayloadAction<string | null>) => {
      state.opponentIp = action.payload;
    },
  },
});

export const { setGameId, setGameState, setStartTime, setReactionTime, setIsSearching, resetGame, setOpponentIp } =
  gameSlice.actions;

export default gameSlice.reducer;
