
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import UberContextsProvider from '@/contexts/UberContexts';
import AppRoutes from './AppRoutes';
import { checkSystemStatus } from '@/utils/core';
import { uberCore } from '@/core/UberCore';
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';

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
    
    // Initialize all UberCore modules
    const initCore = async () => {
      console.log('Initializing UberCore modules...');
      
      await Promise.all([
        lucie.initialize(),
        hermes.initialize(), 
        uberCore.initialize(),
        // oxum and orus are initialized in their constructors
      ]);
      
      // Verify system integrity
      const integrityResult = orus.checkIntegrity();
      if (!integrityResult.isValid) {
        console.error('System integrity check failed:', integrityResult.message);
      } else {
        console.log('System integrity verified:', integrityResult.message);
      }
    };
    
    initCore();
    
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
