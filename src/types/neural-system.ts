
export interface NeuralSystemMetricsResult {
  logs: any[];
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    responseTime: number;
    accuracy: number;
    latency: number;
  };
  refreshMetrics: () => Promise<void>;
  errorMessage: string | null;
  isLoading: boolean;
}

export interface TrainingProgress {
  id: string;
  modelId: string;
  progress: number;
  status: 'training' | 'paused' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  type: string;
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
  createdAt: Date;
  updatedAt: Date;
}
