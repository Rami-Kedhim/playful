
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
  status: 'training' | 'paused' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  type: string;
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
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
  systemLoad?: number;
  memoryAllocation?: number;
  networkThroughput?: number;
  requestRate?: number;
  averageResponseTime?: number;
}
