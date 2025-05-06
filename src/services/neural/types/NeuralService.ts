
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
  isRunning: boolean;
  start: () => Promise<boolean>;
  stop: () => Promise<boolean>;
  configure: (config: Partial<NeuralServiceConfig>) => void;
  processWithNeuralCore: (input: any) => Promise<any>;
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
  systemLoad: number;
  requestRate?: number; // Optional field
}
