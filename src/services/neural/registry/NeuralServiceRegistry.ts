
import { NeuralService, ModuleType } from '../types/NeuralService';

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  
  registerService(service: NeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      console.warn(`Service with ID ${service.moduleId} already exists.`);
      return false;
    }
    
    this.services.set(service.moduleId, service);
    return true;
  }
  
  unregisterService(moduleId: string): boolean {
    if (!this.services.has(moduleId)) {
      console.warn(`Service with ID ${moduleId} does not exist.`);
      return false;
    }
    
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
    const results = await Promise.all(
      this.getAllServices().map(service => service.initialize())
    );
    
    return results.every(result => result);
  }
  
  async shutdownAll(): Promise<boolean> {
    const results = await Promise.all(
      this.getAllServices().map(service => service.shutdown())
    );
    
    return results.every(result => result);
  }
  
  optimizeResourceAllocation(): void {
    const services = this.getAllServices();
    const totalServices = services.length;
    
    if (totalServices === 0) return;
    
    // Simple optimization algorithm based on priority
    const totalPriority = services.reduce((sum, service) => sum + service.config.priority, 0);
    
    services.forEach(service => {
      // Calculate resource allocation based on priority
      const priorityRatio = service.config.priority / totalPriority;
      const newAllocation = Math.round(priorityRatio * 100);
      
      // Update service config
      service.updateConfig({
        resourceAllocation: newAllocation
      });
    });
  }
}

// Export singleton instance
export const neuralServiceRegistry = new NeuralServiceRegistry();

// Re-export important types
export type { NeuralService, ModuleType };
