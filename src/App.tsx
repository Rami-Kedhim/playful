
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './app/AppRoutes';
import { initializeSystem, shutdownSystem } from '@/core/engine';

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
        await initializeSystem();
        console.info('UberCore system initialized successfully');
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
