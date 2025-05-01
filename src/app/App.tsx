
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import UberContextsProvider from '@/contexts/UberContexts';
import AppRoutes from './AppRoutes';
import { checkSystemStatus } from '@/utils/core';
import { uberCore } from '@/core/UberCore';

/**
 * Main application component
 * Initializes the UberCore ecosystem
 */
const App = () => {
  useEffect(() => {
    // Initial system status check
    const checkStatus = async () => {
      try {
        const status = await checkSystemStatus();
        console.info('UberEscorts system status:', status.operational ? 'Operational' : 'Degraded');
        console.info('System latency:', status.latency, 'ms');
        console.info('AI Models:', 
          Object.entries(status.aiModels)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')
        );
      } catch (error) {
        console.error('Failed to check system status:', error);
      }
    };
    
    checkStatus();
    
    // Initialize UberCore
    uberCore.initialize();
    
    return () => {
      // Shutdown UberCore when app unmounts
      uberCore.shutdown();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <UberContextsProvider>
        <AppRoutes />
        <Toaster />
      </UberContextsProvider>
    </BrowserRouter>
  );
};

export default App;
