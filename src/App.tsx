
import React, { useEffect } from 'react';
import AppRoutes from './Routes';
import { Toaster } from './components/ui/toaster';
import { useAuth } from './hooks/auth/useAuth';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from './components/theme-provider';
import { ToastProvider, useToast } from './hooks/use-toast';

function AppContent() {
  const { isLoading } = useAuth();
  const { addToast, removeToast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set the global toast functions
      (window as any).__TOAST_ADD_FUNCTION__ = addToast;
      (window as any).__TOAST_REMOVE_FUNCTION__ = removeToast;
      
      // Add a marker to indicate that toast context is available
      const markerElement = document.createElement('div');
      markerElement.id = 'toast-context-element';
      markerElement.dataset.hasToastContext = 'true';
      markerElement.style.display = 'none';
      document.body.appendChild(markerElement);
      
      return () => {
        document.body.removeChild(markerElement);
        (window as any).__TOAST_ADD_FUNCTION__ = null;
        (window as any).__TOAST_REMOVE_FUNCTION__ = null;
      };
    }
  }, [addToast, removeToast]);

  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
