
import React from 'react';
import AppRoutes from './Routes';
import { Toaster } from './components/ui/toaster';
import { useAuth } from './hooks/auth/useAuth';
import { Loader2 } from 'lucide-react';
import { ToastProvider } from './hooks/use-toast';

function App() {
  const { isLoading } = useAuth();

  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ToastProvider>
      <AppRoutes />
      <Toaster />
    </ToastProvider>
  );
}

export default App;
