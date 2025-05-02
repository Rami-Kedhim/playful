
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
  learningRate: number;
  batchSize: number;
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

// Expanded RequestType to include all the types used in the codebase
export type RequestType = 
  // Core types
  | 'analysis' 
  | 'generation' 
  | 'moderation' 
  | 'transformation'
  // Component registration and sync types
  | 'register_component'
  | 'unregister_component'
  | 'sync_components'
  // AI capability types
  | 'register_capabilities'
  | 'record_interaction'
  // AI profile types
  | 'ai_profile_view'
  | 'ai_subscription'
  // AI messaging types
  | 'ai_welcome_message'
  | 'enhance_ai_message'
  | 'enhance_image_prompt'
  // Content types
  | 'content_optimization'
  | 'calculate_renewal_value'
  | 'predict_renewal_time'
  | 'record_content_interaction'
  // DevOps types
  | 'log_decision'
  | 'store_in_memory'
  // Allow for other string types for backward compatibility
  | string;

export interface BrainHubRequest {
  type: RequestType;
  data?: any;
  filters?: Record<string, any>;
  options?: Record<string, any>;
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
  
  // Make these return sync arrays instead of Promises
  getHealthMetrics(): SystemHealthMetrics;
  getActiveTrainingJobs(): TrainingProgress[];
  getModels(): NeuralModel[];
  stopTraining(jobId: string): Promise<boolean>;
  startTraining(type: string, options: any): Promise<TrainingProgress>;
  getService(serviceId: string): NeuralService | undefined;
  getSystemStatus(): any;
  
  // Add the missing methods to resolve the errors
  getConfig(): any;
  updateConfig(config: any): Promise<boolean>;
  getDecisionLogs(): any[];
}
