
// Base Neural Service abstract class
export abstract class BaseNeuralService {
  // Make properties public for access throughout the app
  public moduleId: string;
  public moduleType: string;
  public moduleName: string;
  public description: string;
  public config: NeuralServiceConfig = {
    priority: 50,
    autonomyLevel: 50,
    enabled: true
  };

  constructor(
    moduleId: string,
    moduleType: string,
    moduleName: string,
    description: string
  ) {
    this.moduleId = moduleId;
    this.moduleType = moduleType;
    this.moduleName = moduleName;
    this.description = description;
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
  abstract configure(config: Record<string, any>): boolean;
  abstract getMetrics(): Record<string, any>;
  abstract isEnabled(): boolean;
  abstract getConfig(): Record<string, any>;

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

// Neural Service Configuration interface
export interface NeuralServiceConfig {
  priority: number;
  autonomyLevel: number;
  enabled: boolean;
  resourceAllocation?: number;
  boostingEnabled?: boolean;
}

// Neural Service Types
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

// Neural Service interface
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
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
