import { Container } from "./styled";
import { GameLobby } from "@/widgets/lobby/ui/GameLobby";
import { GameRoom } from "@/widgets/room/ui/GameRoom";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export const GamePage = () => {
  const isInGame = useSelector((state: RootState) => state.game.isInGame);

  return <Container>{!isInGame ? <GameLobby /> : <GameRoom />}</Container>;
};
