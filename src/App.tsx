
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider'; // Corrected import path
import { AuthProvider } from '@/hooks/auth/useAuth';
import AppRoutes from './Routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="uber-escorts-theme">
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
