
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import Routes from "./Routes";
import { Toaster } from "./components/ui/toaster";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="oxum-theme">
      <NotificationsProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes />
            <Toaster />
          </BrowserRouter>
        </FavoritesProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
