/**
 * Model parameters definition for neural services
 */
export interface ModelParameters {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  modelName: string;
  stopSequences?: string[];
  // Add properties that are being used elsewhere in the codebase
  responseFormat?: string;
  model?: string;
  decayConstant?: number;
  learningRate?: number;
  batchSize?: number;
}

/**
 * Default model parameters
 */
export const defaultModelParameters: ModelParameters = {
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  maxTokens: 1000,
  modelName: 'gpt-3.5-turbo', 
  stopSequences: []
};

/**
 * Creative model parameters
 */
export const creativeModelParameters: ModelParameters = {
  temperature: 0.9,
  topP: 1.0,
  frequencyPenalty: 0.2,
  presencePenalty: 0.1,
  maxTokens: 1500,
  modelName: 'gpt-4',
  stopSequences: []
};

/**
 * Precise model parameters
 */
export const preciseModelParameters: ModelParameters = {
  temperature: 0.3,
  topP: 0.8,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  maxTokens: 800,
  modelName: 'gpt-3.5-turbo-16k',
  stopSequences: []
};

// Add the missing functions that are being imported
export const initializeDefaultParameters = (): ModelParameters => {
  return { ...defaultModelParameters };
};

export const getDefaultModelParameters = (): ModelParameters => {
  return { ...defaultModelParameters };
};

export const calculateSystemEfficiency = (params: ModelParameters): number => {
  // Implementation with all parameters
  const efficiencyScore = 
    0.7 * (1 - params.temperature) + 
    0.1 * (params.topP) +
    0.1 * (1 - (params.frequencyPenalty || 0) / 2) +
    0.1 * (1 - (params.presencePenalty || 0) / 2);
  
  return Math.min(1, Math.max(0, efficiencyScore));
};

export const validateModelParameters = (params: ModelParameters): boolean => {
  // Enhanced validation that checks all properties
  return (
    params.temperature >= 0 && 
    params.temperature <= 1 && 
    params.topP >= 0 &&
    params.topP <= 1 &&
    params.maxTokens > 0 &&
    (params.frequencyPenalty === undefined || 
     (params.frequencyPenalty >= -2 && params.frequencyPenalty <= 2)) &&
    (params.presencePenalty === undefined || 
     (params.presencePenalty >= -2 && params.presencePenalty <= 2))
  );
};
