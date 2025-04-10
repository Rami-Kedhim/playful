
import { ModuleType } from '../registry/NeuralServiceRegistry';

export interface NeuralServiceConfig {
  enabled: boolean;
  priority?: number;
  resourceAllocation?: number;
  [key: string]: any;
}

export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  moduleName: string;
  description: string;
  version: string;
  config: NeuralServiceConfig;
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  configure(options: Record<string, any>): void;
  getCapabilities(): string[];
  getMetrics(): Record<string, any>;
  initialize(): Promise<boolean>;
  isEnabled(): boolean;
}
