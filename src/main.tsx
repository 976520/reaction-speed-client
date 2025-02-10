import { StrictMode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GamePage } from "@/pages/game/ui/GamePage";
import { GlobalStyles } from "@/app/styles/GlobalStyles";
import { Providers } from "@/app/providers";
import { RootState } from "@/app/store";
import { authApi } from "@/features/auth/api/authApi";
import { createRoot } from "react-dom/client";
import { setUser } from "@/entities/auth";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const userData = await authApi.validateToken();
        if (userData.success && userData.data) {
          dispatch(setUser(userData.data));
        }
      } finally {
        setIsLoading(false);
      }
    };
    validateAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <GamePage />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
