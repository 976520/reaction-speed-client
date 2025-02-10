import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { store } from "../store";
import { theme } from "@/shared/config/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
