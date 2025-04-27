
import BaseBrainService from './modules/BaseNeuralService';
import type { BaseNeuralService } from './types/NeuralService';
import { NeuralServiceConfig } from './types/NeuralService';

class HermesOxumNeuralHub {
  private services: Map<string, BaseNeuralService> = new Map();
  private initialized = false;

  constructor() {
    // Initialize with empty services map
  }

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    console.log("Initializing Hermes-Oxum Neural Hub...");
    
    // Add some default services for demo
    const defaultServices = [
      new BaseBrainService({
        id: "neural-text-processor",
        moduleId: "text-processor",
        name: "Neural Text Processor",
        description: "Processes and analyzes text input using neural networks",
        moduleType: "text-analysis",
        version: "2.1.0",
        config: {
          enabled: true,
          sensitivity: 0.8,
          threshold: 0.6,
          mode: "advanced"
        }
      }),
      new BaseBrainService({
        id: "neural-image-processor",
        moduleId: "image-processor",
        name: "Neural Image Processor",
        description: "Analyzes and processes images using neural networks",
        moduleType: "image-analysis",
        version: "1.5.0",
        config: {
          enabled: true,
          sensitivity: 0.7,
          threshold: 0.5,
          mode: "standard"
        }
      })
    ];

    // Register the services
    for (const service of defaultServices) {
      this.registerService(service);
      await service.initialize();
    }

    this.initialized = true;
    return true;
  }

  public registerService(service: BaseNeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      console.warn(`Service with moduleId ${service.moduleId} already registered. Skipping.`);
      return false;
    }

    this.services.set(service.moduleId, service);
    console.log(`Registered neural service: ${service.name} (${service.moduleId})`);
    return true;
  }

  public getService(moduleId: string): BaseNeuralService | undefined {
    return this.services.get(moduleId);
  }

  public getAllServices(): BaseNeuralService[] {
    return Array.from(this.services.values());
  }

  public getServicesByType(moduleType: string): BaseNeuralService[] {
    return this.getAllServices().filter(service => service.moduleType === moduleType);
  }

  public async processRequest(moduleId: string, requestType: string, data: any): Promise<any> {
    const service = this.getService(moduleId);
    if (!service) {
      throw new Error(`Service ${moduleId} not found`);
    }

    if (!service.config.enabled) {
      throw new Error(`Service ${moduleId} is disabled`);
    }

    // This would normally dispatch to the appropriate handler on the service
    console.log(`Processing ${requestType} request for ${moduleId} with data:`, data);
    
    // Mock processing result
    return {
      success: true,
      result: `Processed ${requestType} with ${moduleId}`,
      timestamp: new Date().toISOString()
    };
  }

  public updateServiceConfig(moduleId: string, config: Partial<NeuralServiceConfig>): boolean {
    const service = this.getService(moduleId);
    if (!service) {
      return false;
    }

    service.updateConfig(config);
    return true;
  }
  
  // Return health metrics for monitoring - updated to include missing properties
  public getHealthMetrics() {
    return {
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      requestsPerSecond: Math.floor(Math.random() * 1000),
      errorRate: Math.random() * 5,
      lastUpdated: Date.now(),
      load: Math.random(),
      userEngagement: Math.random()
    };
  }
  
  // Add missing methods for NeuralSystemsPanel
  public getActiveTrainingJobs() {
    return []; // Mock implementation
  }
  
  public getModels() {
    return []; // Mock implementation
  }
  
  public stopTraining(jobId: string) {
    console.log(`Stopping training job ${jobId}`);
    return true; // Mock implementation
  }
  
  public startTraining(modelConfig: any) {
    console.log(`Starting training with config:`, modelConfig);
    return { jobId: `job-${Math.random().toString(36).substring(2, 9)}` }; // Mock implementation
  }
}

// Export the class instance as the default export
export const hermesOxumNeuralHub = new HermesOxumNeuralHub();

// Also export as neuralHub for backward compatibility with existing imports
export const neuralHub = hermesOxumNeuralHub;

// Export ModelParameters type for other modules
export interface ModelParameters {
  decayConstant?: number;
  growthFactor?: number;
  cyclePeriod?: number;
  harmonicCount?: number;
  bifurcationPoint?: number;
  attractorStrength?: number;
  learningRate?: number;
  batchSize?: number;
  temperature?: number;
}

export default hermesOxumNeuralHub;
