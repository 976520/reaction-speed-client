import { StrictMode, useEffect } from "react";

import { GamePage } from "@/pages/game/ui/GamePage";
import { GlobalStyles } from "@/app/styles/GlobalStyles";
import { Providers } from "@/app/providers";
import { authApi } from "@/features/auth/api/authApi";
import { createRoot } from "react-dom/client";
import { setUser } from "@/entities/auth";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateAuth = async () => {
      const userData = await authApi.validateToken();
      if (userData) {
        dispatch(setUser(userData));
      }
    };
    validateAuth();
  }, [dispatch]);

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
