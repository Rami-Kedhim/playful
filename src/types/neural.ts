
export interface SystemHealthMetrics {
  cpuUtilization: number;
  memoryUtilization: number;
  networkLatency: number;
  errorFrequency: number;
  userSatisfactionScore: number;
  responseTime: number;
  algorithmEfficiency: number;
  dataPrecision: number;
  systemUptime: number;
  lastMaintenanceDate: Date;
  // We'll tolerate partial metrics for some functions
  load?: number;
  userEngagement?: number;
  lastUpdated?: number;
}

export interface NeuralModelParameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  optimizerType: string;
  activationFunction: string;
  networkDepth: number;
  networkWidth: number;
  dropoutRate: number;
  hilbertSpaceDimension?: number; // For Hilbert space modeling
}

export interface TrainingJob {
  id: string;
  progress: number;
  type: string;
  startTime: Date;
  estimatedCompletionTime: Date;
  metrics?: {
    accuracy?: number;
    loss?: number;
    validationScore?: number;
  };
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  lastUpdated?: Date;
  performanceMetrics?: {
    accuracy: number;
    recall: number;
    precision: number;
  };
}
