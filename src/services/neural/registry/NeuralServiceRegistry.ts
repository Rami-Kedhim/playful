
import { BaseNeuralService, ModuleType } from '../types/NeuralService';

class NeuralServiceRegistry {
  private services: Map<string, BaseNeuralService> = new Map();
  
  registerService(service: BaseNeuralService): boolean {
    if (this.services.has(service.id)) {
      console.warn(`Service with ID ${service.id} is already registered.`);
      return false;
    }
    
    this.services.set(service.id, service);
    console.log(`Service ${service.name} registered successfully.`);
    return true;
  }
  
  getService(id: string): BaseNeuralService | undefined {
    return this.services.get(id);
  }
  
  getServiceById(id: string): BaseNeuralService | undefined {
    return this.services.get(id);
  }
  
  getServicesByType(type: ModuleType): BaseNeuralService[] {
    return Array.from(this.services.values())
      .filter(service => service.moduleType === type);
  }
  
  getAllServices(): BaseNeuralService[] {
    return Array.from(this.services.values());
  }
  
  removeService(id: string): boolean {
    return this.services.delete(id);
  }
  
  unregisterService(id: string): boolean {
    return this.services.delete(id);
  }
  
  clear(): void {
    this.services.clear();
  }
  
  getServicesCount(): number {
    return this.services.size;
  }

  async initializeAll(): Promise<boolean> {
    try {
      for (const service of this.services.values()) {
        await service.initialize();
      }
      return true;
    } catch (error) {
      console.error("Error initializing services:", error);
      return false;
    }
  }

  optimizeResourceAllocation(): void {
    console.log("Optimizing resource allocation for neural services...");
    // Implementation would go here in a real system
  }
}

export const neuralServiceRegistry = new NeuralServiceRegistry();
export type { BaseNeuralService as NeuralService };
export { ModuleType };
export default neuralServiceRegistry;
