
/**
 * Type definitions for the Neural Hub system
 */

export interface SystemHealthMetrics {
  load: number; // 0-1
  memoryUtilization: number; // 0-1
  operationsPerSecond: number;
  responseTime: number; // milliseconds
  errorRate: number; // 0-1
  stability: number; // 0-1
  userEngagement: number; // 0-1
  economicBalance: number; // 0-1
  lastUpdated: Date;
}

export interface ModelParameters {
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
  bifurcationPoint: number;
  attractorStrength: number;
}

export interface NeuralModel {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'training' | 'inactive' | 'error';
  parameters: number; // millions
  specialization: string[];
  capabilities: string[];
  performance: {
    accuracy: number; // 0-1
    latency: number; // milliseconds
    throughput: number; // requests per second
  };
}

export interface TrainingProgress {
  modelId: string;
  epoch: number;
  totalEpochs: number;
  accuracy: number;
  loss: number;
  startedAt: Date;
  estimatedCompletion: Date;
  progress: number; // 0-1
}
