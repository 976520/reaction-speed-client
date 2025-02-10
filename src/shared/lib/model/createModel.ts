import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Reducer<S> = (state: S, payload: any) => void;
type Effect = (payload: any) => Promise<void>;

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
