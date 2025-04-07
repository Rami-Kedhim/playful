
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import AppRouter from './routes';
import { AuthProvider } from './hooks/auth/useAuthContext';
import { Toaster } from '@/components/ui/toaster';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <AuthProvider>
        <AppRouter />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
