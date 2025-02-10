import { StrictMode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GlobalStyles } from "@/app/styles/GlobalStyles";
import { MainPage } from "@/pages/game/ui/MainPage";
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
        const response = await authApi.validateToken();
        if (response.success && response.data) {
          dispatch(setUser(response.data));
        }
      } finally {
        setIsLoading(false);
      }
    };
    validateAuth();
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <MainPage />
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
