
// Define the interfaces for neural analytics reports

export interface NeuralAnalyticsReport {
  timestamp: string;
  serviceMetrics: Array<{
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive' | 'maintenance';
    metrics: Record<string, any>;
    enabled: boolean;
    lastActivity: string;
  }>;
  systemMetrics: {
    cpuUtilization: number;
    memoryUtilization: number;
    requestsPerSecond: number;
    responseTimeMs: number;
    errorRate: number;
  };
  anomalies: Array<{
    id?: string;
    type?: string;
    severity?: 'low' | 'medium' | 'high';
    description?: string;
    timestamp?: string;
    relatedComponentId?: string;
  }>;
  trends: {
    requestVolume: string;
    errorRate: string;
    responseTime: string;
  };
  recommendations: string[];
  
  // Add missing properties needed by NeuralAnalyticsPanel
  modelPerformance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number;
    throughput: number;
  };
  
  operationalMetrics: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    requestsPerMinute: number;
    errorRate: number;
    activeConnections: number;
  };
  
  usageMetrics: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    totalUsers: number;
    sessionsPerUser: number;
    averageSessionDuration: number;
    retentionRate: number;
  };
  
  advancedMetrics: {
    resourceUtilization: number;
    efficientUseScore: number;
    loadBalancingEfficiency: number;
    cachingEffectiveness: number;
    algorithmicEfficiency: number;
  };
  
  correlationMatrix: {
    labels: string[];
    values: number[][];
    maxCorrelation: number;
    minCorrelation: number;
    averageCorrelation: number;
  };
}

export interface PerformanceTrend {
  date: string;
  metrics: {
    expectedLoad: number;
    predictedResponseTime: number;
    predictedErrorRate: number;
    confidenceScore: number;
  };
}
