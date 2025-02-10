import { ExitButton, GameContainer, OpponentInfo, ReactionButton } from "./styled";
import { resetGame, setGameState, setReactionTime, setStartTime } from "@/entities/game";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { gameSocket } from "@/shared/api/gameSocket";
import { useEffect } from "react";

export const GameRoom = () => {
  const dispatch = useDispatch();
  const { gameState, startTime, reactionTime, opponentIp } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    gameSocket.on("game_start", () => {
      dispatch(setGameState("ready"));
    });

    gameSocket.on("show_target", () => {
      dispatch(setGameState("green"));
      dispatch(setStartTime(Date.now()));
    });

    gameSocket.on("game_over", (data) => {
      dispatch(setGameState("finished"));
      if (data.winner === opponentIp) {
        dispatch(setReactionTime(-2));
      }
    });

    return () => {
      gameSocket.disconnect();
    };
  }, [dispatch, opponentIp]);

  const handleClick = () => {
    if (gameState === "green" && startTime) {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      dispatch(setReactionTime(reaction));
      dispatch(setGameState("finished"));
      gameSocket.send({
        action: "click",
        timestamp: reaction,
      });
    }
  };

  return (
    <GameContainer>
      <OpponentInfo>상대방 IP: {opponentIp}...</OpponentInfo>
      <ReactionButton $gameState={gameState} onClick={handleClick}>
        {gameState === "waiting" && "시작하려면 클릭하세요"}
        {gameState === "ready" && "초록색이 되면 클릭하세요"}
        {gameState === "green" && "지금 클릭하세요!"}
        {gameState === "finished" &&
          (reactionTime === -2
            ? "패배했습니다!"
            : reactionTime === -1
            ? "너무 일찍 클릭했습니다!"
            : `반응 속도: ${reactionTime}ms`)}
      </ReactionButton>
      <ExitButton onClick={() => dispatch(resetGame())}>나가기</ExitButton>
    </GameContainer>
  );
};
