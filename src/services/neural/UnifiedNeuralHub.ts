
import { NeuralRequest, NeuralResponse, INeuralHub, NeuralSystemStatus, ModelParameters } from './types/neuralHub';
import neuralServiceRegistry from './registry/NeuralServiceRegistry';
import neuralMetricsProvider from './monitoring/NeuralMetricsProvider';

/**
 * Unified Neural Hub
 * A centralized service that provides access to all neural capabilities
 * with standardized APIs and metrics collection
 */
export class UnifiedNeuralHub implements INeuralHub {
  private static instance: UnifiedNeuralHub;
  private initialized: boolean = false;
  private defaultModelParameters: ModelParameters = {
    temperature: 0.7,
    maxTokens: 500,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    modelName: 'neural-default'
  };
  
  private startTime: number = Date.now();
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  public static getInstance(): UnifiedNeuralHub {
    if (!UnifiedNeuralHub.instance) {
      UnifiedNeuralHub.instance = new UnifiedNeuralHub();
    }
    return UnifiedNeuralHub.instance;
  }
  
  /**
   * Initialize the neural hub and all registered modules
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('NeuralHub already initialized');
      return;
    }
    
    console.log('Initializing NeuralHub...');
    try {
      // Initialize all registered services
      const services = neuralServiceRegistry.getAllServices();
      
      for (const service of services) {
        if (service.initialize) {
          await service.initialize();
        }
      }
      
      this.initialized = true;
      this.startTime = Date.now();
      console.log('NeuralHub initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NeuralHub', error);
      throw error;
    }
  }
  
  /**
   * Process a request through the neural hub
   * @param request The neural request to process
   * @returns A promise resolving to the neural response
   */
  public async processRequest(request: NeuralRequest): Promise<NeuralResponse> {
    if (!this.initialized) {
      try {
        await this.initialize();
      } catch (error) {
        return {
          success: false,
          error: 'NeuralHub initialization failed'
        };
      }
    }
    
    console.log(`[NeuralHub] Processing request: ${request.type}`);
    
    try {
      // Find the appropriate service for the request type
      const service = this.getServiceForRequestType(request.type);
      
      if (!service) {
        return {
          success: false,
          error: `No service found for request type: ${request.type}`
        };
      }
      
      // Process the request using the service
      if (typeof service.processRequest !== 'function') {
        return {
          success: false,
          error: `Service ${service.name} does not support request processing`
        };
      }
      
      // Track performance metrics
      const startTime = performance.now();
      
      // Process the request
      const response = await service.processRequest(request.data, request.options, request.filters);
      
      // Calculate processing time
      const processingTime = performance.now() - startTime;
      
      // Log the processing time
      console.log(`[NeuralHub] Request ${request.type} processed in ${processingTime.toFixed(2)}ms`);
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error(`[NeuralHub] Error processing request: ${request.type}`, error);
      
      // Update error metrics
      this.updateErrorMetrics();
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error processing request'
      };
    }
  }
  
  /**
   * Register a new module with the neural hub
   * @param moduleType The type of module to register
   * @param module The module instance to register
   */
  public registerModule(moduleType: string, module: any): void {
    neuralServiceRegistry.registerService(moduleType, module);
  }
  
  /**
   * Get a registered module by type
   * @param moduleType The type of module to get
   * @returns The module instance or undefined if not found
   */
  public getModule(moduleType: string): any {
    return neuralServiceRegistry.getService(moduleType);
  }
  
  /**
   * Get the current system status
   * @returns The current system status
   */
  public getSystemStatus(): NeuralSystemStatus {
    const services = neuralServiceRegistry.getAllServices();
    const metrics = neuralMetricsProvider.getMetrics();
    
    return {
      operational: this.initialized,
      uptime: Date.now() - this.startTime,
      activeModules: services.filter(s => s.status === 'active').map(s => s.moduleId),
      processingQueue: 0, // TODO: Implement queue tracking
      latency: metrics.responseTime || 0,
      cpuUtilization: metrics.cpuUtilization,
      memoryUtilization: metrics.memoryUtilization,
      errorRate: metrics.errorRate,
      responseTime: metrics.responseTime,
      operationsPerSecond: metrics.operationsPerSecond,
      stability: metrics.stability
    };
  }
  
  /**
   * Get current model parameters
   */
  public getModelParameters(): ModelParameters {
    return { ...this.defaultModelParameters };
  }
  
  /**
   * Update model parameters
   */
  public updateModelParameters(parameters: Partial<ModelParameters>): void {
    this.defaultModelParameters = {
      ...this.defaultModelParameters,
      ...parameters
    };
  }
  
  /**
   * Get a service instance by ID
   */
  public getService(serviceId: string): any {
    return neuralServiceRegistry.getService(serviceId);
  }
  
  /**
   * Get all available services
   */
  public getAllServices(): any[] {
    return neuralServiceRegistry.getAllServices();
  }
  
  /**
   * Get health metrics of the neural hub
   */
  public getHealthMetrics(): any {
    return neuralMetricsProvider.getMetrics();
  }
  
  /**
   * Update error metrics when a request fails
   */
  private updateErrorMetrics(): void {
    const currentMetrics = neuralMetricsProvider.getMetrics();
    
    // Increment error rate
    const newErrorRate = (currentMetrics.errorRate || 0) + 0.5;
    
    // Update metrics
    neuralMetricsProvider.updateMetrics({
      ...currentMetrics,
      errorRate: Math.min(newErrorRate, 100)
    });
  }
  
  /**
   * Find the appropriate service to handle a request type
   */
  private getServiceForRequestType(requestType: string): any {
    const services = neuralServiceRegistry.getAllServices();
    
    // First, try to find an exact match by moduleId
    const exactMatch = services.find(s => s.moduleId === requestType);
    if (exactMatch) {
      return exactMatch;
    }
    
    // Next, look for a service that handles this request type
    for (const service of services) {
      if (service.handlesRequestType && service.handlesRequestType(requestType)) {
        return service;
      }
    }
    
    // Finally, look for the default handler
    return services.find(s => s.moduleId === 'default-handler');
  }
}

// Export singleton instances for both backward compatibility and new code
export const neuralHub = UnifiedNeuralHub.getInstance();
export const brainHub = neuralHub; // Alias for backward compatibility
export default neuralHub;
