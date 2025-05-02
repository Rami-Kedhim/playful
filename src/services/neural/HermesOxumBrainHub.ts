
// This file exists for backward compatibility
// It simply re-exports from the main NeuralHub implementation
export { neuralHub, neuralHub as brainHub } from './HermesOxumNeuralHub';
// Re-export the type definition correctly
export type { INeuralHub } from './types/neuralHub';
