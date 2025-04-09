
import React, { useState, useEffect } from 'react';
import { BaseNeuralService } from '@/services/neural/modules/BaseNeuralService';

export function useNeuralServices(service: BaseNeuralService) {
  // No need to check for React being defined since we're importing it properly
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the service
  useEffect(() => {
    let mounted = true;

    const initializeService = async () => {
      try {
        if (!service) {
          throw new Error('Neural service not provided');
        }
        
        setIsLoading(true);
        const success = await service.initialize();
        
        if (mounted) {
          setIsInitialized(success);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          console.error(`Failed to initialize neural service:`, err);
          setError(err?.message || 'Failed to initialize neural service');
          setIsInitialized(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeService();

    // Cleanup on unmount
    return () => {
      mounted = false;
    };
  }, [service]);

  return {
    isInitialized,
    isLoading,
    error
  };
}

export default useNeuralServices;
