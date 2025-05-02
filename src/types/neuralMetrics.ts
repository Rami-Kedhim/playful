
export interface HealthMetrics {
  cpuUtilization: number;
  memoryUtilization: number;
  errorRate: number;
  responseTime: number;
  operationsPerSecond: number;
  stability: number;
  lastUpdated: number;
  systemLoad: number;
  userEngagement: number;
  requestsPerMinute: number;
  cpuUsage: number;
  memoryUsage: number;
  neuralAccuracy: number;
  neuralEfficiency: number;
  neuralLatency: number;
}

export interface PerformanceReport {
  timestamp: Date;
  overallHealth: number;
  services: Record<string, {
    status: string;
    metrics: any;
  }>;
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    operationsPerSecond: number;
    errorRate: number;
  };
  recommendations: string[];
}

export interface ServiceMetrics {
  operationsCount: number;
  errorRate: number;
  latency: number;
  successRate?: number;
  [key: string]: any;
}
