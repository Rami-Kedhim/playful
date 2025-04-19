
// Neural Service Types
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

// Neural Service Configuration interface
export interface NeuralServiceConfig {
  priority: number;
  autonomyLevel: number;
  enabled: boolean;
  resourceAllocation?: number;
  boostingEnabled?: boolean;
}

// Neural Service interface
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  config: NeuralServiceConfig;
  getCapabilities(): string[];
  configure(config: Record<string, any>): boolean;
  getMetrics(): Record<string, any>;
  isEnabled(): boolean;
  getConfig(): Record<string, any>;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  initialize(): Promise<boolean>;
  shutdown?(): Promise<boolean>;
}

// Base Neural Service abstract class
export abstract class BaseNeuralService implements NeuralService {
  // Make properties public for access throughout the app
  public moduleId: string;
  public moduleType: ModuleType;
  public moduleName: string;
  public description: string;
  public version: string;
  public config: NeuralServiceConfig = {
    priority: 50,
    autonomyLevel: 50,
    enabled: true,
    resourceAllocation: 40
  };

  constructor(
    moduleId: string,
    moduleType: ModuleType,
    moduleName: string,
    description: string,
    version: string = '1.0.0'
  ) {
    this.moduleId = moduleId;
    this.moduleType = moduleType;
    this.moduleName = moduleName;
    this.description = description;
    this.version = version;
  }

  // Getters for basic properties
  getId(): string {
    return this.moduleId;
  }

  getType(): string {
    return this.moduleType;
  }

  getName(): string {
    return this.moduleName;
  }

  getDescription(): string {
    return this.description;
  }

  // Abstract methods that must be implemented by subclasses
  abstract getCapabilities(): string[];
  
  configure(config: Record<string, any>): boolean {
    try {
      Object.assign(this.config, config);
      return true;
    } catch (error) {
      console.error(`Error configuring ${this.moduleId}:`, error);
      return false;
    }
  }
  
  getMetrics(): Record<string, any> {
    return {
      moduleId: this.moduleId,
      status: this.isEnabled() ? 'active' : 'inactive',
      resourceUsage: Math.random() * 0.8 + 0.1,
      performance: {
        accuracy: Math.random() * 0.3 + 0.7,
        latency: Math.floor(Math.random() * 100) + 50
      }
    };
  }
  
  isEnabled(): boolean {
    return this.config.enabled;
  }
  
  getConfig(): Record<string, any> {
    return { ...this.config };
  }

  // Common methods all neural services can use
  updateConfig(partialConfig: Partial<NeuralServiceConfig>): void {
    this.config = {
      ...this.config,
      ...partialConfig
    };
  }

  // Add initialize and shutdown methods
  async initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }

  async shutdown(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
