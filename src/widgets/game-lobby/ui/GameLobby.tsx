import { AuthButton, LobbyContainer, OpponentInfo, SearchingText, StartButton, Title, UserInfo } from "./styled";
import { setGameId, setIsSearching, setOpponentIp } from "@/entities/game/model/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AuthModal } from "@/widgets/auth/ui/AuthModal";
import { RootState } from "@/app/store";
import { gameSocket } from "@/shared/api/gameSocket";

export const GameLobby = () => {
  const dispatch = useDispatch();
  const { isSearching, opponentIp } = useSelector((state: RootState) => state.game);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
      {isAuthenticated ? (
        <UserInfo>
          {user?.username} ({user?.wins}승 / {user?.total_games}게임)
        </UserInfo>
      ) : (
        <AuthButton onClick={() => setIsAuthModalOpen(true)}>로그인</AuthButton>
      )}
      {!isSearching ? (
        <StartButton onClick={handleStartGame}>게임 시작</StartButton>
      ) : (
        <>
          <SearchingText>상대방을 찾는 중...</SearchingText>
          {opponentIp && <OpponentInfo>{opponentIp}</OpponentInfo>}
        </>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </LobbyContainer>
  );
};
