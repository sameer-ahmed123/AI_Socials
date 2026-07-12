import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/breakpoints.css";
import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./styles/reset.css";
import "./styles/utilities.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "./context/LayoutContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
