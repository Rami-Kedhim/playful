
import { ModelParameters } from '@/types/neural/types/neuralHub';
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

/**
 * Initialize default parameters
 */
export const initializeDefaultParameters = (): ModelParameters => {
  return getDefaultModelParameters();
};

/**
 * Calculate system efficiency based on parameters
 */
export const calculateSystemEfficiency = (params: ModelParameters): number => {
  // Simple algorithm to calculate efficiency
  const baseEfficiency = 0.75;
  const tempFactor = 1 - Math.abs(params.temperature - 0.7) * 0.5;
  const decayFactor = params.decayConstant ? (params.decayConstant / 0.85) : 1;
  
  return Math.min(1, Math.max(0, baseEfficiency * tempFactor * decayFactor));
};

/**
 * Validate model parameters
 */
export const validateModelParameters = (params: ModelParameters): boolean => {
  // Basic validation
  if (params.temperature < 0 || params.temperature > 1) return false;
  if (params.decayConstant && (params.decayConstant < 0 || params.decayConstant > 1)) return false;
  if (params.maxTokens < 1 || params.maxTokens > 4096) return false;
  
  return true;
};
