
/**
 * Neural system exports
 */
 
// Main hub and services
export { neuralHub } from './HermesOxumNeuralHub';
export { brainHub } from './HermesOxumBrainHub';
export type { BrainHubConfig } from './HermesOxumBrainHub';
export { 
  brainHubAutoDevOpsManager
} from './BrainHubAutoDevOpsManager';
export type { 
  MissingComponentAnalysis, 
  CodeGenerationResult, 
  DeploymentResult 
} from './BrainHubAutoDevOpsManager';

// Neural Service Registry and base implementations
export { 
  neuralServiceRegistry
} from './registry/NeuralServiceRegistry';
export type { 
  NeuralService,
  ModuleType
} from './registry/NeuralServiceRegistry';

export { BaseNeuralService } from './modules/BaseNeuralService';
export type { NeuralServiceConfig } from './modules/BaseNeuralService';

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

export {
  oxumLearningService,
  OxumLearningService
} from './modules/OxumLearningService';

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
  neuralMetrics
} from './reporting/neuralMetrics';
export type { PerformanceReport } from './reporting/neuralMetrics';

// Training management
export { TrainingManager } from './training/trainingManager';
