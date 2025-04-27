
import { BaseNeuralService, NeuralServiceRegistry } from '../types/NeuralService';

class NeuralServiceRegistryImplementation implements NeuralServiceRegistry {
  private services: BaseNeuralService[] = [];

  constructor() {
    // Initialize with some mock services
    this.initMockServices();
  }

  private initMockServices() {
    // Will be populated by services registering themselves
    this.services = [];
  }

  async initialize(): Promise<void> {
    console.log("Initializing Neural Service Registry");
    return Promise.resolve();
  }

  registerService(service: BaseNeuralService): boolean {
    if (this.services.find(s => s.id === service.id)) {
      console.warn(`Service with ID ${service.id} already exists`);
      return false;
    }
    
    this.services.push(service);
    console.log(`Service ${service.id} registered successfully`);
    return true;
  }
  
  getServicesByModule(moduleType: string): BaseNeuralService[] {
    return this.services.filter(service => 
      service.moduleType === moduleType
    );
  }

  optimizeResourceAllocation(): void {
    console.log("Optimizing resource allocation for neural services");
    // Mock implementation
  }

  getAllServices(): BaseNeuralService[] {
    return this.services;
  }

  getService(id: string): BaseNeuralService | undefined {
    return this.services.find(service => service.id === id);
  }
  
  unregisterService(id: string): boolean {
    const initialLength = this.services.length;
    this.services = this.services.filter(service => service.id !== id);
    return this.services.length < initialLength;
  }
}

const neuralServiceRegistry = new NeuralServiceRegistryImplementation();
export default neuralServiceRegistry;
