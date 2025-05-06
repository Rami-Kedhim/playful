
export type ModuleType = 
  | 'core'
  | 'neural'
  | 'boost'
  | 'analytics'
  | 'security'
  | 'personalization'
  | string;

export interface NeuralServiceConfig {
  enabled: boolean;
  priority: 'low' | 'normal' | 'high' | 'critical';
  resources: {
    cpu: number;
    memory: number;
  };
}

export interface BaseNeuralService {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  
  getMetrics: () => Record<string, number>;
  initialize: () => Promise<boolean>;
  updateConfig: (config: Partial<NeuralServiceConfig>) => void;
  getCapabilities: () => string[];
  processRequest: (request: any) => Promise<any>;
  canHandleRequestType: (requestType: string) => boolean;
  reset?: () => Promise<boolean>;
}
