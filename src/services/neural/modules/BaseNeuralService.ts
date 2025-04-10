
import { NeuralService, NeuralServiceConfig, ModuleType } from '../registry/NeuralServiceRegistry';

interface BaseNeuralServiceParams {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  enabled?: boolean;
}

export abstract class BaseNeuralService implements NeuralService {
  readonly moduleId: string;
  readonly moduleType: ModuleType;
  readonly moduleName: string;
  readonly description: string;
  readonly version: string;
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

  constructor(params: BaseNeuralServiceParams) {
    this.moduleId = params.moduleId;
    this.moduleType = params.moduleType;
    this.moduleName = params.moduleName;
    this.description = params.description;
    this.version = params.version;
    
    if (params.enabled !== undefined) {
      this.config.enabled = params.enabled;
    }
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
