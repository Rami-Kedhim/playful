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
  filters?: any;
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
  
  // Additional properties
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

// Updated to match the ModelParameters from modelParameters.ts
export interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  modelName: string;
  responseFormat?: string;
  model?: string;
  decayConstant?: number;
  learningRate?: number;
  batchSize?: number;
  stopSequences?: string[];
}

// Updated to match TrainingProgress from trainingManager.ts
export interface TrainingProgress {
  id: string;
  modelId: string;
  type: string;
  progress: number;
  status: 'training' | 'completed' | 'failed' | 'stopped' | 'waiting';
  startTime: Date;
  estimatedCompletionTime?: Date;
  currentEpoch?: number;
  totalEpochs?: number;
  epoch: number;
  loss: number;
  accuracy: number;
  timestamp: string;
  timeRemaining?: number;
  targetAccuracy?: number;
  error?: string;
  metrics?: {
    loss?: number;
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
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
