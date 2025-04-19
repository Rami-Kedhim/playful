import { useState, useEffect, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';
import type { BaseNeuralService } from '@/services/neural/types/NeuralService';
import type { ModuleType } from '@/services/neural/types/NeuralService';

/**
 * Hook for working with the Neural Service Registry
 */
export function useNeuralRegistry() {
  const [services, setServices] = useState<BaseNeuralService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load all services
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allServices = neuralServiceRegistry.getAllServices();
      setServices(allServices);
      
      if (neuralServiceRegistry.initialize) {
        await neuralServiceRegistry.initialize();
      }
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load neural services');
      setLoading(false);
    }
  }, []);
  
  // Register a new service
  const registerService = useCallback((service: BaseNeuralService) => {
    const success = neuralServiceRegistry.registerService(service);
    if (success) {
      loadServices();
    }
    return success;
  }, [loadServices]);
  
  // Unregister a service (not implemented)
  const unregisterService = useCallback((moduleId: string) => {
    console.warn('unregisterService method not defined on neuralServiceRegistry');
    return false;
  }, []);
  
  // Get services by type
  const getServicesByType = useCallback((moduleType: ModuleType): BaseNeuralService[] => {
    if ("getServicesByModule" in neuralServiceRegistry) {
      // Use getServicesByModule on registry if available
      return neuralServiceRegistry.getServicesByModule(moduleType);
    }
    return [];
  }, []);
  
  // Get a specific service
  const getService = useCallback((moduleId: string): BaseNeuralService | undefined => {
    if (neuralServiceRegistry.getService) {
      return neuralServiceRegistry.getService(moduleId);
    }
    return undefined;
  }, []);
  
  // Optimize resource allocation
  const optimizeResources = useCallback(() => {
    if ("optimizeResourceAllocation" in neuralServiceRegistry) {
      neuralServiceRegistry.optimizeResourceAllocation();
      loadServices();
    } else {
      console.warn('optimizeResourceAllocation method not defined on neuralServiceRegistry');
    }
  }, [loadServices]);
  
  useEffect(() => {
    loadServices();
  }, [loadServices]);
  
  return {
    services,
    loading,
    error,
    loadServices,
    registerService,
    unregisterService,
    getServicesByType,
    getService,
    optimizeResources
  };
}

export default useNeuralRegistry;
