
// Define the module types for neural services
export type ModuleType = 
  | 'escorts'
  | 'creators'
  | 'livecams'
  | 'ai_companions'
  | 'core'
  | 'security'
  | 'analytics';

// Neural service configuration interface
export interface NeuralServiceConfig {
  enabled: boolean;
  apiEndpoint?: string;
  apiKey?: string;
  version: string;
  loadThreshold?: number;
  debugMode?: boolean;
  modelParameters?: Record<string, any>;
  customSettings?: Record<string, any>;
  priority?: number;
  autonomyLevel?: number;
  resourceAllocation?: number;
}

// Base neural service interface that all services must implement
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
  updateConfig(config: Partial<NeuralServiceConfig>): void;
  configure(): boolean;
  getStatus(): string;
  getCapabilities(): string[];
  getMetrics(): Record<string, any>;
}

// Export BaseNeuralService as BaseService for backward compatibility
export { BaseNeuralService as BaseService };
