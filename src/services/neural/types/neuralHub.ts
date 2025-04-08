
/**
 * Neural model interface
 */
export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  specialization?: string[];
  status: 'active' | 'inactive' | 'training' | 'error';
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage: number;
    [key: string]: number;
  };
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

/**
 * Neural model parameters
 */
export interface ModelParameters {
  learningRate?: number;
  batchSize?: number;
  epochs?: number;
  optimizerType?: string;
  dropout?: number;
  activationFunction?: string;
  embeddingSize?: number;
  hiddenLayers?: number[];
  decayConstant?: number;
  growthFactor?: number;
  cyclePeriod?: number;
  harmonicCount?: number;
  bifurcationPoint?: number;
  attractorStrength?: number;
  [key: string]: any;
}

/**
 * System health metrics
 */
export interface SystemHealthMetrics {
  cpuUtilization: number;
  memoryUtilization: number;
  networkLatency: number;
  errorFrequency: number;
  uptime: number;
  load: number;
  operationsPerSecond: number;
  responseTime: number;
  errorRate: number;
  stability: number;
  userEngagement: number;
  economicBalance: number;
  lastUpdated: Date;
  [key: string]: any;
}

/**
 * Training progress interface
 */
export interface TrainingProgress {
  modelId: string;
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  currentAccuracy: number;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
  status: 'running' | 'completed' | 'failed' | 'stopped';
  // Adding missing properties that are used in NeuralSystemsPanel
  progress: number;
  accuracy: number;
  message?: string;
  error?: string;
}
