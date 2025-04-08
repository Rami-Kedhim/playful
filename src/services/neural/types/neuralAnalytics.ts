
export interface PerformanceTrend {
  date: string;
  operations: number;
  accuracy: number;
  efficiency: number;
}

export interface ModelPerformanceMetrics {
  accuracy: number;
  latency: number;
  efficiency: number;
  usageRate: number;
  targetLatency: number;
}

export interface ModelPerformance {
  id: string;
  name: string;
  version: string;
  metrics: ModelPerformanceMetrics;
}

export interface DistributionItem {
  name: string;
  value: number;
}

export interface CorrelationMatrix {
  metrics: string[];
  values: number[][];
}

export interface AdvancedMetric {
  name: string;
  value: string | number;
  description: string;
}

export interface NeuralAnalyticsReport {
  operationalMetrics: {
    totalOperations: number;
    operationsChange: number;
    averageAccuracy: number;
    accuracyChange: number;
    averageResponseTime: number;
    responseTimeChange: number;
    errorRate: number;
    errorRateChange: number;
  };
  modelPerformance: ModelPerformance[];
  usageMetrics: {
    serviceTypeDistribution: DistributionItem[];
    resourceAllocation: DistributionItem[];
    dailyUsageTrend: {
      date: string;
      operations: number;
      activeModels: number;
    }[];
  };
  recommendations: string[];
  advancedMetrics: AdvancedMetric[];
  correlationMatrix: CorrelationMatrix;
}
