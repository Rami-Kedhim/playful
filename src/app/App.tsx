
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './AppRoutes';
import { UnifiedContextProvider } from '@/contexts/UnifiedContextProvider';
import { initializeSystem, shutdownSystem } from '@/core/engine';
import { checkSystemStatus } from '@/utils/core';
import { toast } from '@/components/ui/use-toast';

/**
 * Main application component
 * Initializes the UberEscorts ecosystem
 */
const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize UberCore system
    const initCore = async () => {
      try {
        setIsInitializing(true);
        console.log('Initializing UberEscorts system...');
        const initialized = await initializeSystem();
        
        if (initialized) {
          console.info('UberEscorts system initialized successfully');
          setIsInitialized(true);
          
          // Check system status
          const status = await checkSystemStatus();
          console.info('UberEscorts system status:', status.operational ? 'Operational' : 'Degraded');
          console.info('System latency:', status.latency, 'ms');
          
          if (!status.operational) {
            toast({
              title: "System Degraded",
              description: "Some services may be unavailable.",
              variant: "destructive"
            });
          }
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
      } finally {
        setIsInitializing(false);
      }
    };
    
    initCore();
    
    return () => {
      // Shutdown UberEscorts when app unmounts
      shutdownSystem();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <UnifiedContextProvider>
        <AppRoutes />
        <Toaster />
      </UnifiedContextProvider>
    </BrowserRouter>
  );
};

export default App;
