
import { NeuralServiceConfig as Config } from './neuralHub';

export interface NeuralServiceConfig extends Config {
  enabled: boolean;
  priority?: number | 'low' | 'normal' | 'high' | 'critical';
  description?: string;
  dependencies?: string[];
  moduleOptions?: Record<string, any>;
  optimizationLevel?: 'basic' | 'standard' | 'advanced';
  resources?: {
    cpu: number;
    memory: number;
  };
  autonomyLevel?: number;
  resourceAllocation?: number;
}

export interface BaseNeuralService {
  id?: string;
  moduleId: string;
  name: string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  description?: string;
  version?: string;
  status?: 'active' | 'inactive' | 'error' | 'maintenance';
  isRunning?: () => boolean;
  start?: () => Promise<void>;
  stop?: () => Promise<void>;
  configure?: (config: NeuralServiceConfig) => Promise<void>;
  processWithNeuralCore?: (input: string, options?: any) => Promise<any>;
  getMetrics?: () => any;
  getCapabilities?: () => string[];
  initialize?: () => Promise<boolean>;
  processRequest?: (request: any) => Promise<any>;
  canHandleRequestType?: (requestType: string) => boolean;
  updateConfig?: (config: Partial<NeuralServiceConfig>) => void;
  reset?: () => Promise<boolean>;
}

export enum ModuleType {
  COMPANION = 'companion',
  CREATORS = 'creators', 
  ESCORTS = 'escorts',
  LIVECAMS = 'livecams',
  SEO = 'seo',
  GENERIC = 'generic',
  CORE = 'core',
  NEURAL = 'neural',
  AUTOMATION = 'automation',
  STREAMING = 'streaming'
}

// Add the SystemHealthMetrics interface that's referenced in several places
export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  systemLoad?: number;
  cpuUsage?: number;
  memoryUsage?: number;
}
