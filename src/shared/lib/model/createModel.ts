import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Reducer<S, P = any> = (state: S, payload: P) => void;
type Effect<P = any> = (payload: P) => Promise<void>;

interface ModelConfig<S> {
  state: S;
  reducers: Record<string, Reducer<S>>;
  effects?: (dispatch: any) => Record<string, Effect>;
}

export function createModel<S>(config: ModelConfig<S>) {
  const slice = createSlice({
    name: Math.random().toString(36).substring(7),
    initialState: config.state,
    reducers: Object.keys(config.reducers).reduce((acc, key) => {
      acc[key] = (state: S, action: PayloadAction<any>) => {
        config.reducers[key](state, action.payload);
      };
      return acc;
    }, {} as any),
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
    effects: config.effects,
  };
}
