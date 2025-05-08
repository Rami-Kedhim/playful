
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './app/AppRoutes';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { BoostProvider } from '@/contexts/BoostContext';
import { ServiceTypeProvider } from '@/contexts/ServiceTypeContext';
import { ThemeProvider } from '@/components/theme-provider';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="uberescorts-theme">
      <Router>
        <AuthProvider>
          <FavoritesProvider>
            <WalletProvider>
              <BoostProvider>
                <ServiceTypeProvider>
                  <AppRoutes />
                  <Toaster />
                </ServiceTypeProvider>
              </BoostProvider>
            </WalletProvider>
          </FavoritesProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
