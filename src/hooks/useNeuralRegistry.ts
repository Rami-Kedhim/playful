
import { useState, useEffect, useCallback } from 'react';
import { BaseBrainService } from '@/services/neural/modules/BaseNeuralService';
import { BaseNeuralService } from '@/services/neural/types/NeuralService';
import { v4 as uuidv4 } from 'uuid';

export function useNeuralRegistry() {
  const [services, setServices] = useState<BaseNeuralService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock service creation function to ensure correct type implementation
  const createMockService = useCallback((
    moduleId: string, 
    name: string, 
    moduleType: string
  ): BaseNeuralService => {
    const service = new BaseBrainService({
      moduleId,
      name,
      description: `${name} service for ${moduleType}`,
      moduleType,
      version: '1.0.0',
      config: {
        enabled: true,
        priority: 'normal',
        resources: {
          cpu: 1,
          memory: 512
        },
        autonomyLevel: 50,
        resourceAllocation: 30
      }
    });
    
    // Add required methods to satisfy BaseNeuralService interface
    const fullService: BaseNeuralService = {
      ...service,
      processRequest: async (request: any) => {
        console.log(`Processing request in ${name}:`, request);
        return {
          success: true,
          data: `Request processed by ${name}`
        };
      },
      canHandleRequestType: (requestType: string) => {
        return moduleType === requestType;
      }
    };
    
    return fullService;
  }, []);

  // Load neural services on mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        
        // Mock loading services from registry
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock services
        const mockServices: BaseNeuralService[] = [
          createMockService('neural-core-1', 'Neural Core', 'core'),
          createMockService('image-analysis', 'Image Analysis', 'analytics'),
          createMockService('sentiment-processor', 'Sentiment Processor', 'neural'),
          createMockService('boost-optimizer', 'Boost Optimizer', 'boost')
        ];
        
        setServices(mockServices);
      } catch (err) {
        console.error('Failed to load neural services:', err);
        setError('Failed to load neural services');
      } finally {
        setLoading(false);
      }
    };
    
    loadServices();
  }, [createMockService]);

  const registerService = useCallback(async (service: Partial<BaseNeuralService>) => {
    try {
      // Create a full service with all required methods
      const fullService = createMockService(
        service.moduleId || `service-${uuidv4()}`,
        service.name || 'New Service',
        service.moduleType || 'custom'
      );
      
      // Override with provided properties
      const registeredService: BaseNeuralService = {
        ...fullService,
        ...service
      };
      
      setServices(prev => [...prev, registeredService]);
      return registeredService;
    } catch (err) {
      console.error('Failed to register service:', err);
      setError('Failed to register service');
      throw err;
    }
  }, [createMockService]);

  const optimizeResources = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate resource optimization
      const optimizedServices = services.map(service => ({
        ...service,
        config: {
          ...service.config,
          resourceAllocation: Math.min(80, (service.config.resourceAllocation || 0) + 10)
        }
      }));
      
      setServices(optimizedServices);
      return true;
    } catch (err) {
      console.error('Failed to optimize resources:', err);
      setError('Failed to optimize resources');
      return false;
    } finally {
      setLoading(false);
    }
  }, [services]);

  return {
    services,
    loading,
    error,
    registerService,
    optimizeResources
  };
}

export default useNeuralRegistry;
