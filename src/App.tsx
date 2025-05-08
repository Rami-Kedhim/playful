
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { UberEcosystemProvider } from '@/contexts/UberEcosystemContext';
import { ServiceTypeProvider } from '@/contexts/ServiceTypeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import AppRoutes from '@/app/AppRoutes';
import { initializeSystem, shutdownSystem } from '@/core/engine';
import { toast } from '@/components/ui/use-toast';

function App() {
  useEffect(() => {
    // Initialize UberCore system
    const initCore = async () => {
      try {
        console.log('Initializing UberEscorts system...');
        const initialized = await initializeSystem();
        
        if (initialized) {
          console.info('UberEscorts system initialized successfully');
        } else {
          console.error('Failed to initialize UberEscorts system');
          toast({
            title: "Initialization Failed",
            description: "System will operate with limited functionality.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error during system initialization:', error);
        toast({
          title: "System Error",
          description: "An unexpected error occurred during initialization.",
          variant: "destructive"
        });
      }
    };
    
    initCore();
    
    return () => {
      // Shutdown UberEscorts when app unmounts
      shutdownSystem();
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="uberescorts-theme">
      <UberEcosystemProvider>
        <ServiceTypeProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <AppRoutes />
              <Toaster />
            </BrowserRouter>
          </FavoritesProvider>
        </ServiceTypeProvider>
      </UberEcosystemProvider>
    </ThemeProvider>
  );
}

export default App;
