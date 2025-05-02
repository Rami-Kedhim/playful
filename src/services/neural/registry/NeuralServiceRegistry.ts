
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
        moduleId: 'neural-core-1',
        name: 'Neural Core Processor',
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
        })
      },
      {
        moduleId: 'data-transformer-1',
        name: 'Data Transformer',
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
        })
      }
    ];
  },
  
  /**
   * Register a new neural service
   */
  registerService: (service: any) => {
    console.log('Registering new service:', service);
    return true;
  }
};

export default neuralServiceRegistry;
