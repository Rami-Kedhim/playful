
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <Toaster />
        <Sonner position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
