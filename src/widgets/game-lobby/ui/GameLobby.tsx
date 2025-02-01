import { LobbyContainer, OpponentInfo, SearchingText, StartButton, Title } from "./styled";
import { setGameId, setIsSearching, setOpponentIp } from "@/entities/game/model/slice";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { gameSocket } from "@/shared/api/gameSocket";
import { useEffect } from "react";

export const GameLobby = () => {
  const dispatch = useDispatch();
  const { isSearching, opponentIp } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    gameSocket.connect();

    gameSocket.on("start", (data) => {
      dispatch(setGameId(data.gameId));
      dispatch(setOpponentIp(data.opponentIp?.slice(0, 7)));
    });

    return () => {
      gameSocket.disconnect();
    };
  }, [dispatch]);

  const handleStartGame = () => {
    dispatch(setIsSearching(true));
    gameSocket.send({ action: "search_game" });
  };

  return (
    <LobbyContainer>
      <Title>반응속도 테스트</Title>
      {!isSearching ? (
        <StartButton onClick={handleStartGame}>게임 시작</StartButton>
      ) : (
        <>
          <SearchingText>상대방을 찾는 중...</SearchingText>
          {opponentIp && <OpponentInfo>{opponentIp}</OpponentInfo>}
        </>
      )}
    </LobbyContainer>
  );
};
