
export interface NeuralSystemMetricsResult {
  logs: any[];
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    accuracy: number;
    latency: number;
    processingEfficiency?: number;
    processingTrend?: 'up' | 'down';
    accuracyRate?: number;
    accuracyTrend?: 'up' | 'down';
    history?: number[];
    recommendations?: string[];
  };
  refreshMetrics: () => Promise<void>;
  errorMessage: string | null;
  isLoading: boolean;
  isMonitoring?: boolean;
  startMonitoring?: () => void;
  stopMonitoring?: () => void;
}

export interface TrainingProgress {
  id: string;
  modelId: string;
  progress: number;
  epoch: number;
  status: 'training' | 'paused' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  type: string;
  timeRemaining: number;
  targetAccuracy?: number;
  estimatedCompletionTime?: Date;
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  specialization: string;
  size: number;
  precision: number;
  capabilities: string[];
  status: 'active' | 'inactive' | 'training' | 'error';
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage: number;
  };
  createdAt: Date;
  updatedAt: Date;
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
