
/**
 * Neural system exports
 */
 
// Main hub and services
export { neuralHub } from './HermesOxumNeuralHub';
export { brainHub, type BrainHubConfig, type PsychologyModel, type PhysicsModel, type EconomicsModel, type RoboticsModel } from './HermesOxumBrainHub';

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

export {
  escortsNeuralService,
  EscortsNeuralService
} from './modules/EscortsNeuralService';

export {
  creatorsNeuralService,
  CreatorsNeuralService
} from './modules/CreatorsNeuralService';

export {
  livecamsNeuralService,
  LivecamsNeuralService
} from './modules/LivecamsNeuralService';

// Types
export type { 
  SystemHealthMetrics, 
  ModelParameters,
  NeuralModel,
  TrainingProgress 
} from './types/neuralHub';

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
