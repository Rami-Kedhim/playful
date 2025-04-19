
import { useState, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';
import { BaseNeuralService, NeuralServiceConfig } from '@/services/neural/types/NeuralService';

/**
 * Hook for managing a specific neural service
 */
export function useNeuralService(moduleId: string) {
  const [service, setService] = useState<BaseNeuralService | undefined>(
    neuralServiceRegistry.getService(moduleId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Toggle the enabled status of the service
   */
  const toggleEnabled = useCallback(async () => {
    if (!service) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      const newConfig = { 
        ...service.config, 
        enabled: !service.config.enabled 
      };
      
      service.updateConfig(newConfig);
      setService({ ...service });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to toggle service status');
      return false;
    } finally {
      setLoading(false);
    }
  }, [service]);

  /**
   * Update service configuration parameters
   */
  const updateServiceConfig = useCallback(async (config: Partial<NeuralServiceConfig>) => {
    if (!service) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      service.updateConfig(config);
      setService({ ...service });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update service configuration');
      return false;
    } finally {
      setLoading(false);
    }
  }, [service]);

  return {
    service,
    loading,
    error,
    toggleEnabled,
    updateServiceConfig
  };
}

export default useNeuralService;
