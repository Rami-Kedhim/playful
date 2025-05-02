
export interface HealthMetrics {
  // Core metrics that are used across the system
  cpuUtilization: number;
  memoryUtilization: number;
  errorRate: number;
  responseTime: number;
  operationsPerSecond: number;
  stability: number;
  lastUpdated: number;
  systemLoad: number;
  userEngagement: number;
  requestsPerMinute: number;
  
  // Additional metrics used by different services
  cpuUsage: number;
  memoryUsage: number;
  neuralAccuracy: number;
  neuralEfficiency: number;
  neuralLatency: number;
  
  // Required fields that were missing but used in some services
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
}

export interface PerformanceReport {
  timestamp: Date;
  overallHealth: number;
  services: Record<string, {
    status: string;
    metrics: ServiceMetrics;
  }>;
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    operationsPerSecond: number;
    errorRate: number;
  };
  recommendations: string[];
}

export interface ServiceMetrics {
  operationsCount: number;
  errorCount: number;
  latency: number;
  responseTime?: number;  // Optional since some implementations use latency instead
  successRate?: number;
  errorRate?: number;
  [key: string]: any;  // Allow additional properties
}

// Extended ModelParameters interface to include neural system controls
export interface NeuralModelParameters {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  modelName: string;
  processingPower?: number;
  responsiveness?: number;
  errorTolerance?: number;
  adaptiveMode?: boolean;
  autonomousMode?: boolean;
  precisionFactor?: number;
  maxOperations?: number;
  stopSequences?: string[];
}
