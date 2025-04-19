import { useState, useEffect, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';
import NeuralService from '@/services/neural/registry/NeuralServiceRegistry';
import ModuleType from '@/services/neural/registry/NeuralServiceRegistry';

/**
 * Hook for working with the Neural Service Registry
 */
export function useNeuralRegistry() {
  const [services, setServices] = useState<NeuralService[]>([]);
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
      await neuralServiceRegistry.initializeAll();
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load neural services');
      setLoading(false);
    }
  }, []);
  
  // Register a new service
  const registerService = useCallback((service: NeuralService) => {
    const success = neuralServiceRegistry.registerService(service);
    if (success) {
      loadServices();
    }
    return success;
  }, [loadServices]);
  
  // Unregister a service
  const unregisterService = useCallback((moduleId: string) => {
    const success = neuralServiceRegistry.unregisterService(moduleId);
    if (success) {
      loadServices();
    }
    return success;
  }, [loadServices]);
  
  // Get services by type
  const getServicesByType = useCallback((moduleType: ModuleType): NeuralService[] => {
    return neuralServiceRegistry.getServicesByType(moduleType);
  }, []);
  
  // Get a specific service
  const getService = useCallback((moduleId: string): NeuralService | undefined => {
    return neuralServiceRegistry.getService(moduleId);
  }, []);
  
  // Optimize resource allocation
  const optimizeResources = useCallback(() => {
    neuralServiceRegistry.optimizeResourceAllocation();
    loadServices(); // Refresh services list after optimization
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
