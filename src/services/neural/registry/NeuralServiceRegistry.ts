
import { NeuralService } from '../interfaces/NeuralService';

export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();

  registerService(service: NeuralService): boolean {
    if (this.services.has(service.moduleId)) {
      return false;
    }
    this.services.set(service.moduleId, service);
    return true;
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

  getServicesByType(type: ModuleType): NeuralService[] {
    return this.getAllServices().filter(service => service.moduleType === type);
  }
}

export { NeuralService };
export const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
