export interface TrainingProgress {
  id: string;
  modelId: string;
  progress: number;
  status: string;
  startTime: Date;
  currentEpoch: number;
  totalEpochs: number;
  epoch: number;
  loss: number;
  accuracy: number;
  timeRemaining: number;
  type: string;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
  message?: string;
  error?: string;
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  specialization: string;
  size: number;
  precision: number;
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage: number;
  };
  capabilities: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModelParameters {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stopSequences: string[];
  modelName: string;
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
  bifurcationPoint?: number;
  attractorStrength?: number;
  learningRate?: number;
  batchSize?: number;
}

export interface NeuralHubInterface {
  getActiveTrainingJobs(): any[];
  stopTraining(jobId: string): Promise<boolean>;
  startTraining(type: string): Promise<{ jobId: string; status: string }>;
  getModels(): any[];
  updateModelParameters(parameters: ModelParameters): void;
}
