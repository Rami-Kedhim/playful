
import { BaseNeuralService } from '@/services/neural/modules/BaseNeuralService';
import { aiCompanionNeuralService } from '@/services/neural/modules/AICompanionNeuralService';
import { oxumLearningService } from '@/services/neural/modules/OxumLearningService';

export type ModuleType = 'companion' | 'content' | 'learning' | 'analytics';

export interface NeuralServiceConfig {
  enabled: boolean;
  [key: string]: any;
}

export interface NeuralService {
  moduleId: string;
  moduleName: string;
  moduleType: ModuleType;
  description: string;
  version: string;
  config: NeuralServiceConfig;
  initialize(): Promise<boolean>;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
}

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  private initialized: boolean = false;
  
  constructor() {
    // Register built-in services
    this.registerBuiltInServices();
  }
  
  /**
   * Register built-in neural services
   */
  private registerBuiltInServices(): void {
    // Register AI Companion neural service
    this.registerService(aiCompanionNeuralService);
    
    // Register Oxum Learning service
    this.registerService(oxumLearningService);
  }
  
  /**
   * Initialize all registered services
   */
  public async initializeAll(): Promise<boolean[]> {
    if (this.initialized) {
      return Array.from(this.services.values()).map(() => true);
    }
    
    const initPromises = Array.from(this.services.values()).map(service => 
      service.initialize().catch(err => {
        console.error(`Failed to initialize service ${service.moduleId}:`, err);
        return false;
      })
    );
    
    const results = await Promise.all(initPromises);
    this.initialized = results.every(result => result === true);
    
    return results;
  }
  
  /**
   * Register a new neural service
   */
  public registerService(service: NeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      console.error(`Service with ID ${service.moduleId} already registered`);
      return false;
    }
    
    this.services.set(service.moduleId, service);
    return true;
  }
  
  /**
   * Unregister a neural service
   */
  public unregisterService(serviceId: string): boolean {
    if (!this.services.has(serviceId)) {
      return false;
    }
    
    return this.services.delete(serviceId);
  }
  
  /**
   * Get a specific service by ID
   */
  public getService(serviceId: string): NeuralService | undefined {
    return this.services.get(serviceId);
  }
  
  /**
   * Get all registered services
   */
  public getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }
  
  /**
   * Get services by type
   */
  public getServicesByType(moduleType: ModuleType): NeuralService[] {
    return Array.from(this.services.values())
      .filter(service => service.moduleType === moduleType);
  }
  
  /**
   * Optimize the resource allocation between services
   */
  public optimizeResourceAllocation(): void {
    // In a real implementation, this would adjust resources between neural services
    console.log('Optimizing neural service resource allocation');
    
    // Count services by type
    const serviceTypes = Array.from(this.services.values())
      .reduce((acc, service) => {
        acc[service.moduleType] = (acc[service.moduleType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
    console.log('Service distribution:', serviceTypes);
  }
}

// Export singleton instance
export const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
