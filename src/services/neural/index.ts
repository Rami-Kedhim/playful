
/**
 * Neural system exports
 */
 
// Main hub and services
export { neuralHub } from './HermesOxumNeuralHub';
export { brainHub } from './HermesOxumBrainHub';

// Types
export type { 
  SystemHealthMetrics, 
  ModelParameters,
  NeuralModel,
  TrainingProgress 
} from './types/neuralHub';

export type { 
  BrainHubConfig, 
  PsychologyModel, 
  PhysicsModel, 
  EconomicsModel, 
  RoboticsModel 
} from './HermesOxumBrainHub';

// Utility functions
export { 
  calculateSystemEfficiency, 
  validateModelParameters,
  initializeDefaultParameters 
} from './models/modelParameters';

export { 
  simulateMetricsUpdate, 
  generateSimulatedResponse 
} from './utils/neuralHubUtils';

// Metrics and reporting
export { 
  neuralMetrics,
  type PerformanceReport
} from './reporting/neuralMetrics';

// Training management
export { TrainingManager } from './training/trainingManager';
