
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

export interface SystemHealthMetrics {
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
}

export interface NeuralSystemMetricsResult {
  metrics: SystemHealthMetrics;
  status: 'operational' | 'degraded' | 'error';
  timestamp: Date;
  logs: any[];
  performance: any;
  refreshMetrics: () => void;
  errorMessage: string | null;
  isLoading: boolean;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

// Updated TrainingProgress with epoch and timeRemaining
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
  startTime?: Date;
  currentEpoch?: number;
  totalEpochs?: number;
  targetAccuracy?: number;
  estimatedCompletionTime?: Date;
}
