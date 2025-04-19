
import { NeuralService, ModuleType } from '../types/NeuralService';

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  private initialized: boolean = false;
  
  constructor() {
    this.services = new Map();
  }
  
  registerService(service: NeuralService): boolean {
    try {
      if (this.services.has(service.moduleId)) {
        console.warn(`Service with ID ${service.moduleId} already exists and will be overwritten`);
      }
      
      this.services.set(service.moduleId, service);
      return true;
    } catch (error) {
      console.error('Failed to register neural service:', error);
      return false;
    }
  }
  
  unregisterService(moduleId: string): boolean {
    return this.services.delete(moduleId);
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
  
  async initializeAll(): Promise<boolean> {
    try {
      for (const service of this.services.values()) {
        await service.initialize();
      }
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize all neural services:', error);
      return false;
    }
  }
  
  async shutdownAll(): Promise<boolean> {
    try {
      for (const service of this.services.values()) {
        if (service.shutdown) {
          await service.shutdown();
        }
      }
      
      this.initialized = false;
      return true;
    } catch (error) {
      console.error('Failed to shutdown all neural services:', error);
      return false;
    }
  }
  
  optimizeResourceAllocation(): void {
    // Simple resource allocation algorithm
    const services = this.getAllServices();
    const serviceCount = services.length;
    
    if (serviceCount === 0) return;
    
    // Calculate total priority
    const totalPriority = services.reduce((sum, service) => sum + service.config.priority, 0);
    
    // Allocate resources based on priority
    services.forEach(service => {
      const normalizedPriority = service.config.priority / (totalPriority || 1);
      const allocatedResource = Math.round(normalizedPriority * 100);
      
      service.updateConfig({
        resourceAllocation: allocatedResource
      });
    });
    
    console.log('Resource allocation optimized for all services');
  }
}

// Export the registry singleton
export const neuralServiceRegistry = new NeuralServiceRegistry();
export type { NeuralService, ModuleType };
export default neuralServiceRegistry;
