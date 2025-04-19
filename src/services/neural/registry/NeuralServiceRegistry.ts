
import { ModuleType, BaseNeuralService } from '../types/NeuralService';
import { AICompanionNeuralService } from '../modules/AICompanionNeuralService';

class NeuralServiceRegistry {
  private services: Map<string, BaseNeuralService> = new Map();
  private initialized: boolean = false;

  constructor() {
    // Register core services on instantiation
    this.registerCoreServices();
  }

  private registerCoreServices() {
    // Register the AICompanion service
    const aiCompanionService = new AICompanionNeuralService();
    this.registerService(aiCompanionService);

    // Additional core services would be registered here
  }

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      console.log("Neural service registry already initialized");
      return true;
    }

    console.log("Initializing neural service registry");
    
    // Initialize all registered services
    const initPromises = Array.from(this.services.values()).map(service => service.initialize());
    
    try {
      await Promise.all(initPromises);
      this.initialized = true;
      console.log("Neural service registry initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize neural service registry:", error);
      return false;
    }
  }

  public registerService(service: BaseNeuralService): boolean {
    if (this.services.has(service.id)) {
      console.warn(`Service with ID ${service.id} already registered`);
      return false;
    }
    
    this.services.set(service.id, service);
    console.log(`Registered neural service: ${service.name} (${service.id})`);
    return true;
  }

  public getService(id: string): BaseNeuralService | undefined {
    return this.services.get(id);
  }

  public getServicesByModule(moduleType: ModuleType): BaseNeuralService[] {
    return Array.from(this.services.values())
      .filter(service => service.moduleType === moduleType);
  }

  public getAllServices(): BaseNeuralService[] {
    return Array.from(this.services.values());
  }

  public removeService(id: string): boolean {
    return this.services.delete(id);
  }
}

// Export a singleton instance
const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
