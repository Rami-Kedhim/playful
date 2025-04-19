
// Fix check for initialize function is callable
import { useState, useEffect, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';
import type { BaseNeuralService } from '@/services/neural/types/NeuralService';
import type { ModuleType } from '@/services/neural/types/NeuralService';

export function useNeuralRegistry() {
  const [services, setServices] = useState<BaseNeuralService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // stricter callable check
      if (typeof neuralServiceRegistry.initialize === 'function') {
        await neuralServiceRegistry.initialize();
      }
      
      const allServices = neuralServiceRegistry.getAllServices();
      setServices(allServices);
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load neural services');
      setLoading(false);
    }
  }, []);
  
  const registerService = useCallback((service: BaseNeuralService) => {
    const success = neuralServiceRegistry.registerService(service);
    if (success) {
      loadServices();
    }
    return success;
  }, [loadServices]);
  
  const unregisterService = useCallback((moduleId: string) => {
    console.warn('unregisterService method not defined on neuralServiceRegistry');
    return false;
  }, []);
  
  const getServicesByType = useCallback((moduleType: ModuleType): BaseNeuralService[] => {
    if ("getServicesByModule" in neuralServiceRegistry && typeof neuralServiceRegistry.getServicesByModule === 'function') {
      return neuralServiceRegistry.getServicesByModule(moduleType);
    }
    return [];
  }, []);
  
  const getService = useCallback((moduleId: string): BaseNeuralService | undefined => {
    if (typeof neuralServiceRegistry.getService === 'function') {
      return neuralServiceRegistry.getService(moduleId);
    }
    return undefined;
  }, []);
  
  const optimizeResources = useCallback(() => {
    if ("optimizeResourceAllocation" in neuralServiceRegistry && typeof neuralServiceRegistry.optimizeResourceAllocation === 'function') {
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

