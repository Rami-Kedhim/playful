
import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import Routes from './Routes';
import { AuthProvider } from './hooks/auth/useAuth';
import { BoostProvider } from './contexts/BoostContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="lucent-ui-theme">
      <AuthProvider>
        <BoostProvider>
          <FavoritesProvider>
            <Routes />
            <Toaster />
          </FavoritesProvider>
        </BoostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
