import { ModelParameters } from '../types/neuralHub';

/**
 * Calculate the efficiency score of the system based on the provided parameters
 * @param params Model parameters
 * @returns Efficiency score (0-100)
 */
export function calculateSystemEfficiency(params: ModelParameters): number {
  // This is a simplified algorithm to calculate system efficiency
  // In a real application, this would be more complex
  
  let score = 60; // Base score
  
  // Adjust score based on parameters
  if (params.decayConstant !== undefined) {
    score += (params.decayConstant < 0.25) ? 10 : (params.decayConstant > 0.3) ? -5 : 5;
  }
  
  if (params.growthFactor !== undefined) {
    score += (params.growthFactor > 1.5) ? 8 : (params.growthFactor < 1.2) ? -3 : 4;
  }
  
  if (params.cyclePeriod !== undefined) {
    score += (params.cyclePeriod >= 20 && params.cyclePeriod <= 28) ? 6 : -2;
  }
  
  if (params.harmonicCount !== undefined) {
    score += (params.harmonicCount === 3) ? 7 : (params.harmonicCount > 5) ? -4 : 2;
  }
  
  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score));
}

/**
 * Validate model parameters
 * @param parameters Parameters to validate
 * @returns Validation result
 */
export function validateModelParameters(parameters: ModelParameters): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  
  if (parameters.learningRate !== undefined && (parameters.learningRate <= 0 || parameters.learningRate > 1)) {
    errors.push('Learning rate must be between 0 and 1');
  }
  
  if (parameters.batchSize !== undefined && parameters.batchSize < 1) {
    errors.push('Batch size must be at least 1');
  }
  
  if (parameters.epochs !== undefined && parameters.epochs < 1) {
    errors.push('Number of epochs must be at least 1');
  }
  
  if (parameters.dropout !== undefined && (parameters.dropout < 0 || parameters.dropout >= 1)) {
    errors.push('Dropout must be between 0 and 1');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * Initialize default model parameters
 * @returns Default model parameters
 */
export function initializeDefaultParameters(): ModelParameters {
  return {
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    optimizerType: 'adam',
    dropout: 0.2,
    activationFunction: 'relu',
    embeddingSize: 128,
    hiddenLayers: [64, 32],
    decayConstant: 0.2,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3,
    bifurcationPoint: 0.6,
    attractorStrength: 0.7
  };
}

// Export ModelParameters type for reuse
export { ModelParameters } from '../types/neuralHub';
