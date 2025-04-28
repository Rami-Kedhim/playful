
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
  
  // Model performance metrics with map as an array, not callable
  modelPerformance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number;
    throughput: number;
    // Changed to Array instead of function signature
    mapData: Array<{
      key: string;
      value: number;
    }>;
  };
  
  // Operational metrics with change indicators
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
    totalOperations: number;
    operationsChange: number;
    averageAccuracy: number;
    accuracyChange: number;
    responseTimeChange: number;
    errorRateChange: number;
  };
  
  // Usage metrics
  usageMetrics: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    totalUsers: number;
    sessionsPerUser: number;
    averageSessionDuration: number;
    retentionRate: number;
    serviceTypeDistribution: Array<{
      name: string;
      value: number;
    }>;
    resourceAllocation: Array<{
      name: string;
      value: number;
    }>;
    dailyUsageTrend: Array<{
      date: string;
      value: number;
    }>;
  };
  
  // Advanced metrics with map as an array, not callable
  advancedMetrics: {
    resourceUtilization: number;
    efficientUseScore: number;
    loadBalancingEfficiency: number;
    cachingEffectiveness: number;
    algorithmicEfficiency: number;
    mapData: Array<{
      key: string;
      value: number;
    }>;
  };
  
  // Correlation matrix with metrics for display
  correlationMatrix: {
    labels: string[];
    values: number[][];
    maxCorrelation: number;
    minCorrelation: number;
    averageCorrelation: number;
    metricsList: Array<{
      name: string;
      value: number;
    }>;
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
