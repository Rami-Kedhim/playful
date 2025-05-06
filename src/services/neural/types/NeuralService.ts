
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
  
  // Methods
  isRunning: () => boolean;  // Changed from boolean to function
  start: () => Promise<boolean>;
  stop: () => Promise<boolean>;
  configure: (config: Partial<NeuralServiceConfig>) => void;
  processWithNeuralCore: (input: any) => Promise<any>;
  getCapabilities?: () => string[];  // Added as optional method
  initialize?: () => Promise<boolean>;  // Added as optional method
}

export interface NeuralServiceConfig {
  enabled: boolean;
  priority: number | 'high' | 'normal' | 'low' | 'critical';
  dependencies?: string[];
  moduleOptions?: Record<string, any>;
  autonomyLevel?: number; // 0-100
  resourceAllocation?: number; // 0-100
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  cpuUsage: number;  // Added this property
  memoryUsage: number;  // Added this property
  systemLoad: number;
  requestRate?: number; // Optional field
}
