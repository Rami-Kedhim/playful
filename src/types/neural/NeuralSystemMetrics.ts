
export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source?: string;
}

export interface SystemPerformance {
  processingEfficiency: number;
  accuracyRate: number;
  processingTrend: 'up' | 'down' | 'stable';
  accuracyTrend: 'up' | 'down' | 'stable';
  history: number[];
  recommendations: string[];
}

export interface SystemHealthMetrics {
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
  errorRate: number;
  // Add missing properties
  cpuUtilization?: number;
  memoryUtilization?: number;
  networkLatency?: number;
  errorFrequency?: number;
  userSatisfactionScore?: number;
  responseTime?: number;
  algorithmEfficiency?: number;
  dataPrecision?: number;
  systemUptime?: number;
  lastMaintenanceDate?: Date;
  load?: number;
  userEngagement?: number;
  lastUpdated?: number;
}

export interface TrainingProgress {
  id: string;
  modelId: string;
  progress: number;
  status: 'training' | 'paused' | 'completed' | 'failed';
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
  type: string;
}

export interface NeuralSystemMetricsResult {
  logs: SystemLog[];
  performance: SystemPerformance;
  refreshMetrics: () => void;
  errorMessage: string | null;
  isLoading: boolean;
  isMonitoring?: boolean;
  startMonitoring?: () => void;
  stopMonitoring?: () => void;
  // Add compatibility with useNeuralSystemMetrics hook
  metrics?: SystemHealthMetrics;
  status?: 'optimal' | 'good' | 'warning' | 'critical';
  recommendations?: string[];
  lastUpdated?: Date;
  hasAnomalies?: boolean;
  anomalies?: {
    metric: string;
    value: number;
    expected: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'training' | 'error';
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage: number;
  };
  specialization?: string[]; // Added for NeuralService.getSuitableModels
  createdAt: Date;
  updatedAt: Date;
}

export interface UberCoreService {
  getStatus: () => Promise<any>;
  configure: (config: any) => Promise<any>;
  processUserInput: (userId: string, input: string, options?: any) => Promise<any>;
}
