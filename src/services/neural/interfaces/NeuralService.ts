
export interface NeuralServiceConfig {
  consumerName?: string;
  priorityLevel?: 'low' | 'medium' | 'high';
  useCache?: boolean;
  [key: string]: any;
}

export interface NeuralServiceMetrics {
  load: number;
  userEngagement: number;
  lastUpdated: number;
  stability?: number;
  cpuUtilization?: number;
  memoryUtilization?: number;
  responseTime?: number;
}

export interface NeuralService {
  moduleName: string;
  version: string;
  description: string;
  
  // Core methods
  configure(config: NeuralServiceConfig): boolean;
  getMetrics(): NeuralServiceMetrics;
  isActive(): boolean;
  
  // Optional methods with default implementations
  start?(): void;
  stop?(): void;
  reset?(): void;
}
