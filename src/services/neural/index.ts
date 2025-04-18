
// Export all neural services and types from a centralized location
import { neuralHub } from './HermesOxumNeuralHub';
import { neuralService } from './NeuralService';
import { EscortsNeuralService, escortsNeuralService } from './modules/EscortsNeuralService';
import { CreatorsNeuralService, creatorsNeuralService } from './modules/CreatorsNeuralService';
import { LivecamsNeuralService, livecamsNeuralService } from './modules/LivecamsNeuralService';
import { AICompanionNeuralService, aiCompanionNeuralService } from './modules/AICompanionNeuralService';
import { NeuralService, BaseNeuralService } from './types/NeuralService';
import { NeuralServiceConfig } from './types/neuralConfig';

// Neural service registry
import { neuralServiceRegistry } from './registry/NeuralServiceRegistry';

// Re-export all for easy access
export {
  // Core services
  neuralHub,
  neuralService,
  
  // Module services
  escortsNeuralService,
  EscortsNeuralService,
  creatorsNeuralService,
  CreatorsNeuralService,
  livecamsNeuralService,
  LivecamsNeuralService,
  aiCompanionNeuralService,
  AICompanionNeuralService,
  
  // Registry
  neuralServiceRegistry,
};

// Types need to use export type for isolatedModules
export type { NeuralService, BaseNeuralService };
export type { NeuralServiceConfig };
