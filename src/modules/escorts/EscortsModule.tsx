
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
  const { isInitialized } = useNeuralServices(escortsNeuralService);

  return (
    <EscortProvider>
      <EscortConsumer isNeuralInitialized={isInitialized}>
        {children}
      </EscortConsumer>
    </EscortProvider>
  );
};
