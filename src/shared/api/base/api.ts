import { API_URL } from "@/shared/config/constants";
import { ApiResponse } from "@/shared/types/api";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  method: ApiMethod;
  headers?: Record<string, string>;
  body?: string;
}

export class BaseApi {
  protected static async fetch<T>(endpoint: string, options: FetchOptions): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeader(),
          ...options.headers,
        },
      });

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

  protected static getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Token ${token}` } : {};
  }
}
