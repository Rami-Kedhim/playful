
import React, { useEffect } from 'react';
import { useNeuralServices } from '@/hooks/useNeuralServices';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { EscortConsumer } from './consumers/EscortConsumer';
import { EscortProvider } from './providers/EscortProvider';
import { UberPersonaProvider } from '@/contexts/UberPersonaContext';
import { toast } from '@/components/ui/use-toast';

/**
 * Escorts Module - Main container component that integrates with the Brain Hub
 * and initializes the neural services for escorts functionality
 * 
 * This module integrates with the UberPersona ecosystem, allowing escorts
 * to also function as content creators and livecam models
 */
export const EscortsModule: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Initialize neural services with error handling
  const { isInitialized, isLoading, error, reinitialize } = useNeuralServices(escortsNeuralService);
  
  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      toast({
        title: "Neural Service Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error]);

  return (
    <EscortProvider>
      <UberPersonaProvider>
        <EscortConsumer isNeuralInitialized={isInitialized}>
          {children}
        </EscortConsumer>
      </UberPersonaProvider>
    </EscortProvider>
  );
};

export default EscortsModule;
