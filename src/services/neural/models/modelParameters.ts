
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
  // Add additional properties that components are trying to use
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

export const calculateSystemEfficiency = (params: ModelParameters): number => {
  // Mock implementation
  return 0.85; // Return a value between 0 and 1
};

export const validateModelParameters = (params: ModelParameters): boolean => {
  // Basic validation
  return (
    params.temperature >= 0 && 
    params.temperature <= 1 && 
    params.maxTokens > 0
  );
};

// Function being referenced in neuralHubUtils.ts
export const getDefaultModelParameters = (): ModelParameters => {
  return { ...defaultModelParameters };
};
