
// Define the interfaces for neural analytics reports

export interface NeuralAnalyticsReport {
  timestamp: string; // Add this missing property
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
}

export interface PerformanceTrend {
  date: string;
  metrics: { // Add this missing property
    expectedLoad: number;
    predictedResponseTime: number;
    predictedErrorRate: number;
    confidenceScore: number;
  };
}
