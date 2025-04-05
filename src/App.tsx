import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
          <Router>
            <Routes />
            <Toaster />
          </Router>
        </BoostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
