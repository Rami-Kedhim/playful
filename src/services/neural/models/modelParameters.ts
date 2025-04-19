
import { ModelParameters } from '../HermesOxumNeuralHub';

export const initializeDefaultParameters = (): ModelParameters => {
  return {
    decayConstant: 0.2,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3,
    bifurcationPoint: 0.6,
    attractorStrength: 0.6,
    learningRate: 0.001,
    batchSize: 32
  };
};

export const calculateSystemEfficiency = (parameters: ModelParameters): number => {
  // A simple algorithm to calculate efficiency score based on parameters
  const balance = 1 - Math.abs((parameters.decayConstant * 10) - 1) / 2;
  const cohesion = parameters.growthFactor / 3;
  const complexity = Math.min(parameters.harmonicCount / 5, 1);
  const stability = Math.min(parameters.cyclePeriod / 30, 1);
  
  // Optional parameters contribute if they exist
  const adaptation = parameters.learningRate ? Math.min(parameters.learningRate * 2000, 1) : 0.5;
  const processing = parameters.batchSize ? Math.min(parameters.batchSize / 64, 1) : 0.5;
  
  // Calculate weighted score
  const score = (
    balance * 0.25 +
    cohesion * 0.2 +
    complexity * 0.15 +
    stability * 0.2 +
    adaptation * 0.1 +
    processing * 0.1
  ) * 100;
  
  return Math.min(Math.max(score, 0), 100);
};

export const validateModelParameters = (parameters: ModelParameters): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Required parameters
  if (parameters.decayConstant === undefined || parameters.decayConstant < 0 || parameters.decayConstant > 1) {
    errors.push('Decay constant must be between 0 and 1');
  }
  
  if (parameters.growthFactor === undefined || parameters.growthFactor < 0.1 || parameters.growthFactor > 5) {
    errors.push('Growth factor must be between 0.1 and 5');
  }
  
  if (parameters.cyclePeriod === undefined || parameters.cyclePeriod < 1 || parameters.cyclePeriod > 100) {
    errors.push('Cycle period must be between 1 and 100');
  }
  
  if (parameters.harmonicCount === undefined || parameters.harmonicCount < 1 || parameters.harmonicCount > 10) {
    errors.push('Harmonic count must be between 1 and 10');
  }
  
  // Optional parameters
  if (parameters.bifurcationPoint !== undefined && (parameters.bifurcationPoint < 0 || parameters.bifurcationPoint > 1)) {
    errors.push('Bifurcation point must be between 0 and 1');
  }
  
  if (parameters.attractorStrength !== undefined && (parameters.attractorStrength < 0 || parameters.attractorStrength > 1)) {
    errors.push('Attractor strength must be between 0 and 1');
  }
  
  if (parameters.learningRate !== undefined && (parameters.learningRate < 0.0001 || parameters.learningRate > 0.1)) {
    errors.push('Learning rate must be between 0.0001 and 0.1');
  }
  
  if (parameters.batchSize !== undefined && (parameters.batchSize < 1 || parameters.batchSize > 1024)) {
    errors.push('Batch size must be between 1 and 1024');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};
