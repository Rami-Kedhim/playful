
// Re-export all neural services
import { BaseNeuralService } from './modules/BaseNeuralService';
import { AICompanionNeuralService, aiCompanionNeuralService } from './modules/AICompanionNeuralService';
import { CreatorsNeuralService, creatorsNeuralService } from './modules/CreatorsNeuralService';
import { EscortsNeuralService, escortsNeuralService } from './modules/EscortsNeuralService';
import { LivecamsNeuralService, livecamsNeuralService } from './modules/LivecamsNeuralService';
import { neuralServiceRegistry } from './registry/NeuralServiceRegistry';
import { UberCore } from './UberCore';

// Create and export singleton instance of UberCore
export const uberCore = new UberCore();

// Export services
export {
  BaseNeuralService,
  AICompanionNeuralService,
  aiCompanionNeuralService,
  CreatorsNeuralService,
  creatorsNeuralService,
  EscortsNeuralService,
  escortsNeuralService,
  LivecamsNeuralService,
  livecamsNeuralService,
  neuralServiceRegistry
};

// Export types
export type { 
  NeuralService, 
  NeuralServiceConfig 
} from './interfaces/NeuralService';

export type {
  ModuleType
} from './registry/NeuralServiceRegistry';
