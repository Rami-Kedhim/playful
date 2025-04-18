

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
  };
  // Add these fields needed by NeuralSystemsPanel
  type?: string;
  status?: 'active' | 'inactive' | 'training' | 'error';
  capabilities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  resourceUsage?: number;
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

// Add TrainingProgress type needed by NeuralSystemsPanel
export interface TrainingProgress {
  modelId: string;
  progress: number;
  epoch: number;
  accuracy: number;
  loss: number;
  timeRemaining: number;
}
