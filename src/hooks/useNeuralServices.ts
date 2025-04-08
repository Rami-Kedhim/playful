
import { useState, useEffect } from 'react';
import { BaseNeuralService } from '@/services/neural/modules/BaseNeuralService';

export function useNeuralServices(service: BaseNeuralService) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the service
  useEffect(() => {
    let mounted = true;

    const initializeService = async () => {
      try {
        setIsLoading(true);
        const success = await service.initialize();
        
        if (mounted) {
          setIsInitialized(success);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          console.error(`Failed to initialize ${service.moduleId}:`, err);
          setError(err.message || 'Failed to initialize neural service');
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
