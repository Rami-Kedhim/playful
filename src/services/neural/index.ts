
// Removed duplicate exports and fixed default export style.

export * from './modules/BaseNeuralService';
export * from './modules/AICompanionNeuralService';
export * from './modules/EscortsNeuralService';
export * from './modules/CreatorsNeuralService';
export * from './modules/LivecamsNeuralService';
export * from './registry/NeuralServiceRegistry';
export type { BaseNeuralService, NeuralServiceConfig, ModuleType } from './types/NeuralService';
export * from './HermesOxumNeuralHub';

import { neuralHub } from './HermesOxumNeuralHub';
export { neuralHub };
