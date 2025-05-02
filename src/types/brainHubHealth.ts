
export interface BrainHubHealth {
  status: 'online' | 'offline' | 'degraded' | 'maintenance' | 'healthy' | 'warning' | 'error';
  message?: string;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    requestsPerMinute: number;
    lastOptimized: number;
    neuralMetrics?: {
      accuracy: number;
      efficiency: number;
      latency: number;
    }
  };
  warnings: string[];
  errors: string[];
}

export interface BrainHubAnalytics {
  dailyOperations: number;
  averageResponseTime: number;
  errorRate: number;
  utilizationTrend: Array<{
    timestamp: number;
    cpuUsage: number;
    memoryUsage: number;
    operations?: number;
  }>;
  recommendations: string[];
}
