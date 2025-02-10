import { BaseEntity } from "./common";

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface UserDto extends BaseEntity {
  username: string;
  total_games: number;
  wins: number;
  best_reaction_time: number | null;
}
