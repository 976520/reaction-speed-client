import authReducer from "@/entities/auth/model/slice";
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/entities/game/model/slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
