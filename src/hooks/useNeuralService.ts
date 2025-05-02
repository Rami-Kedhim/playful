
import { useState, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';

/**
 * Hook for managing a specific neural service
 */
export function useNeuralService(moduleId: string) {
  const [service, setService] = useState<any | undefined>(
    neuralServiceRegistry.getService && neuralServiceRegistry.getService(moduleId)
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
      
      if (service.updateConfig) {
        service.updateConfig(newConfig);
        setService({ ...service });
      }
      
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
  const updateServiceConfig = useCallback(async (config: any) => {
    if (!service) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      if (service.updateConfig) {
        service.updateConfig(config);
        setService({ ...service });
      }
      
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
