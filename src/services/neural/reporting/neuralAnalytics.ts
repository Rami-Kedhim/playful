
import { SystemHealthMetrics } from '@/types/ubercore';

export interface NeuralAnalyticsResult {
  modelPerformance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    auc: number;
    inferenceTime: number;
  };
  systemMetrics: {
    responseTimeMs: number;
    errorRate: number;
    qps: number;
    cpuUsage: number;
    memoryUsage: number;
    gpuUsage?: number;
  };
  operationalMetrics: {
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
    responseTimeChange: number;
    errorRateChange: number;
    accuracyChange: number;
    operationsChange: number;
  };
  performanceForecast: Array<{
    date: string;
    metrics: {
      predictedResponseTime: number;
      predictedErrorRate: number;
      expectedLoad: number;
    };
  }>;
}

export function generateMockNeuralAnalytics(): NeuralAnalyticsResult {
  return {
    modelPerformance: {
      accuracy: 0.97,
      precision: 0.95,
      recall: 0.94,
      f1Score: 0.945,
      auc: 0.98,
      inferenceTime: 120,
    },
    systemMetrics: {
      responseTimeMs: 145,
      errorRate: 0.02,
      qps: 240,
      cpuUsage: 65,
      memoryUsage: 82,
      gpuUsage: 72,
    },
    operationalMetrics: {
      totalOperations: 15420,
      successfulOperations: 15112,
      failedOperations: 308,
      responseTimeChange: -5.2, // Improved by 5.2%
      errorRateChange: -0.5,    // Improved by 0.5%
      accuracyChange: 0.8,      // Improved by 0.8%
      operationsChange: 12.4,   // Increased by 12.4%
    },
    performanceForecast: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        metrics: {
          predictedResponseTime: 145 - (i * 2),
          predictedErrorRate: Math.max(0.01, 0.02 - (i * 0.002)),
          expectedLoad: 240 + (i * 20),
        }
      };
    }),
  };
}

// Generate detailed metrics for performance monitoring
export function generateDetailedPerformanceMetrics(): {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  requestsPerMinute: number;
  errorRate: number;
  successRate: number;
  processingEfficiency: number;
  resourceUtilization: number;
  operationalStatus: string;
  lastUpdated: string;
  responseTimeChange: number;
  errorRateChange: number;
  accuracyChange: number;
} {
  return {
    totalRequests: 45820,
    successfulRequests: 44903,
    failedRequests: 917,
    averageResponseTime: 145.3,
    p95ResponseTime: 230.5,
    p99ResponseTime: 312.8,
    requestsPerMinute: 267.4,
    errorRate: 2.0,
    successRate: 98.0,
    processingEfficiency: 92.3,
    resourceUtilization: 68.5,
    operationalStatus: 'Optimal',
    lastUpdated: new Date().toISOString(),
    responseTimeChange: -5.2, // Changed from string to number
    errorRateChange: -0.5,    // Changed from string to number
    accuracyChange: 0.8       // Changed from string to number
  };
}
