
export type ModuleType = 'core' | 'transformer' | 'analytics' | 'interface' | 'connector' | 'scheduler' | string;

export interface NeuralServiceConfig {
  enabled: boolean;
  priority: string | number; // Allow both string and number for priority
  resources?: {
    cpu: number;
    memory: number;
    [key: string]: any;
  };
  sensitivity?: number;
  threshold?: number;
  mode?: string;
  autonomyLevel?: number;
  resourceAllocation?: number;
  [key: string]: any;
}

export interface BaseNeuralService {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance' | string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  getMetrics: () => any;
  initialize?: () => Promise<boolean>;
  updateConfig?: (config: NeuralServiceConfig) => void;
  getCapabilities?: () => string[];
  processRequest?: (request: any) => Promise<any>;
  canHandleRequestType?: (requestType: string) => boolean;
  [key: string]: any;
}
