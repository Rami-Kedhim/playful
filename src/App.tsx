
import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import Routes from './Routes';
import { AuthProvider } from './hooks/auth/useAuth';
import { BoostProvider } from './contexts/BoostContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="lucent-ui-theme">
      <AuthProvider>
        <BoostProvider>
          <Routes />
          <Toaster />
        </BoostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
