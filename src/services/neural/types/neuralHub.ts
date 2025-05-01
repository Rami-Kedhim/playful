
export interface ModelParameters {
  temperature: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stopSequences: string[];
  modelName: string;
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
  // Added missing properties from errors
  learningRate?: number;
  batchSize?: number;
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  status: string;
  performance: {
    accuracy: number;
    latency: number;
  };
}

export interface TrainingProgress {
  id: string;
  modelId: string;
  status: string;
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  progress: number;
  accuracy: number;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
  timeRemaining: number;
  message: string;
  error?: string;
  type: string;
}

export interface NeuralService {
  moduleId: string;
  name: string;
  moduleType: string;
  config: {
    enabled: boolean;
    priority?: number;
  };
  getMetrics(): any;
  updateConfig(config: any): void;
}

export type RequestType = 'analysis' | 'generation' | 'moderation' | 'transformation';

export interface BrainHubRequest {
  type: RequestType;
  data?: any;
}

export interface BrainHubResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  requestsPerMinute: number;
  errorRate: number;
  lastUpdated: number;
  systemLoad?: number;
  userEngagement?: number;
}

export interface INeuralHub {
  initialize(): void;
  updateModelParameters(parameters: Partial<ModelParameters>): void;
  getModelParameters(): ModelParameters;
  processRequest(request: BrainHubRequest): Promise<BrainHubResponse>;
  
  // Add missing methods that are used in the codebase
  getHealthMetrics(): SystemHealthMetrics;
  getActiveTrainingJobs(): TrainingProgress[];
  getModels(): NeuralModel[];
  stopTraining(jobId: string): Promise<boolean>;
  startTraining(type: string, options: any): Promise<TrainingProgress>;
  getService(serviceId: string): NeuralService | undefined;
  getSystemStatus(): any;
}
