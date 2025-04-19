
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
  // This is a simplified algorithm for calculating system efficiency based on parameters
  const baseEfficiency = 70; // Base efficiency score
  
  // Factors that affect efficiency (weights can be adjusted based on importance)
  const decayFactor = parameters.decayConstant < 0.25 ? 10 : (parameters.decayConstant > 0.35 ? -5 : 5);
  const growthFactor = parameters.growthFactor > 1.2 && parameters.growthFactor < 1.8 ? 8 : -3;
  const cycleFactor = parameters.cyclePeriod > 18 && parameters.cyclePeriod < 30 ? 7 : -2;
  const harmonicFactor = parameters.harmonicCount >= 2 && parameters.harmonicCount <= 5 ? 5 : -5;
  
  // Additional factors if present
  const bifurcationFactor = parameters.bifurcationPoint ? 
    (parameters.bifurcationPoint > 0.5 && parameters.bifurcationPoint < 0.7 ? 5 : -2) : 0;
    
  const attractorFactor = parameters.attractorStrength ? 
    (parameters.attractorStrength > 0.4 && parameters.attractorStrength < 0.8 ? 5 : -3) : 0;
  
  // Calculate total efficiency
  let efficiency = baseEfficiency + 
    decayFactor + 
    growthFactor + 
    cycleFactor + 
    harmonicFactor + 
    bifurcationFactor +
    attractorFactor;
  
  // Ensure efficiency is within reasonable bounds
  efficiency = Math.min(100, Math.max(0, efficiency));
  
  return efficiency;
};

export const validateModelParameters = (parameters: ModelParameters): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate decay constant
  if (parameters.decayConstant < 0 || parameters.decayConstant > 1) {
    errors.push('Decay constant must be between 0 and 1');
  }
  
  // Validate growth factor
  if (parameters.growthFactor < 0) {
    errors.push('Growth factor must be positive');
  }
  
  // Validate cycle period
  if (parameters.cyclePeriod < 1) {
    errors.push('Cycle period must be at least 1');
  }
  
  // Validate harmonic count
  if (parameters.harmonicCount < 1 || parameters.harmonicCount > 10) {
    errors.push('Harmonic count must be between 1 and 10');
  }
  
  // Validate bifurcation point if present
  if (parameters.bifurcationPoint !== undefined && 
     (parameters.bifurcationPoint < 0 || parameters.bifurcationPoint > 1)) {
    errors.push('Bifurcation point must be between 0 and 1');
  }
  
  // Validate attractor strength if present
  if (parameters.attractorStrength !== undefined &&
     (parameters.attractorStrength < 0 || parameters.attractorStrength > 1)) {
    errors.push('Attractor strength must be between 0 and 1');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};
