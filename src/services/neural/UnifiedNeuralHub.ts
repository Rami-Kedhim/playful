
import { INeuralHub, NeuralRequest, NeuralResponse, NeuralSystemStatus, ModelParameters } from './types/neuralHub';
import neuralServiceRegistry from './registry/NeuralServiceRegistry';
import { BaseNeuralService } from './types/NeuralService';
import { HealthMetrics } from '@/types/neuralMetrics';
import neuralMetricsProvider from './monitoring/NeuralMetricsProvider';

/**
 * Unified Neural Hub - Core neural processing system
 * Handles communication between modules and provides system status
 */
export class UnifiedNeuralHub implements INeuralHub {
  private static instance: UnifiedNeuralHub;
  private modules: Map<string, BaseNeuralService> = new Map();
  private initialized: boolean = false;
  private modelParameters: ModelParameters = {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    modelName: 'default-model'
  };
  private processingQueue: NeuralRequest[] = [];
  private startTime: number = Date.now();
  private errorCount: number = 0;
  private requestCount: number = 0;
  private totalResponseTime: number = 0;
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  /**
   * Get single instance of the hub
   */
  public static getInstance(): UnifiedNeuralHub {
    if (!UnifiedNeuralHub.instance) {
      UnifiedNeuralHub.instance = new UnifiedNeuralHub();
    }
    return UnifiedNeuralHub.instance;
  }
  
  /**
   * Initialize the hub
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    try {
      console.log('Initializing Neural Hub...');
      
      // Register all available services
      const services = neuralServiceRegistry.getAllServices();
      for (const service of services) {
        this.registerModule(service.moduleType, service);
      }
      
      // Initialize all modules
      for (const [_, module] of this.modules) {
        if (typeof module.initialize === 'function') {
          await module.initialize();
        }
      }
      
      this.initialized = true;
      console.log('Neural Hub initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Neural Hub:', error);
      throw new Error('Neural Hub initialization failed');
    }
  }

  /**
   * Process a request through the neural hub
   */
  public async processRequest(request: NeuralRequest): Promise<NeuralResponse> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    this.processingQueue.push(request);
    this.requestCount++;
    
    const startTime = Date.now();
    
    try {
      // Find the appropriate module to handle the request
      const module = this.findModuleForRequest(request);
      
      if (!module) {
        this.errorCount++;
        this.processingQueue = this.processingQueue.filter(r => r !== request);
        
        return {
          success: false,
          error: `No module found to handle request type: ${request.type}`
        };
      }
      
      // Process the request
      const response = await module.processRequest(request);
      
      const responseTime = Date.now() - startTime;
      this.totalResponseTime += responseTime;
      
      this.processingQueue = this.processingQueue.filter(r => r !== request);
      
      return response || {
        success: true,
        data: { processed: true, message: 'Request processed successfully' }
      };
    } catch (error) {
      this.errorCount++;
      this.processingQueue = this.processingQueue.filter(r => r !== request);
      
      console.error(`Error processing request (${request.type}):`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error processing request'
      };
    }
  }
  
  /**
   * Register a module with the hub
   */
  public registerModule(moduleType: string, module: BaseNeuralService): void {
    this.modules.set(moduleType, module);
    console.log(`Module registered: ${moduleType} (${module.name})`);
  }
  
  /**
   * Get a module by type
   */
  public getModule(moduleType: string): BaseNeuralService | undefined {
    return this.modules.get(moduleType);
  }
  
  /**
   * Get current system status
   */
  public getSystemStatus(): NeuralSystemStatus {
    const uptime = (Date.now() - this.startTime) / 1000 / 60 / 60; // hours
    const errorRate = this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0;
    const avgResponseTime = this.requestCount > 0 ? this.totalResponseTime / this.requestCount : 0;
    
    const metrics = neuralMetricsProvider.getMetrics();
    
    return {
      operational: this.initialized,
      uptime,
      activeModules: Array.from(this.modules.keys()),
      processingQueue: this.processingQueue.length,
      latency: avgResponseTime,
      errorRate,
      cpuUtilization: metrics.cpuUtilization,
      memoryUtilization: metrics.memoryUtilization,
      responseTime: avgResponseTime,
      operationsPerSecond: this.requestCount / (uptime * 60 * 60),
      stability: 1 - (errorRate / 100),
      neuralAccuracy: metrics.neuralAccuracy,
      neuralEfficiency: metrics.neuralEfficiency,
      neuralLatency: metrics.neuralLatency
    };
  }
  
  /**
   * Get health metrics for the hub
   */
  public getHealthMetrics(): HealthMetrics {
    return neuralMetricsProvider.getMetrics();
  }
  
  /**
   * Get model parameters
   */
  public getModelParameters(): ModelParameters {
    return { ...this.modelParameters };
  }
  
  /**
   * Update model parameters
   */
  public updateModelParameters(parameters: Partial<ModelParameters>): void {
    this.modelParameters = {
      ...this.modelParameters,
      ...parameters
    };
    
    console.log('Model parameters updated:', this.modelParameters);
  }
  
  /**
   * Find the appropriate module to handle a request
   */
  private findModuleForRequest(request: NeuralRequest): BaseNeuralService | undefined {
    // First check direct module type mapping
    if (this.modules.has(request.type)) {
      return this.modules.get(request.type);
    }
    
    // Then look for modules that explicitly handle this request type
    for (const [_, module] of this.modules) {
      // Check if the module has a canHandle method
      if (typeof module.canHandleRequestType === 'function' && 
          module.canHandleRequestType(request.type)) {
        return module;
      }
    }
    
    // Default to a general processor if available
    return this.modules.get('general-processor');
  }
}

// Singleton instance exports
export const neuralHub: INeuralHub = UnifiedNeuralHub.getInstance();
export const brainHub = neuralHub; // Alias for backward compatibility
export default neuralHub;
