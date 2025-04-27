
export type ModuleType = 'general' | 'psychology' | 'physics' | 'economics' | 'robotics' | 'analytics' | string;

export interface NeuralServiceConfig {
  enabled: boolean;
  sensitivity?: number;
  threshold?: number;
  mode?: string;
  apiEndpoint?: string;
  apiKey?: string;
  autonomyLevel?: number;
  priority?: number;
  resourceAllocation?: number;
  [key: string]: any;
}

export interface BaseNeuralService {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  moduleType: ModuleType;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  config: NeuralServiceConfig;
  
  initialize(): Promise<boolean>;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  getCapabilities(): string[];
  getMetrics(): any;
  configure?(config: Partial<NeuralServiceConfig>): boolean;
}

export interface NeuralServiceMetrics {
  operationsCount: number;
  errorRate: number;
  latency: number;
  [key: string]: any;
}

export interface NeuralRegistry {
  services: Map<string, BaseNeuralService>;
  getService(moduleId: string): BaseNeuralService | undefined;
  getAllServices(): BaseNeuralService[];
  registerService(service: BaseNeuralService): boolean;
  initialize(): Promise<void>;
}
