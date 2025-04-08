
/**
 * Model Parameters - Utility functions for neural model parameters
 */
import { ModelParameters } from '../types/neuralHub';

export const initializeDefaultParameters = (): ModelParameters => {
  return {
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    optimizerType: 'adam',
    dropout: 0.2,
    activationFunction: 'relu',
    embeddingSize: 256,
    hiddenLayers: [128, 64],
    // Extended parameters
    decayConstant: 0.2,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3,
    bifurcationPoint: 0.6,
    attractorStrength: 0.7
  };
};

export const validateModelParameters = (params: ModelParameters): { valid: boolean, issues: string[] } => {
  const issues: string[] = [];
  
  // Validate basic parameters
  if (params.learningRate <= 0 || params.learningRate > 1) 
    issues.push('Learning rate must be between 0 and 1');
  
  if (params.batchSize < 1) 
    issues.push('Batch size must be positive');
  
  if (params.epochs < 1) 
    issues.push('Epochs must be positive');
  
  if (params.dropout < 0 || params.dropout >= 1) 
    issues.push('Dropout must be between 0 and 1');
    
  // Validate extended parameters
  if (params.decayConstant !== undefined && (params.decayConstant < 0 || params.decayConstant > 1))
    issues.push('Decay constant must be between 0 and 1');
  
  if (params.growthFactor !== undefined && params.growthFactor <= 0)
    issues.push('Growth factor must be positive');
  
  if (params.cyclePeriod !== undefined && params.cyclePeriod <= 0)
    issues.push('Cycle period must be positive');
  
  if (params.harmonicCount !== undefined && params.harmonicCount < 0)
    issues.push('Harmonic count must be non-negative');
  
  if (params.bifurcationPoint !== undefined && (params.bifurcationPoint < 0 || params.bifurcationPoint > 1))
    issues.push('Bifurcation point must be between 0 and 1');
  
  if (params.attractorStrength !== undefined && (params.attractorStrength < 0 || params.attractorStrength > 1))
    issues.push('Attractor strength must be between 0 and 1');
  
  return { 
    valid: issues.length === 0,
    issues 
  };
};

export const calculateSystemEfficiency = (params: ModelParameters): number => {
  // Base efficiency calculation
  let efficiency = 0.5;
  
  // Calculate efficiency based on parameters
  if (params.decayConstant !== undefined) {
    efficiency += (0.5 - Math.abs(0.2 - params.decayConstant)) * 0.2;
  }
  
  if (params.growthFactor !== undefined) {
    efficiency += Math.min(0.2, (params.growthFactor - 1) * 0.1);
  }
  
  if (params.cyclePeriod !== undefined) {
    efficiency += Math.min(0.1, params.cyclePeriod / 240);
  }
  
  if (params.harmonicCount !== undefined && params.harmonicCount > 0) {
    efficiency += Math.min(0.1, params.harmonicCount / 10);
  }
  
  if (params.bifurcationPoint !== undefined) {
    efficiency += (0.5 - Math.abs(0.6 - params.bifurcationPoint)) * 0.2;
  }
  
  if (params.attractorStrength !== undefined) {
    efficiency += params.attractorStrength * 0.2;
  }
  
  // Ensure efficiency is between 0 and 1
  return Math.max(0, Math.min(1, efficiency));
};
