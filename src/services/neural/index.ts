
/**
 * Neural system exports
 */
 
// Main hub and services
export { neuralHub } from './HermesOxumNeuralHub';
export { brainHub, type BrainHubConfig } from './HermesOxumBrainHub';
export { 
  brainHubAutoDevOpsManager, 
  type MissingComponentAnalysis, 
  type CodeGenerationResult, 
  type DeploymentResult 
} from './BrainHubAutoDevOpsManager';

// Neural Service Registry and base implementations
export { 
  neuralServiceRegistry,
  type NeuralService,
  type ModuleType
} from './registry/NeuralServiceRegistry';

export { BaseNeuralService, type NeuralServiceConfig } from './modules/BaseNeuralService';

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

// Export model types from types/brainHub.ts
export type { 
  PsychologyModel,
  PhysicsModel,
  EconomicsModel,
  RoboticsModel
} from '@/types/brainHub';

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
