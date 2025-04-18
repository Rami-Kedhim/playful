
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
}

export interface NeuralSystemMetricsResult {
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
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
}
