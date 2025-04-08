
import { useEffect, useState } from 'react';
import { BaseNeuralService } from '@/services/neural/types/neuralHub';

/**
 * Hook to initialize and manage neural services integration with Brain Hub
 */
export const useNeuralServices = (neuralService: BaseNeuralService) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeService = async () => {
      try {
        setIsLoading(true);
        // Initialize the neural service with Brain Hub
        await neuralService.initialize();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error("Failed to initialize neural service:", err);
        setError(err instanceof Error ? err.message : "Unknown error initializing neural service");
        setIsInitialized(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeService();

    // Cleanup function
    return () => {
      // Attempt to gracefully shutdown the neural service
      try {
        neuralService.shutdown();
      } catch (err) {
        console.error("Error during neural service shutdown:", err);
      }
    };
  }, [neuralService]);

  return {
    isInitialized,
    isLoading,
    error
  };
};
