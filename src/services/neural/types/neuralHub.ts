
/**
 * Neural Hub Types
 */

// System health metrics to monitor neural system performance
export interface SystemHealthMetrics {
  load: number;                 // 0-1 value indicating CPU load
  memoryUtilization: number;    // 0-1 value representing memory usage
  operationsPerSecond: number;  // Number of operations processed per second
  responseTime: number;         // Average response time in milliseconds
  errorRate: number;            // Rate of failures, 0-1 value
  stability: number;            // Overall system stability score, 0-1 value
  userEngagement?: number;      // Optional metric for user interaction, 0-1 value
  economicBalance?: number;     // Optional metric for economic balance, 0-1 value
  lastUpdated: Date;            // When metrics were last updated
}

// Neural model parameters for configuration
export interface ModelParameters {
  learningRate: number;         // Learning rate for model training
  batchSize: number;            // Batch size for processing
  epochs: number;               // Number of training epochs
  optimizerType: string;        // Type of optimizer used
  dropout: number;              // Dropout rate for regularization
  activationFunction: string;   // Activation function used
  embeddingSize?: number;       // Optional embedding size
  hiddenLayers?: number[];      // Optional array of hidden layer sizes
}

// Neural model performance metrics
export interface ModelPerformance {
  accuracy: number;             // Accuracy measure, 0-1
  precision: number;            // Precision measure, 0-1
  recall: number;               // Recall measure, 0-1
  f1Score: number;              // F1 score, 0-1
  latency: number;              // Response time in milliseconds
  throughput: number;           // Items processed per second
  lastEvaluated?: Date;         // When was the model last evaluated
}

// Neural model definition
export interface NeuralModel {
  id: string;                   // Unique ID for the model
  name: string;                 // Display name
  version: string;              // Version string
  description: string;          // Description of the model's purpose
  capabilities: string[];       // List of capabilities of this model
  parameters: ModelParameters;  // Model parameters
  performance: ModelPerformance;// Performance metrics
  status: 'active' | 'inactive' | 'training' | 'error'; // Current status
  created: Date;                // Creation date
  updated: Date;                // Last updated
  size?: number;                // Optional size in MB
  dependencies?: string[];      // Optional list of dependency models
}

// Training progress tracking
export interface TrainingProgress {
  modelId: string;              // ID of the model being trained
  startTime: Date;              // When training started
  currentEpoch: number;         // Current epoch
  totalEpochs: number;          // Total epochs to train
  accuracy: number;             // Current training accuracy
  loss: number;                 // Current loss value
  estimatedCompletionTime?: Date;  // Estimated completion time
  status: 'running' | 'paused' | 'completed' | 'failed';  // Training status
}

// Inference request
export interface InferenceRequest {
  modelId: string;              // Model ID to use for inference
  inputs: any;                  // Input data (format depends on model)
  options?: {                   // Optional parameters
    maxTokens?: number;         // Maximum output tokens
    temperature?: number;       // Randomness parameter
    topP?: number;              // Top-p sampling parameter
  }
}

// Inference response
export interface InferenceResponse {
  modelId: string;              // Model ID used for inference
  outputs: any;                 // Output data
  metrics?: {                   // Optional performance metrics
    latency: number;            // Processing time
    tokenCount?: number;        // Number of tokens processed
  }
}
