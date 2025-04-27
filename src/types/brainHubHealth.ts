
export interface BrainHubHealth {
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    requestsPerMinute: number;
    lastOptimized: number;
  };
  message?: string;
  warnings?: string[];
  errors?: string[];
}

export interface BrainHubAnalytics {
  dailyOperations: number;
  averageResponseTime: number;
  errorRate: number;
  utilizationTrend: number[];
  recommendations: string[];
}
