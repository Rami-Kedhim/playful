
/**
 * Model parameters definition for neural services
 */
export interface ModelParameters {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  modelName: string; // Added the missing modelName property
  stopSequences?: string[];
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
  modelName: 'gpt-3.5-turbo', // Default model name
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
