export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface UserDto {
  id: number;
  username: string;
  total_games: number;
  wins: number;
  best_reaction_time: number | null;
}
