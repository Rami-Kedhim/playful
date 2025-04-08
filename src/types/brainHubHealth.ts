
export interface BrainHubHealth {
  status: 'healthy' | 'warning' | 'error' | 'unknown';
  message?: string;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    requestsPerMinute: number;
    lastOptimized: number;
  };
  warnings: string[];
  errors: string[];
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
