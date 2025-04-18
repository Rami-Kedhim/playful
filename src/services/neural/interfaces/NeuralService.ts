
// Neural Service interface
export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  config: NeuralServiceConfig;
  
  initialize(): Promise<boolean>;
  getCapabilities(): string[];
  configure(options: Record<string, any>): void;
  getMetrics(): Record<string, any>;
  isEnabled(): boolean;
  getConfig(): Record<string, any>;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  shutdown?(): Promise<boolean>;
}

// Neural Service Configuration interface
export interface NeuralServiceConfig {
  priority: number;
  autonomyLevel: number;
  enabled: boolean;
  resourceAllocation?: number;
  boostingEnabled?: boolean;
}

// Module types
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';
