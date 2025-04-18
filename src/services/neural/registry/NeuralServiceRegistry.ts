
import { NeuralService } from '../interfaces/NeuralService';
import { EscortsNeuralService } from '../modules/EscortsNeuralService';
import { CreatorsNeuralService } from '../modules/CreatorsNeuralService';
import { LivecamsNeuralService } from '../modules/LivecamsNeuralService';
import { AICompanionNeuralService } from '../modules/AICompanionNeuralService';

class NeuralServiceRegistry {
  private services: Map<string, NeuralService> = new Map();

  constructor() {
    this.registerDefaultServices();
  }

  private registerDefaultServices(): void {
    this.register('escorts', new EscortsNeuralService());
    this.register('creators', new CreatorsNeuralService());
    this.register('livecams', new LivecamsNeuralService());
    this.register('ai-companion', new AICompanionNeuralService());
  }

  register(name: string, service: NeuralService): void {
    this.services.set(name, service);
    console.log(`Registered neural service: ${name}`);
  }

  getService(name: string): NeuralService | undefined {
    return this.services.get(name);
  }

  getAllServices(): NeuralService[] {
    return Array.from(this.services.values());
  }
}

// Export a singleton instance
const neuralServiceRegistry = new NeuralServiceRegistry();
export default neuralServiceRegistry;
