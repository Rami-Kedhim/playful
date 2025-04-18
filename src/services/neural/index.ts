
// Export all neural services and types from a centralized location
import { neuralHub } from './HermesOxumNeuralHub';
import { neuralService } from './NeuralService';
import { escortsNeuralService, EscortsNeuralService } from './modules/EscortsNeuralService';
import { creatorsNeuralService, CreatorsNeuralService } from './modules/CreatorsNeuralService';
import { livecamsNeuralService, LivecamsNeuralService } from './modules/LivecamsNeuralService';
import { aiCompanionNeuralService, AICompanionNeuralService } from './modules/AICompanionNeuralService';
import { NeuralService, BaseNeuralService, NeuralServiceConfig } from './types/NeuralService';
import { uberCore } from './UberCore';

// Neural service registry
import { neuralServiceRegistry } from './registry/NeuralServiceRegistry';

// Re-export all for easy access
export {
  // Core services
  neuralHub,
  neuralService,
  uberCore,
  
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
  
  // Types
  NeuralService,
  BaseNeuralService,
  NeuralServiceConfig
};
