
import React from 'react';
import { useNeuralServices } from '@/hooks/useNeuralServices';
import { livecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';
import { LivecamConsumer } from './consumers/LivecamConsumer';
import { LivecamProvider } from './providers/LivecamProvider';

/**
 * Livecams Module - Main container component that integrates with the Brain Hub
 * and initializes the neural services for livecam functionality
 */
export const LivecamsModule: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { isInitialized } = useNeuralServices(livecamsNeuralService);

  return (
    <LivecamProvider>
      <LivecamConsumer isNeuralInitialized={isInitialized}>
        {children}
      </LivecamConsumer>
    </LivecamProvider>
  );
};
