
// Export core services
import { neuralHub } from './HermesOxumNeuralHub';
import { neuralService } from './NeuralService';
import { escortsNeuralService } from './modules/EscortsNeuralService';
import { uberCore } from './UberCore';
import { neuralServiceRegistry } from './registry/NeuralServiceRegistry';

// Export service classes
import { EscortsNeuralService } from './modules/EscortsNeuralService';
import { CreatorsNeuralService } from './modules/CreatorsNeuralService';
import { LivecamsNeuralService } from './modules/LivecamsNeuralService';
import { AICompanionNeuralService } from './modules/AICompanionNeuralService';

// Export base types
import { BaseNeuralService, NeuralService, ModuleType } from './types/NeuralService';

// Export everything
export {
  // Service instances
  neuralHub,
  neuralService,
  escortsNeuralService,
  uberCore,
  neuralServiceRegistry,
  
  // Service classes
  EscortsNeuralService,
  CreatorsNeuralService,
  LivecamsNeuralService,
  AICompanionNeuralService,
  
  // Base types
  BaseNeuralService
};

// Export types
export type { NeuralService, ModuleType };

// Use export type for TypeScript interfaces when isolatedModules is enabled
export type { NeuralModel } from '@/types/UberPersona';
