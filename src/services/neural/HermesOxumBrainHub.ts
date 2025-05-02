
// This file exists for backward compatibility
// It simply re-exports from the main NeuralHub implementation
export { neuralHub } from './HermesOxumNeuralHub';
// Re-export as brainHub for backward compatibility
export { neuralHub as brainHub } from './HermesOxumNeuralHub';
// Re-export the type definition correctly
export type { INeuralHub as NeuralHub } from './types/neuralHub';
