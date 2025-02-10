import { UserDto } from "@/shared/types/api";

export interface User extends UserDto {}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
