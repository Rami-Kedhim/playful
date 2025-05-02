
/**
 * Mock neural service registry for the Brain Hub system
 */
const neuralServiceRegistry = {
  /**
   * Get all registered neural services
   */
  getAllServices: () => {
    return [
      {
        id: 'neural-core-1',
        moduleId: 'neural-core-1',
        name: 'Neural Core Processor',
        description: 'Core neural processing service',
        version: '1.0.0',
        status: 'active' as const,
        moduleType: 'core',
        config: {
          enabled: true,
          priority: 'high',
          resources: {
            cpu: 2,
            memory: 4096
          }
        },
        getMetrics: () => ({
          operationsCount: 45672,
          errorCount: 182,
          responseTime: 124.6
        }),
        initialize: async () => true,
        updateConfig: (config: any) => {},
        getCapabilities: () => ['core-processing', 'data-analysis', 'neural-inference']
      },
      {
        id: 'data-transformer-1',
        moduleId: 'data-transformer-1',
        name: 'Data Transformer',
        description: 'Transforms data for neural processing',
        version: '1.0.0',
        status: 'active' as const,
        moduleType: 'transformer',
        config: {
          enabled: true,
          priority: 'medium',
          resources: {
            cpu: 1,
            memory: 2048
          }
        },
        getMetrics: () => ({
          operationsCount: 32790,
          errorCount: 59,
          responseTime: 87.3
        }),
        initialize: async () => true,
        updateConfig: (config: any) => {},
        getCapabilities: () => ['data-transformation', 'format-conversion', 'normalization']
      }
    ];
  },
  
  /**
   * Register a new neural service
   */
  registerService: (service: any) => {
    console.log('Registering new service:', service);
    return true;
  },

  /**
   * Initialize the registry
   */
  initialize: async () => {
    console.log('Initializing neural service registry');
    return Promise.resolve();
  },

  /**
   * Get a service by its module ID
   */
  getService: (moduleId: string) => {
    const services = neuralServiceRegistry.getAllServices();
    return services.find(service => service.moduleId === moduleId);
  },

  /**
   * Get services by module type
   */
  getServicesByModule: (moduleType: string) => {
    const services = neuralServiceRegistry.getAllServices();
    return services.filter(service => service.moduleType === moduleType);
  },

  /**
   * Optimize resource allocation for all services
   */
  optimizeResourceAllocation: () => {
    console.log('Optimizing resource allocation for neural services');
    return true;
  }
};

export default neuralServiceRegistry;
