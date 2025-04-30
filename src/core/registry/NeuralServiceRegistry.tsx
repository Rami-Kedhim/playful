
import { NeuralModel } from '@/types/neural/NeuralSystemMetrics';

interface NeuralService {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  version: string;
  initialize: () => Promise<boolean>;
  shutdown: () => Promise<boolean>;
}

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();
  private models: Map<string, NeuralModel> = new Map();
  private isInitialized = false;

  public async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      console.log('Neural service registry already initialized');
      return true;
    }

    console.log('Initializing Neural Service Registry');
    
    // Initialize registered services
    for (const service of this.services.values()) {
      try {
        await service.initialize();
        console.log(`Initialized service: ${service.name}`);
      } catch (error) {
        console.error(`Failed to initialize service ${service.name}:`, error);
      }
    }

    this.isInitialized = true;
    return true;
  }

  public registerService(service: NeuralService): void {
    if (this.services.has(service.id)) {
      console.warn(`Service with ID ${service.id} already registered, replacing`);
    }
    this.services.set(service.id, service);
    console.log(`Registered neural service: ${service.name} (${service.id})`);
  }

  public unregisterService(serviceId: string): boolean {
    const result = this.services.delete(serviceId);
    if (result) {
      console.log(`Unregistered service: ${serviceId}`);
    } else {
      console.warn(`Failed to unregister service ${serviceId}: not found`);
    }
    return result;
  }

  public getService(serviceId: string): NeuralService | undefined {
    return this.services.get(serviceId);
  }

  public getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }

  public registerModel(model: NeuralModel): void {
    if (this.models.has(model.id)) {
      console.warn(`Model with ID ${model.id} already registered, replacing`);
    }
    this.models.set(model.id, model);
    console.log(`Registered neural model: ${model.name} (${model.id})`);
  }

  public getModel(modelId: string): NeuralModel | undefined {
    return this.models.get(modelId);
  }

  public getAllModels(): NeuralModel[] {
    return Array.from(this.models.values());
  }
}

// Create and export a singleton instance
const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
