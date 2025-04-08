
/**
 * Model parameters management
 */
import { ModelParameters } from '../types/neuralHub';

/**
 * Initialize default model parameters
 */
export function initializeDefaultParameters(): ModelParameters {
  return {
    decayConstant: 0.2,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3,
    bifurcationPoint: 0.6,
    attractorStrength: 0.4
  };
}

/**
 * Validate model parameters
 * @param params Parameters to validate
 * @returns Validated parameters with corrections if needed
 */
export function validateModelParameters(params: ModelParameters): ModelParameters {
  return {
    decayConstant: Math.max(0.05, Math.min(0.5, params.decayConstant)),
    growthFactor: Math.max(0.5, Math.min(3.0, params.growthFactor)),
    cyclePeriod: Math.max(1, Math.min(48, params.cyclePeriod)),
    harmonicCount: Math.max(1, Math.min(7, Math.floor(params.harmonicCount))),
    bifurcationPoint: Math.max(0.1, Math.min(0.9, params.bifurcationPoint)),
    attractorStrength: Math.max(0.1, Math.min(1.0, params.attractorStrength))
  };
}

/**
 * Calculate system efficiency based on parameters
 * @param params Model parameters
 * @returns Efficiency score between 0-1
 */
export function calculateSystemEfficiency(params: ModelParameters): number {
  // This is a simplified calculation for demonstration
  const weightedSum = 
    params.decayConstant * 0.2 + 
    params.growthFactor * 0.3 + 
    (1 / params.cyclePeriod) * 10 + 
    params.harmonicCount * 0.05 + 
    params.bifurcationPoint * 0.2 + 
    params.attractorStrength * 0.25;
    
  return Math.min(1, Math.max(0, weightedSum / 2));
}
