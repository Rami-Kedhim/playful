
/**
 * BaseNeuralService - Abstract base for all neural service implementations 
 * providing standard interface for Brain Hub integration
 */
export interface BaseNeuralService {
  moduleId: string;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  configure(config: any): void;
}

/**
 * Neural Model interface representing a model in the Neural Hub system
 */
export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'training' | 'error';
  performance: {
    accuracy: number;
    latency: number; // in milliseconds
    resourceUsage: number; // 0-1 scale
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Neural Model parameters for configuration
 */
export interface ModelParameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  optimizerType: string;
  dropout: number;
  activationFunction: string;
  embeddingSize: number;
  hiddenLayers: number[];
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
  bifurcationPoint: number;
  attractorStrength: number;
}

/**
 * System health metrics for monitoring
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
}

/**
 * Training progress tracking
 */
export interface TrainingProgress {
  modelId: string;
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  currentAccuracy: number;
  validationAccuracy: number;
  estimatedTimeRemaining: number; // seconds
  status: 'starting' | 'training' | 'validating' | 'completed' | 'failed';
}
