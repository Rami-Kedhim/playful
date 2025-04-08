
// Define neural hub types

export interface SystemHealthMetrics {
  load: number;
  memoryUtilization: number;
  operationsPerSecond: number;
  responseTime: number;
  errorRate: number;
  stability: number;
  userEngagement: number;
  economicBalance: number;
  lastUpdated: Date;
}

export interface ModelParameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  optimizerType: string;
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
}

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
    throughput?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
    lastEvaluation?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingProgress {
  modelId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'preparing' | 'training' | 'evaluating';
  progress: number; // 0-100
  accuracy: number;
  startTime: Date;
  estimatedCompletionTime?: Date;
  error?: string;
  message?: string;
  trainingConfig?: any;
}
