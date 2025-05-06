
export enum ModuleType {
  NEURAL = 'NEURAL',
  CORE = 'CORE',
  ESCORTS = 'ESCORTS',
  CREATORS = 'CREATORS',
  LIVECAMS = 'LIVECAMS',
  COMPANION = 'COMPANION',
  SEO = 'SEO',
  AUTOMATION = 'AUTOMATION',
  STREAMING = 'STREAMING'
}

export interface BaseNeuralService {
  moduleId: string;
  name: string;
  description: string;
  moduleType: ModuleType;
  version: string;
  config: NeuralServiceConfig;
  id?: string;
  status?: 'active' | 'inactive' | 'error' | 'maintenance';
  
  // Methods
  isRunning: () => boolean;
  start: () => Promise<boolean>;
  stop: () => Promise<boolean>;
  configure: (config: Partial<NeuralServiceConfig>) => void;
  processWithNeuralCore: (input: any) => Promise<any>;
  getCapabilities?: () => string[];
  initialize?: () => Promise<boolean>;
  
  // Added required methods that were missing
  getMetrics?: () => any;
  updateConfig?: (config: Partial<NeuralServiceConfig>) => void;
  processRequest?: (request: any) => Promise<any>;
  canHandleRequestType?: (requestType: string) => boolean;
  reset?: () => Promise<boolean>;
}

export interface NeuralServiceConfig {
  enabled: boolean;
  priority: number | 'high' | 'normal' | 'low' | 'critical';
  dependencies?: string[];
  moduleOptions?: Record<string, any>;
  autonomyLevel?: number; // 0-100
  resourceAllocation?: number; // 0-100
  resources?: Record<string, any>; // Adding resources field that was missing
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  systemLoad?: number; // Changed to optional since some places don't use it
  requestRate?: number; // Optional field
}
