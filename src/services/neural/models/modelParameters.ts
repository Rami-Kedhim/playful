
import { ModelParameters } from '@/types/brainHub';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

/**
 * Update neural model parameters
 * @param parameters Parameters to update
 */
export const updateModelParameters = (parameters: ModelParameters): void => {
  try {
    neuralHub.updateModelParameters(parameters);
    console.log('Model parameters updated successfully');
  } catch (error) {
    console.error('Failed to update model parameters:', error);
  }
};

/**
 * Get default model parameters
 */
export const getDefaultModelParameters = (): ModelParameters => {
  return {
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 2048,
    stopSequences: [],
    modelName: 'default',
    decayConstant: 0.85,
    growthFactor: 1.05,
    cyclePeriod: 24,
    harmonicCount: 3,
  };
};
