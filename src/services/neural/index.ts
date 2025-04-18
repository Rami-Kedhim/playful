
// Correct imports and exports
import { uberCore } from './UberCore';
import { brainHub } from './HermesOxumNeuralHub';
import { escortsNeuralService } from './modules/EscortsNeuralService';

// Export all services
export {
  uberCore,
  brainHub,
  escortsNeuralService
};

// Use export type for TypeScript interfaces when isolatedModules is enabled
export type { NeuralModel } from '@/types/UberPersona';
