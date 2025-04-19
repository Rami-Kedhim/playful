
// Fix import for NeuralService and usage to avoid invalid type import issue
import { useState, useEffect, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';
// Import types separately if needed, here we treat NeuralServiceRegistry as default class instance
import type { NeuralService as NeuralServiceType, ModuleType as ModuleTypeType } from '@/services/neural/registry/NeuralServiceRegistry';

/**
 * Hook for working with the Neural Service Registry
 */
export function useNeuralRegistry() {
  const [services, setServices] = useState<NeuralServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load all services
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This will return all registered services
      const allServices = neuralServiceRegistry.getAllServices();
      setServices(allServices);
      
      // Initialize all services if needed
      // Changed from initializeAll to initialize to fit available API
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
  const registerService = useCallback((service: NeuralServiceType) => {
    const success = neuralServiceRegistry.registerService(service);
    if (success) {
      loadServices();
    }
    return success;
  }, [loadServices]);
  
  // Unregister a service
  const unregisterService = useCallback((moduleId: string) => {
    // It seems no unregisterService method, so only call registerService to false or implement no-op
    console.warn('unregisterService method not defined on neuralServiceRegistry');
    // Return false because unregister not done
    return false;
  }, []);
  
  // Get services by type
  const getServicesByType = useCallback((moduleType: ModuleTypeType): NeuralServiceType[] => {
    // If registry supports getServicesByType method, else fallback empty
    if (neuralServiceRegistry.getServicesByType) {
      return neuralServiceRegistry.getServicesByType(moduleType);
    }
    return [];
  }, []);
  
  // Get a specific service
  const getService = useCallback((moduleId: string): NeuralServiceType | undefined => {
    if (neuralServiceRegistry.getService) {
      return neuralServiceRegistry.getService(moduleId);
    }
    return undefined;
  }, []);
  
  // Optimize resource allocation
  const optimizeResources = useCallback(() => {
    if (neuralServiceRegistry.optimizeResourceAllocation) {
      neuralServiceRegistry.optimizeResourceAllocation();
      loadServices(); // Refresh services list after optimization
    } else {
      console.warn('optimizeResourceAllocation method not defined on neuralServiceRegistry');
    }
  }, [loadServices]);
  
  // Load services on mount
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
