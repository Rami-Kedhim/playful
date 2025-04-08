
export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'training' | 'error';
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  specialization?: string[]; // Changed to string array
}

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

// Update TrainingProgress to include all required properties
export interface TrainingProgress {
  modelId: string;
  status: 'training' | 'starting' | 'validating' | 'completed' | 'failed' | 'running' | 'stopped';
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  progress: number;
  accuracy: number;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
  message?: string;
  error?: string;
}
