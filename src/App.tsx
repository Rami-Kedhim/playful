
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './app/AppRoutes';
import { initializeSystem, shutdownSystem } from '@/core/engine';
import { checkSystemStatus } from '@/utils/core';

/**
 * Main application component
 * Initializes the UberCore ecosystem
 */
const App = () => {
  useEffect(() => {
    // Initialize UberCore system
    const initCore = async () => {
      try {
        console.log('Initializing UberCore system...');
        const initialized = await initializeSystem();
        
        if (initialized) {
          console.info('UberCore system initialized successfully');
          
          // Check system status
          const status = await checkSystemStatus();
          console.info('UberEscorts system status:', status.operational ? 'Operational' : 'Degraded');
          console.info('System latency:', status.latency, 'ms');
        } else {
          console.error('Failed to initialize UberCore system');
        }
      } catch (error) {
        console.error('Error during system initialization:', error);
      }
    };
    
    initCore();
    
    return () => {
      // Shutdown UberCore when app unmounts
      shutdownSystem();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
