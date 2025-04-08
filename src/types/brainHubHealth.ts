
import { SystemHealthMetrics } from '@/services/neural';

export type BrainHubHealthStatus = 'good' | 'warning' | 'error';

export interface BrainHubHealth {
  status: BrainHubHealthStatus;
  message?: string;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    requestsPerMinute: number;
    lastOptimized: number;
    neuralMetrics?: SystemHealthMetrics;
  };
  warnings: string[];
  errors: string[];
}

export interface BrainHubAnalytics {
  dailyOperations: number;
  averageResponseTime: number;
  errorRate: number;
  utilizationTrend: {
    timestamp: string;
    value: number;
  }[];
  recommendations: string[];
}
