import { ApiResponse } from "@/shared/types/api";
import { AuthResponse } from "@/shared/types/auth";
import { BaseApi } from "../base/api";

export class AuthApi extends BaseApi {
  static async register(username: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.fetch<AuthResponse>("/register/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  static async login(username: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.fetch<AuthResponse>("/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  static async getLeaderboard() {
    return this.fetch("/leaderboard/", {
      method: "GET",
    });
  }
}
