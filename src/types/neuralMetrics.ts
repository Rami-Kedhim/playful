
import { NeuralSystemMetrics } from './neural/NeuralSystemMetrics';

export interface ServiceMetrics {
  operationsCount: number;
  errorCount: number;
  latency: number;
  responseTime: number;
  errorRate: number;
  successRate: number;
  processingSpeed: number;
  accuracy: number;
  uptime: number;
  requestsProcessed: number;
  errors: number;
  [key: string]: any;
}

export interface ServiceStatus {
  status: string;
  metrics: ServiceMetrics;
}

export interface PerformanceReport {
  timestamp: Date;
  overallHealth: string;
  services: Record<string, ServiceStatus>;
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    operationsPerSecond?: number;
    errorRate: number;
  };
  recommendations: string[];
}

export interface HealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
  operationsPerSecond?: number;
  errorRate: number;
  [key: string]: any;
}

// Add NeuralModelParameters interface used by NeuralSystemControls.tsx
export interface NeuralModelParameters {
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
  bifurcationPoint: number;
  attractorStrength: number;
  learningRate: number;
  batchSize: number;
  temperature: number;
}
