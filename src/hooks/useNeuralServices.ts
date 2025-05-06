
import { useState, useEffect, useCallback } from 'react';
import { BaseBrainService } from '@/services/neural/modules/BaseNeuralService';
import type { BaseNeuralService } from '@/services/neural/types/NeuralService';

/**
 * Custom hook for initializing and managing neural services
 * @param service The neural service to initialize
 * @returns Status and control functions for the neural service
 */
export function useNeuralServices(service: BaseNeuralService) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to reinitialize the service if needed
  const reinitialize = useCallback(async () => {
    if (!service) {
      setError('Neural service not provided');
      setIsLoading(false);
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Check if the service has an initialize method
      if (service.initialize && typeof service.initialize === 'function') {
        const success = await service.initialize();
        setIsInitialized(success);
        return success;
      } else {
        // If no initialize method, just assume it's ready
        setIsInitialized(true);
        return true;
      }
    } catch (err: any) {
      console.error(`Failed to reinitialize neural service:`, err);
      setError(err?.message || 'Failed to reinitialize neural service');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  // Initialize the service
  useEffect(() => {
    let mounted = true;

    const initializeService = async () => {
      try {
        setIsLoading(true);
        
        if (!service) {
          throw new Error('Neural service not provided');
        }
        
        // Check if the service has an initialize method
        if (service.initialize && typeof service.initialize === 'function') {
          const success = await service.initialize();
          
          if (mounted) {
            setIsInitialized(success);
            setError(null);
          }
        } else {
          // If no initialize method, just assume it's ready
          if (mounted) {
            setIsInitialized(true);
            setError(null);
          }
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
    error,
    reinitialize
  };
}

export default useNeuralServices;
