export interface User {
  id: number;
  username: string;
  total_games: number;
  wins: number;
  best_reaction_time: number | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
