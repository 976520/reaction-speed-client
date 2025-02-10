import { Action, AnyAction, Middleware, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { WebStorage, persistReducer, persistStore } from "redux-persist";

import authReducer from "@/entities/auth/model/slice";
import gameReducer from "@/entities/game/model/slice";
import storage from "redux-persist/lib/storage";

interface PersistConfig {
  key: string;
  storage: WebStorage;
  whitelist: string[];
}

const authPersistConfig: PersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const rootReducer = combineReducers({
  game: gameReducer,
  auth: persistReducer<ReturnType<typeof authReducer>>(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

const customMiddleware: Middleware[] = [];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(customMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export interface TypedDispatch<T> {
  <A extends AnyAction>(action: A): A;
  <R>(asyncAction: ThunkAction<R, T, unknown, AnyAction>): R;
}
