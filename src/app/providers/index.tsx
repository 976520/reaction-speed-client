import "react-toastify/dist/ReactToastify.css";

import { persistor, store } from "../store";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { theme } from "@/shared/config/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
