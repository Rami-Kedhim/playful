
/**
 * Neural Hub Types
 */

export interface SystemHealthMetrics {
  load: number; // Current system load (0-1)
  memoryUtilization: number; // Memory usage (0-1)
  operationsPerSecond: number; // Operations processed per second
  responseTime: number; // Average response time in ms
  errorRate: number; // Error rate (0-1)
  stability: number; // System stability metric (0-1)
  userEngagement: number; // User engagement metric (0-1)
  economicBalance: number; // Economic balance metric (0-1)
  lastUpdated: Date; // Last metrics update timestamp
}

export interface ModelParameters {
  decayConstant: number; // Controls how quickly visibility decays
  growthFactor: number; // Multiplier for growth calculations
  cyclePeriod: number; // Number of hours in a cycle
  harmonicCount: number; // Number of harmonics to use in calculations
  bifurcationPoint: number; // Point at which behavior changes
  attractorStrength: number; // How strongly the attractor affects the system
}

export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'training' | 'error';
  capabilities: string[];
  specialization: string[];
  performance: {
    accuracy: number;
    latency: number;
    throughput: number;
  };
  lastUpdate: Date;
  trainingData?: string;
}

export interface TrainingProgress {
  modelId: string;
  progress: number; // 0-100
  status: 'preparing' | 'training' | 'evaluating' | 'completed' | 'failed';
  startTime: Date;
  expectedCompletionTime?: Date;
  accuracy: number;
  loss?: number;
  epoch?: number;
  message?: string;
}
