
export interface UberCoreStatus {
  isRunning: boolean;
  version: string;
  uptime: number;
  memoryUsage: number;
  processorLoad: number;
}

export interface UberCoreService {
  getStatus(): Promise<UberCoreStatus>;
  configure(config: Record<string, any>): Promise<boolean>;
  processUserInput(input: string): Promise<string>;
  // Add other methods needed by the components
}

export interface NeuralSystemMetricsResult {
  metrics: {
    processing: {
      current: number;
      historical: number[];
      processingEfficiency: number;
      processingTrend: 'up' | 'down' | 'stable';
    };
    accuracy: {
      current: number;
      historical: number[];
      accuracyRate: number;
      accuracyTrend: 'up' | 'down' | 'stable';
    };
    recommendations: string[];
    history: any[];
  };
  systemHealth: SystemHealthMetrics;
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
}

export interface OxumLearningService {
  initialize(config?: any): Promise<boolean>;
  processInput(input: string): Promise<string>;
  getLearnedPatterns(): Promise<any[]>;
}

export interface SystemLog {
  message: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
}
