
export interface BrainHubHealth {
  status: 'healthy' | 'warning' | 'error' | 'offline' | 'degraded' | 'maintenance' | 'online' | 'unknown';
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
  utilizationTrend: Array<{
    timestamp: number;
    cpuUsage: number;
    memoryUsage: number;
    operations: number;
  }>;
  recommendations: string[];
}
