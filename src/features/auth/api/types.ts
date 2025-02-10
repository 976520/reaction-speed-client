import { ApiResponse, AuthResponse, UserDto } from "@/shared/types/api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {}

export interface AuthApi {
  login: (credentials: LoginCredentials) => Promise<ApiResponse<AuthResponse>>;
  register: (credentials: RegisterCredentials) => Promise<ApiResponse<AuthResponse>>;
  validateToken: () => Promise<ApiResponse<UserDto>>;
  logout: () => void;
  getLeaderboard: () => Promise<ApiResponse<UserDto[]>>;
}
