import { Button, Container, StatItem, Stats, Title, UserInfo, UserName } from "./styled";

import { AuthModal } from "@/widgets/auth";
import { RootState } from "@/app/store";
import { authApi } from "@/features/auth/api/authApi";
import { useSelector } from "react-redux";
import { useState } from "react";

export const GameLobby = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Container>
      <Title>반응속도</Title>

      {user ? (
        <UserInfo>
          <UserName>{user.username}</UserName>

          <Stats>
            <StatItem>{user.total_games}게임</StatItem>
            <StatItem>{user.wins}승</StatItem>
            {user.best_reaction_time && <StatItem>{user.best_reaction_time}ms</StatItem>}
          </Stats>

          <Button onClick={() => authApi.logout()}>로그아웃</Button>
        </UserInfo>
      ) : (
        <Button onClick={() => setIsAuthModalOpen(true)}>로그인</Button>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Container>
  );
};
