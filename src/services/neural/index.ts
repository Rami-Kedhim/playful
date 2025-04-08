
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
  validateModelParameters 
} from './models/modelParameters';

export { 
  simulateMetricsUpdate, 
  generateSimulatedResponse 
} from './utils/neuralHubUtils';
