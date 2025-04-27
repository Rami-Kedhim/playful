
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
    // Add map property that component is trying to access
    map?: Array<{
      key: string;
      value: number;
    }>;
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
    // Add missing properties used by NeuralAnalyticsPanel
    totalOperations: number;
    operationsChange: number;
    averageAccuracy: number;
    accuracyChange: number;
    responseTimeChange: number;
    errorRateChange: number;
  };
  
  usageMetrics: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    totalUsers: number;
    sessionsPerUser: number;
    averageSessionDuration: number;
    retentionRate: number;
    // Add missing properties used by NeuralAnalyticsPanel
    serviceTypeDistribution: {
      name: string;
      value: number;
    }[];
    resourceAllocation: {
      name: string;
      value: number;
    }[];
    dailyUsageTrend: {
      date: string;
      value: number;
    }[];
  };
  
  advancedMetrics: {
    resourceUtilization: number;
    efficientUseScore: number;
    loadBalancingEfficiency: number;
    cachingEffectiveness: number;
    algorithmicEfficiency: number;
    // Add map property that component is trying to access
    map?: Array<{
      key: string;
      value: number;
    }>;
  };
  
  correlationMatrix: {
    labels: string[];
    values: number[][];
    maxCorrelation: number;
    minCorrelation: number;
    averageCorrelation: number;
    // Add metrics property used in NeuralAnalyticsPanel
    metrics?: {
      name: string;
      value: number;
    }[];
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
