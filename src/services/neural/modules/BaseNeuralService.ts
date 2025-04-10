
import { ModuleType } from '../registry/NeuralServiceRegistry';

export interface NeuralServiceConfig {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  enabled: boolean;
  priority?: number;
  autonomyLevel?: number;
  resourceAllocation?: number;
  resourcePriority?: 'low' | 'medium' | 'high';
  [key: string]: any;
}

export class BaseNeuralService {
  public readonly moduleId: string;
  public readonly moduleType: ModuleType;
  public readonly moduleName: string;
  public readonly description: string;
  public readonly version: string;
  public config: NeuralServiceConfig;

  constructor(config: NeuralServiceConfig) {
    this.moduleId = config.moduleId;
    this.moduleType = config.moduleType;
    this.moduleName = config.moduleName;
    this.description = config.description;
    this.version = config.version;
    this.config = {
      ...config,
      priority: config.priority || 50,
      autonomyLevel: config.autonomyLevel || 50,
      resourceAllocation: config.resourceAllocation || 50,
    };
  }

  public updateConfig(config: Partial<NeuralServiceConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }
  
  public configure(options: Record<string, any>): void {
    this.updateConfig(options);
  }
  
  public getMetrics(): Record<string, any> {
    return {
      moduleId: this.moduleId,
      moduleType: this.moduleType,
      enabled: this.config.enabled,
      priority: this.config.priority,
      autonomyLevel: this.config.autonomyLevel,
      resourceAllocation: this.config.resourceAllocation,
    };
  }

  public getCapabilities(): string[] {
    return [];
  }
}
