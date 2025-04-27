
export interface NeuralServiceConfig {
  enabled: boolean;
  sensitivity: number;
  threshold: number;
  mode: string;
  [key: string]: any;
}

export interface BaseNeuralService {
  id: string;
  name: string;
  moduleId: string;
  description: string;
  moduleType: string;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  config: NeuralServiceConfig;
  initialize: () => Promise<boolean>;
  updateConfig: (config: Partial<NeuralServiceConfig>) => void;
  getMetrics: () => {
    operationsCount: number;
    errorRate: number;
    latency: number;
    [key: string]: any;
  };
}

export interface NeuralServiceRegistry {
  initialize: () => Promise<void>;
  registerService: (service: BaseNeuralService) => boolean;
  getService: (id: string) => BaseNeuralService | undefined;
  getAllServices: () => BaseNeuralService[];
  getServicesByModule: (moduleType: string) => BaseNeuralService[];
  optimizeResourceAllocation: () => void;
}

export type ModuleType = string;
