import { ApiResponse, AuthResponse, UserDto } from "@/shared/types/api";
import { AuthApi, LoginCredentials, RegisterCredentials } from "./types";

import { logout as logoutAction } from "@/entities/auth";
import { store } from "@/app/store";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api" as const;

export const authApi: AuthApi = {
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("회원가입이 완료되었습니다!");
        return { success: true, data };
      }

      toast.error(data.message || "회원가입에 실패했습니다.");
      return { success: false, error: data.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
      toast.error(message);
      return { success: false, error: message };
    }
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("로그인되었습니다!");
        return { success: true, data };
      }

      toast.error(data.message || "로그인에 실패했습니다.");
      return { success: false, error: data.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
      toast.error(message);
      return { success: false, error: message };
    }
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/leaderboard/`);
    return response.json();
  },

  validateToken: async (): Promise<ApiResponse<UserDto>> => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false };

    try {
      const response = await fetch(`${API_URL}/validate-token/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        return { success: false, error: "Token validation failed" };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      localStorage.removeItem("token");
      const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
      toast.error(message);
      return { success: false, error: message };
    }
  },

  logout: (): void => {
    localStorage.removeItem("token");
    store.dispatch(logoutAction());
    toast.info("로그아웃되었습니다.");
  },
};
