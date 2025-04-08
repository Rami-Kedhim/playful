
/**
 * Neural system exports
 */
 
// Main hub and services
export { neuralHub } from './HermesOxumNeuralHub';
export { neuralService } from './NeuralService';
export { neuralMetrics } from './reporting/neuralMetrics';

// Types
export type { 
  SystemHealthMetrics, 
  ModelParameters,
  NeuralModel,
  TrainingProgress 
} from './types/neuralHub';

export type { 
  MetricsHistory, 
  PerformanceReport 
} from './reporting/neuralMetrics';

// Utility functions
export { 
  calculateSystemEfficiency, 
  validateModelParameters 
} from './models/modelParameters';

export { 
  simulateMetricsUpdate, 
  generateSimulatedResponse 
} from './utils/neuralHubUtils';
