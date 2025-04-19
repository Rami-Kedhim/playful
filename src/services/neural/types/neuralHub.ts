
export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  specialization: string;
  size: number;
  precision: number;
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage?: number;
  };
  type?: string;
  status?: 'active' | 'inactive' | 'training' | 'error';
  capabilities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HealthMetrics {
  modelCount: number;
  activeConnections: number;
  requestsPerMinute: number;
  averageResponseTime: number;
  errorRate: number;
  uptime: number;
  models: NeuralModel[];
  cpuUtilization: number;
  memoryUtilization: number;
  errorFrequency: number;
  systemUptime: number;
  networkLatency: number;
  responseTime: number;
  userSatisfactionScore: number;
  algorithmEfficiency?: number;
  dataPrecision?: number;
  lastMaintenanceDate?: Date;
  load?: number;
  userEngagement?: number;
  lastUpdated?: number;
  systemLoad?: number;
  memoryAllocation?: number;
  networkThroughput?: number;
  requestRate?: number;
}

export interface TrainingProgress {
  id: string;
  modelId: string;
  progress: number;
  epoch: number;
  accuracy: number;
  loss: number;
  timeRemaining: number;
  status: 'training' | 'paused' | 'completed' | 'failed';
  type?: string;
  startTime: Date;
  currentEpoch?: number;
  totalEpochs?: number;
  targetAccuracy?: number;
  estimatedCompletionTime?: Date;
  message?: string;
  error?: string;
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
