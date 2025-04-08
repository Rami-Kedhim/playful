
import { NeuralService, NeuralServiceConfig, ModuleType } from '../registry/NeuralServiceRegistry';

export abstract class BaseNeuralService implements NeuralService {
  readonly moduleId: string;
  readonly moduleType: ModuleType;
  protected isInitialized: boolean = false;
  
  // Make config public to align with NeuralService interface
  public config: NeuralServiceConfig = {
    enabled: true,
    priority: 50,
    autonomyLevel: 50,
    resourceAllocation: 50,
    boostingEnabled: false,
    boostingAlgorithm: '',
    orderByBoost: false
  };

  constructor(moduleId: string, moduleType: ModuleType) {
    this.moduleId = moduleId;
    this.moduleType = moduleType;
  }

  async initialize(): Promise<boolean> {
    // Base implementation
    this.isInitialized = true;
    return true;
  }

  processFeedback(feedback: any): void {
    // Base implementation
    console.log(`Processing feedback for ${this.moduleId}:`, feedback);
  }

  getMetrics(): Record<string, any> {
    // Base implementation
    return {
      operationsCount: 0,
      successRate: 100,
      averageLatency: 0
    };
  }

  getCapabilities(): string[] {
    // Base implementation - should be overridden by subclasses
    return [];
  }

  updateConfig(config: Partial<NeuralServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): NeuralServiceConfig {
    return this.config;
  }
  
  isEnabled(): boolean {
    return this.config.enabled;
  }
}
