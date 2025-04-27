
// Fix import by changing NeuralServiceRegistry to NeuralRegistry
import { BaseNeuralService, NeuralServiceRegistry } from '../types/NeuralService';

class NeuralServiceRegistryImplementation implements NeuralServiceRegistry {
  services: Map<string, BaseNeuralService> = new Map();

  constructor() {
    // Initialize with some mock services
    this.initMockServices();
  }

  private initMockServices() {
    // Will be populated by services registering themselves
    this.services = new Map();
  }

  async initialize(): Promise<void> {
    console.log("Initializing Neural Service Registry");
    return Promise.resolve();
  }

  registerService(service: BaseNeuralService): boolean {
    if (this.services.has(service.id)) {
      console.warn(`Service with ID ${service.id} already exists`);
      return false;
    }
    
    this.services.set(service.id, service);
    console.log(`Service ${service.id} registered successfully`);
    return true;
  }
  
  getServicesByModule(moduleType: string): BaseNeuralService[] {
    const result: BaseNeuralService[] = [];
    this.services.forEach(service => {
      if (service.moduleType === moduleType) {
        result.push(service);
      }
    });
    return result;
  }

  optimizeResourceAllocation(): void {
    console.log("Optimizing resource allocation for neural services");
    // Mock implementation
  }

  getAllServices(): BaseNeuralService[] {
    return Array.from(this.services.values());
  }

  getService(id: string): BaseNeuralService | undefined {
    return this.services.get(id);
  }
  
  unregisterService(id: string): boolean {
    return this.services.delete(id);
  }
}

const neuralServiceRegistry = new NeuralServiceRegistryImplementation();
export default neuralServiceRegistry;
