
import React from 'react';
import { useNeuralServices } from '@/hooks/useNeuralServices';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { EscortConsumer } from './consumers/EscortConsumer';
import { EscortProvider } from './providers/EscortProvider';

/**
 * Escorts Module - Main container component that integrates with the Brain Hub
 * and initializes the neural services for escorts functionality
 */
export const EscortsModule: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Safely initialize neural services with error handling
  let isInitialized = false;
  
  try {
    const services = useNeuralServices(escortsNeuralService);
    isInitialized = services?.isInitialized || false;
  } catch (err) {
    console.error("Failed to initialize neural services:", err);
    // Continue with isInitialized = false
  }

  return (
    <EscortProvider>
      <EscortConsumer isNeuralInitialized={isInitialized}>
        {children}
      </EscortConsumer>
    </EscortProvider>
  );
};
