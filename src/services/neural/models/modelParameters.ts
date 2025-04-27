
// Fix import to use the correct type
import { ModelParameters } from '../HermesOxumNeuralHub';

export function createDefaultModelParameters(): ModelParameters {
  return {
    decayConstant: 0.05,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3,
    bifurcationPoint: 3.57,
    attractorStrength: 0.8,
    learningRate: 0.001,
    batchSize: 16,
    temperature: 0.7
  };
}

// Added missing functions referenced in ConfigurationPanel.tsx
export function initializeDefaultParameters(): ModelParameters {
  return createDefaultModelParameters();
}

export function calculateSystemEfficiency(parameters: ModelParameters): number {
  // Simple mock implementation
  return 0.75;
}

export function validateModelParameters(parameters: ModelParameters): boolean {
  // Basic validation
  return (
    (parameters.decayConstant || 0) > 0 &&
    (parameters.learningRate || 0) > 0 &&
    (parameters.batchSize || 0) > 0
  );
}
