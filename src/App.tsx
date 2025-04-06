
import React from "react";
import { ThemeProvider } from "next-themes";
import Routes from "./Routes";
import { Toaster } from "./components/ui/toaster";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import LucieHermesIntegration from './components/home/LucieHermesIntegration';
import HermesBoostOffer from './components/boost/HermesBoostOffer';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="oxum-theme">
      <NotificationsProvider>
        <FavoritesProvider>
          <Routes />
          <Toaster />
          <LucieHermesIntegration />
          <HermesBoostOffer />
        </FavoritesProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
