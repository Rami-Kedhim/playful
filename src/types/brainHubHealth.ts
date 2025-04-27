
export interface BrainHubHealth {
  status: 'online' | 'offline' | 'degraded' | 'maintenance' | 'healthy' | 'warning' | 'error' | 'unknown';
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    requestsPerMinute: number;
    lastOptimized: number;
    neuralMetrics?: {
      accuracy: number;
      efficiency: number;
      latency: number;
    };
  };
  message?: string;
  warnings?: string[];
  errors?: string[];
}

export interface BrainHubAnalytics {
  dailyOperations: number;
  averageResponseTime: number;
  errorRate: number;
  utilizationTrend: {
    timestamp: number;
    cpuUsage: number;
    memoryUsage: number;
    operations: number;
  }[];
  recommendations: string[];
}
