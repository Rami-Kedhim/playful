
import { ModelParameters } from '../types/neuralHub';

/**
 * Calculate system efficiency based on model parameters
 */
export function calculateSystemEfficiency(params?: ModelParameters): number {
  // Default parameters if none provided
  const parameters = params || initializeDefaultParameters();
  
  // Calculate efficiency based on parameter values
  // This is a simplified calculation for demonstration
  const learningRateScore = Math.min(1, parameters.learningRate * 1000);
  const batchSizeScore = Math.min(1, parameters.batchSize / 128);
  const epochsScore = Math.min(1, parameters.epochs / 20);
  
  // Advanced parameters contribute to efficiency if available
  let advancedScore = 0.8; // Default
  if (parameters.decayConstant !== undefined && 
      parameters.attractorStrength !== undefined) {
    advancedScore = 
      (1 - Math.abs(parameters.decayConstant - 0.2)) * 0.5 +
      (parameters.attractorStrength * 0.5);
  }
  
  // Weighted calculation
  const efficiency = (
    learningRateScore * 0.3 +
    batchSizeScore * 0.2 +
    epochsScore * 0.2 +
    advancedScore * 0.3
  );
  
  return efficiency;
}

/**
 * Validate model parameters
 */
export function validateModelParameters(parameters: ModelParameters): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  
  // Check required parameters
  if (parameters.learningRate <= 0 || parameters.learningRate > 1) {
    errors.push('Learning rate must be between 0 and 1');
  }
  
  if (parameters.batchSize < 1) {
    errors.push('Batch size must be at least 1');
  }
  
  if (parameters.epochs < 1) {
    errors.push('Number of epochs must be at least 1');
  }
  
  // Check advanced parameters if provided
  if (parameters.decayConstant !== undefined && 
      (parameters.decayConstant < 0 || parameters.decayConstant > 1)) {
    errors.push('Decay constant must be between 0 and 1');
  }
  
  if (parameters.attractorStrength !== undefined && 
      (parameters.attractorStrength < 0 || parameters.attractorStrength > 1)) {
    errors.push('Attractor strength must be between 0 and 1');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * Initialize default model parameters
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
