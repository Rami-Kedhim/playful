
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
  specialization?: string[];
  type?: string; // Added missing type property
}

export interface NeuralSystemMetricsResult {
  metrics: SystemHealthMetrics;
  status: 'optimal' | 'good' | 'warning' | 'critical';
  recommendations: string[];
  lastUpdated: Date;
  hasAnomalies: boolean;
  anomalies?: {
    metric: string;
    value: number;
    expected: number;
    severity: 'low' | 'medium' | 'high';
  }[];
  // Add missing properties used in components
  logs: Array<{
    timestamp: string;
    level: 'info' | 'warning' | 'error';
    message: string;
  }>;
  performance: {
    processingEfficiency: number;
    processingTrend: 'up' | 'down';
    accuracyRate: number;
    accuracyTrend: 'up' | 'down';
    history: number[];
    recommendations: string[];
  };
  errorMessage: string | null;
  isLoading: boolean;
  refreshMetrics: () => void;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
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
  systemLoad: number; // Added missing metrics
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
  userSatisfactionScore?: number;
  dataPrecision?: number;
  algorithmEfficiency?: number;
  systemUptime?: number;
  lastMaintenanceDate?: Date;
}

// Add TrainingProgress interface used in NeuralSystemsPanel
export interface TrainingProgress {
  id: string;
  modelId: string;
  progress: number;
  status: 'training' | 'paused' | 'completed' | 'failed';
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  type: string;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
}
