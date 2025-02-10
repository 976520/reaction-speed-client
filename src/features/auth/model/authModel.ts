import { AuthApi } from "../api/types";
import { User } from "@/entities/auth/model/types";
import { createModel } from "@/shared/lib/model/createModel";
import { toast } from "react-toastify";

export const authModel = createModel({
  state: {
    user: null as User | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  },

  reducers: {
    setUser(state, user: User | null) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      toast.info("로그아웃되었습니다.");
    },
  },

  effects: (dispatch) => ({
    async login(credentials: AuthApi["login"]) {
      dispatch.setLoading(true);
      try {
        const response = await AuthApi.login(credentials);
        if (response.success && response.data?.token) {
          localStorage.setItem("token", response.data.token);
          dispatch.setUser(response.data.user);
          toast.success("로그인되었습니다!");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "로그인에 실패했습니다.";
        dispatch.setError(message);
        toast.error(message);
      } finally {
        dispatch.setLoading(false);
      }
    },
  }),
});
