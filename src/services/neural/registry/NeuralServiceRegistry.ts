import { BaseNeuralService, NeuralServiceConfig } from '../modules/BaseNeuralService';
import { aiCompanionNeuralService } from '../modules/AICompanionNeuralService';
import { escortsNeuralService } from '../modules/EscortsNeuralService';
import { creatorsNeuralService } from '../modules/CreatorsNeuralService';
import { livecamsNeuralService } from '../modules/LivecamsNeuralService';
import { oxumLearningService } from '../modules/OxumLearningService';

// Define the module types
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion' | 'learning';

// Define the structure of a NeuralService
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  config: NeuralServiceConfig;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  configure(options: Record<string, any>): void;
  getCapabilities(): string[];
  getMetrics(): Record<string, any>;
  initialize(): Promise<boolean>;
  isEnabled(): boolean;
}

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  
  constructor() {
    // Empty constructor
  }
  
  // Register default services at startup
  public registerDefaultServices() {
    // Services are now imported at the top using ES module imports
    // Register each service
    this.registerService(aiCompanionNeuralService);
    this.registerService(escortsNeuralService);
    this.registerService(creatorsNeuralService);
    this.registerService(livecamsNeuralService);
    this.registerService(oxumLearningService);
  }
  
  // Register a new neural service
  public registerService(service: NeuralService): boolean {
    if (!service.moduleId) {
      console.error('Cannot register service without moduleId');
      return false;
    }
    
    if (this.services.has(service.moduleId)) {
      console.warn(`Service with ID ${service.moduleId} already exists`);
      return false;
    }
    
    this.services.set(service.moduleId, service);
    return true;
  }
  
  // Unregister a service by ID
  public unregisterService(moduleId: string): boolean {
    if (!this.services.has(moduleId)) {
      console.warn(`Service with ID ${moduleId} not found`);
      return false;
    }
    
    this.services.delete(moduleId);
    return true;
  }
  
  // Get a specific service by ID
  public getService(moduleId: string): NeuralService | undefined {
    return this.services.get(moduleId);
  }
  
  // Get all services
  public getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }
  
  // Get services by type
  public getServicesByType(moduleType: ModuleType): NeuralService[] {
    return this.getAllServices().filter(service => service.moduleType === moduleType);
  }
  
  // Initialize all services
  public async initializeAll(): Promise<void> {
    // In a real impl, this might load configurations from storage
    console.log(`Initializing ${this.services.size} neural services`);
  }
  
  // Optimize resource allocation across services
  public optimizeResourceAllocation(): void {
    const services = this.getAllServices();
    const enabledServices = services.filter(service => service.config.enabled);
    
    if (enabledServices.length === 0) return;
    
    // Simple optimization: distribute resources based on priority
    const totalPriority = enabledServices.reduce(
      (sum, service) => sum + (service.config.priority || 0), 
      0
    );
    
    if (totalPriority === 0) return;
    
    enabledServices.forEach(service => {
      const priority = service.config.priority || 0;
      const resourceShare = Math.round((priority / totalPriority) * 100);
      
      service.updateConfig({
        resourceAllocation: resourceShare
      });
    });
  }
}

// Export singleton instance
export const neuralServiceRegistry = new NeuralServiceRegistry();

// Initialize default services
setTimeout(() => {
  neuralServiceRegistry.registerDefaultServices();
}, 0);

export default neuralServiceRegistry;
