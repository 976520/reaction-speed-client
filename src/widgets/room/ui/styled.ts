import { GameState } from "@/entities/game/model/slice";
import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
`;

export const ReactionButton = styled.button<{ $gameState: GameState }>`
  width: 300px;
  height: 300px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: ${({ $gameState, theme }) => {
    switch ($gameState) {
      case "waiting":
        return theme.colors.secondary;
      case "ready":
        return theme.colors.warning;
      case "green":
        return theme.colors.primary;
      case "finished":
        return theme.colors.error;
      default:
        return theme.colors.secondary;
    }
  }};
  color: white;
`;

export const ExitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const OpponentInfo = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
