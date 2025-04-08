
import React from 'react';
import { useNeuralServices } from '@/hooks/useNeuralServices';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';
import { CreatorConsumer } from './consumers/CreatorConsumer';
import { CreatorProvider } from './providers/CreatorProvider';

/**
 * Creators Module - Main container component that integrates with the Brain Hub
 * and initializes the neural services for content creators functionality
 */
export const CreatorsModule: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { isInitialized } = useNeuralServices(creatorsNeuralService);

  return (
    <CreatorProvider>
      <CreatorConsumer isNeuralInitialized={isInitialized}>
        {children}
      </CreatorConsumer>
    </CreatorProvider>
  );
};
