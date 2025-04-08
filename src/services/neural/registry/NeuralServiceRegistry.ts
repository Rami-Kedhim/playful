
// Define module types
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

// Define neural service configuration
export interface NeuralServiceConfig {
  enabled: boolean;
  priority: number;
  autonomyLevel: number;
  resourceAllocation: number;
  boostingEnabled?: boolean;
  boostingAlgorithm?: string;
  orderByBoost?: boolean;
}

// Define neural service interface
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  
  // Methods
  initialize(): Promise<boolean>;
  processFeedback(feedback: any): void;
  getMetrics(): Record<string, any>;
  getCapabilities(): string[];
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  getConfig(): NeuralServiceConfig;
}

// Neural Service Registry class
class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  
  registerService(service: NeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      console.warn(`Service with ID ${service.moduleId} already exists`);
      return false;
    }
    
    this.services.set(service.moduleId, service);
    console.log(`Registered service: ${service.moduleId} (${service.moduleType})`);
    return true;
  }
  
  unregisterService(moduleId: string): boolean {
    if (!this.services.has(moduleId)) {
      console.warn(`Service with ID ${moduleId} does not exist`);
      return false;
    }
    
    this.services.delete(moduleId);
    console.log(`Unregistered service: ${moduleId}`);
    return true;
  }
  
  getService(moduleId: string): NeuralService | undefined {
    return this.services.get(moduleId);
  }
  
  getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }
  
  getServicesByType(moduleType: ModuleType): NeuralService[] {
    return this.getAllServices().filter(service => service.moduleType === moduleType);
  }
  
  async initializeAll(): Promise<boolean[]> {
    const initPromises = Array.from(this.services.values()).map(service => service.initialize());
    return Promise.all(initPromises);
  }
  
  optimizeResourceAllocation(): void {
    // Simple resource allocation logic
    const services = this.getAllServices();
    const totalServices = services.length;
    
    if (totalServices === 0) return;
    
    // Sort by priority
    const sortedServices = [...services].sort((a, b) => b.config.priority - a.config.priority);
    
    // Allocate resources based on priority
    let remainingAllocation = 100;
    let processedServices = 0;
    
    for (const service of sortedServices) {
      if (processedServices === totalServices - 1) {
        // Last service gets all remaining resources
        service.updateConfig({ resourceAllocation: remainingAllocation });
        break;
      }
      
      // Allocate based on priority weight
      const totalPriorityWeight = sortedServices.reduce((sum, s) => sum + s.config.priority, 0);
      const allocation = Math.floor((service.config.priority / totalPriorityWeight) * 100);
      const cappedAllocation = Math.min(allocation, remainingAllocation);
      
      service.updateConfig({ resourceAllocation: cappedAllocation });
      
      remainingAllocation -= cappedAllocation;
      processedServices++;
    }
  }
}

// Export a singleton instance
export const neuralServiceRegistry = new NeuralServiceRegistry();
