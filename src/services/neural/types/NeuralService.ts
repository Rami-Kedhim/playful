import { NeuralServiceConfig as Config } from './neuralHub';

export interface NeuralServiceConfig extends Config {
  enabled: boolean;
  priority?: number;
  description?: string;
  dependencies?: string[];
  moduleOptions?: Record<string, any>;
  optimizationLevel?: 'basic' | 'standard' | 'advanced';
}

export interface BaseNeuralService {
  moduleId: string;
  name: string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  isRunning: () => boolean;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  configure: (config: NeuralServiceConfig) => Promise<void>;
  processWithNeuralCore: (input: string, options?: any) => Promise<any>;
}

export enum ModuleType {
  COMPANION = 'companion',
  CREATORS = 'creators', 
  ESCORTS = 'escorts',
  LIVECAMS = 'livecams',
  SEO = 'seo', // Add the new SEO module type
  GENERIC = 'generic'
}
