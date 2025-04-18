
// Define module types for neural services
export type ModuleType = 'escorts' | 'creators' | 'livecams' | 'ai-companion';

export interface NeuralServiceConfig {
  enabled: boolean;
  priority: number;
  autonomyLevel: number;
  resourceAllocation: number;
  boostingEnabled?: boolean;
  boostingAlgorithm?: string;
}

export interface NeuralService {
  moduleId: string;
  moduleType: ModuleType;
  config: NeuralServiceConfig;
  getCapabilities: () => string[];
  updateConfig: (newConfig: Partial<NeuralServiceConfig>) => void;
  getId: () => string;
}

export interface NeuralServiceRegistry {
  registerService: (service: NeuralService) => boolean;
  getService: (serviceId: string) => NeuralService | undefined;
  getAllServices: () => NeuralService[];
  getServicesByType: (type: ModuleType) => NeuralService[];
}

export interface NeuralModel {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  accuracy?: number;
  version?: string;
  lastUpdated?: string;
  status?: "error" | "active" | "inactive" | "training";
  specialization?: string | string[];
  size?: number;
  precision?: number;
}
