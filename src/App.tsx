
import React from "react";
import { ThemeProvider } from "next-themes";
import Routes from "./Routes";
import { Toaster } from "./components/ui/toaster";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="oxum-theme">
      <NotificationsProvider>
        <FavoritesProvider>
          <Routes />
          <Toaster />
        </FavoritesProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
