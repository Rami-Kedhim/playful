
// Base Neural Service abstract class
export abstract class BaseNeuralService {
  // Common properties
  protected moduleId: string;
  protected moduleType: string;
  protected moduleName: string;
  protected description: string;
  protected config: NeuralServiceConfig = {
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
}

// Neural Service Configuration interface
export interface NeuralServiceConfig {
  priority: number;
  autonomyLevel: number;
  enabled: boolean;
}

// Neural Service Types
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

// Neural Service interface
export interface NeuralService {
  getId(): string;
  getType(): string;
  getName(): string;
  getDescription(): string;
  getCapabilities(): string[];
  configure(config: Record<string, any>): boolean;
  getMetrics(): Record<string, any>;
  isEnabled(): boolean;
  getConfig(): Record<string, any>;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
}
