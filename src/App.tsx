
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './app/AppRoutes';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { WalletProvider } from '@/contexts/WalletContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <WalletProvider>
            <AppRoutes />
            <Toaster />
          </WalletProvider>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
