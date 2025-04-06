
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./hooks/auth/useAuth";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Toaster } from "@/components/ui/toaster";
import "./i18n/i18n"; // Import i18n configuration
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <FavoritesProvider>
            <App />
            <Toaster />
          </FavoritesProvider>
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
