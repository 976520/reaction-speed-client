import { ApiResponse, AuthResponse, UserDto } from "@/shared/types/api";
import { AppDispatch, RootState } from "@/app/store";
import { AuthApi, LoginCredentials, RegisterCredentials } from "./types";

import { logout as logoutAction } from "@/entities/auth";
import { store } from "@/app/store";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api" as const;

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  method: ApiMethod;
  headers?: Record<string, string>;
  body?: string;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return { success: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return { success: false, error: message };
  }
}

export const authApi: AuthApi = {
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetchApi<AuthResponse>("/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      localStorage.setItem("token", response.data.token);
      toast.success("회원가입이 완료되었습니다!");
    } else {
      toast.error(response.error || "회원가입에 실패했습니다.");
    }

    return response;
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetchApi<AuthResponse>("/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      localStorage.setItem("token", response.data.token);
      toast.success("로그인되었습니다!");
    } else {
      toast.error(response.error || "로그인에 실패했습니다.");
    }

    return response;
  },

  getLeaderboard: async (): Promise<ApiResponse<UserDto[]>> => {
    return fetchApi<UserDto[]>("/leaderboard/", {
      method: "GET",
    });
  },

  validateToken: async (): Promise<ApiResponse<UserDto>> => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, error: "No token found" };

    return fetchApi<UserDto>("/validate-token/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  logout: (): void => {
    localStorage.removeItem("token");
    (store.dispatch as AppDispatch)(logoutAction());
    toast.info("로그아웃되었습니다.");
  },
};
