
export type ModuleType = 
  | 'escorts'
  | 'creators'
  | 'livecams'
  | 'ai_companions'
  | 'core'
  | 'security'
  | 'analytics';

export interface NeuralServiceConfig {
  enabled: boolean;
  apiEndpoint?: string;
  apiKey?: string;
  version: string;
  loadThreshold?: number;
  debugMode?: boolean;
  modelParameters?: Record<string, any>;
  customSettings?: Record<string, any>;
}

export interface BaseNeuralService {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  moduleType: ModuleType;
  version: string;
  config: NeuralServiceConfig;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  
  initialize(): Promise<boolean>;
  configure(): boolean;
  getStatus(): string;
  getCapabilities(): string[];
  getMetrics(): Record<string, any>;
}

export { BaseNeuralService as BaseService };
