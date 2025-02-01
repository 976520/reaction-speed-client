import { GamePage } from "@/pages/game/ui/GamePage";
import { GlobalStyles } from "@/app/styles/GlobalStyles";
import { Providers } from "@/app/providers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <GlobalStyles />
      <GamePage />
    </Providers>
  </StrictMode>
);
