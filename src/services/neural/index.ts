
// Re-export all neural service modules
export * from './modules/BaseNeuralService';
export * from './modules/AICompanionNeuralService';
export * from './modules/EscortsNeuralService';
export * from './modules/CreatorsNeuralService';
export * from './modules/LivecamsNeuralService';
export * from './registry/NeuralServiceRegistry';
export * from './types/NeuralService';
export * from './HermesOxumNeuralHub';

// Export neural hub singleton
import { neuralHub } from './HermesOxumNeuralHub';
export { neuralHub };
