
export interface NeuralSystemPerformance {
  accuracy: number;
  latency: number;
  throughput?: number;
  errorRate?: number;
  confidence?: number;
}

export interface NeuralModelTraining {
  epochs: number;
  batchSize: number;
  learningRate: number;
  validationAccuracy: number;
  trainLoss: number;
  validationLoss: number;
  datasetSize: number;
  completedEpochs?: number;
  timeElapsed?: number;
}

export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  specialization: string | string[];
  type: string;
  capabilities: string[];
  size: number;
  precision: number;
  parameters?: Record<string, any>;
  performance?: NeuralSystemPerformance;
  training?: NeuralModelTraining;
  status?: 'active' | 'training' | 'offline' | 'error';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NeuralSystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage?: number;
  activeConnections: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
  uptime: number;
  lastUpdated: Date;
}

export interface NeuralServiceStatus {
  isOnline: boolean;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  activeModels: number;
  pendingRequests: number;
  warnings: string[];
  errors: string[];
  latestHeartbeat: Date;
}

export interface NeuralSystemTimeSeries {
  timestamp: Date;
  cpuUsage: number;
  memoryUsage: number;
  requestCount: number;
  errorCount: number;
  avgResponseTime: number;
}
