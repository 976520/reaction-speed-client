import { User } from "@/entities/auth/model/types";

import { AuthApi } from "../api/types";
import { authApi } from "../api/authApi";
import { createModel } from "@/shared/lib/model/createModel";
import { toast } from "react-toastify";

interface AuthModelState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const authModel = createModel<AuthModelState>({
  state: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  reducers: {
    setUser(state: AuthModelState, user: User | null) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    setLoading(state: AuthModelState, loading: boolean) {
      state.loading = loading;
    },
    setError(state: AuthModelState, error: string | null) {
      state.error = error;
    },
    logout(state: AuthModelState) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      toast.info("로그아웃되었습니다.");
    },
  },

  effects: (dispatch: any) => ({
    async login(credentials: Parameters<AuthApi["login"]>[0]) {
      dispatch.setLoading(true);
      try {
        const response = await authApi.login(credentials);
        if (response.success && response.data?.token) {
          localStorage.setItem("token", response.data.token);
          dispatch.setUser(response.data.user);
          toast.success("로그인되었습니다!");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "로그인에 실패했습니다.";
        dispatch.setError(message);
        toast.error(message);
      } finally {
        dispatch.setLoading(false);
      }
    },
  }),
});
