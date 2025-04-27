
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
