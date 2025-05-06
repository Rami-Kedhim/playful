
// Export neural services and modules

// Export base types and neural modules
export * from './modules/BaseNeuralService';
export * from './modules/AICompanionNeuralService';
export * from './modules/EscortsNeuralService';
export * from './modules/CreatorsNeuralService';
export * from './modules/LivecamsNeuralService';
export * from './registry/NeuralServiceRegistry';
export type { BaseNeuralService, NeuralServiceConfig, ModuleType } from './types/NeuralService';

// Export the unified neural hub instance and aliases for backward compatibility
import { default as unifiedNeuralHub } from './UnifiedNeuralHub';
export { unifiedNeuralHub };
export { neuralHub, brainHub } from './HermesOxumNeuralHub';
export type { INeuralHub as NeuralHub } from './types/neuralHub';
