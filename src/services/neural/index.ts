
/**
 * Neural system exports
 */
 
// Main hub and services
export { neuralHub } from './HermesOxumNeuralHub';
export { brainHub } from './HermesOxumBrainHub';

// Neural Service Registry and base implementations
export { 
  neuralServiceRegistry,
  type NeuralService,
  type NeuralServiceConfig,
  type ModuleType
} from './registry/NeuralServiceRegistry';

export { BaseNeuralService } from './modules/BaseNeuralService';

// Module-specific neural services
export { 
  aiCompanionNeuralService, 
  AICompanionNeuralService 
} from './modules/AICompanionNeuralService';

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
