
export interface INeuralHub {
  processRequest: (request: NeuralRequest) => Promise<NeuralResponse>;
  registerModule: (moduleType: string, module: any) => void;
  getModule: (moduleType: string) => any;
  getSystemStatus: () => NeuralSystemStatus;
  
  // Additional methods needed by components
  initialize?: () => Promise<void>;
  getActiveTrainingJobs?: () => TrainingProgress[];
  getModels?: () => NeuralModel[];
  stopTraining?: (jobId: string) => Promise<boolean>;
  startTraining?: (type: string, options?: any) => Promise<any>;
  getHealthMetrics?: () => any;
  getModelParameters?: () => ModelParameters;
  updateModelParameters?: (parameters: Partial<ModelParameters>) => void;
  getConfig?: () => any;
  updateConfig?: (config: any) => Promise<boolean>;
  getDecisionLogs?: () => any[];
  getService?: (serviceId: string) => any;
}

export interface NeuralRequest {
  type: string;
  data: any;
  options?: any;
  filters?: any; // Adding filters property to fix errors
}

export interface NeuralResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface NeuralSystemStatus {
  operational: boolean;
  uptime: number;
  activeModules: string[];
  processingQueue: number;
  latency: number;
  
  // Additional properties needed by components
  cpuUtilization?: number;
  memoryUtilization?: number;
  errorRate?: number;
  responseTime?: number;
  operationsPerSecond?: number;
  neuralAccuracy?: number;
  neuralEfficiency?: number;
  neuralLatency?: number;
  stability?: number;
}

// Additional types needed by components
export interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  responseFormat: string;
  model: string;
}

export interface TrainingProgress {
  id: string;
  type: string;
  progress: number;
  status: 'training' | 'completed' | 'failed' | 'stopped';
  startTime: Date;
  estimatedCompletionTime?: Date;
  currentEpoch?: number;
  totalEpochs?: number;
  metrics?: {
    loss?: number;
    accuracy?: number;
  };
}

export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  type: string;
  status: string;
  performance: {
    accuracy: number;
    latency: number;
  };
}

// Additional types needed for compatibility
export type BrainHubRequest = NeuralRequest;
export type BrainHubResponse = NeuralResponse;
