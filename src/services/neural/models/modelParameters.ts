
export interface ModelParameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  optimizerType: string;
  dropout: number;
  activationFunction: string;
  embeddingSize: number;
  hiddenLayers: number[];
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
  bifurcationPoint: number;
  attractorStrength: number;
}

export const initializeDefaultParameters = (): ModelParameters => {
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
};

export const calculateSystemEfficiency = (params: ModelParameters): number => {
  // Calculate overall system efficiency score (0-100)
  const baseScore = 70;
  
  // Adjust score based on parameter values
  let adjustments = 0;
  adjustments += (params.decayConstant >= 0.15 && params.decayConstant <= 0.25) ? 5 : -5;
  adjustments += (params.growthFactor >= 1.3 && params.growthFactor <= 1.7) ? 5 : -3;
  adjustments += (params.cyclePeriod >= 18 && params.cyclePeriod <= 30) ? 5 : -3;
  adjustments += (params.harmonicCount >= 2 && params.harmonicCount <= 4) ? 5 : -2;
  adjustments += (params.attractorStrength >= 0.5 && params.attractorStrength <= 0.8) ? 5 : -2;
  
  const finalScore = Math.max(0, Math.min(100, baseScore + adjustments));
  return finalScore;
};

export const validateModelParameters = (params: ModelParameters): { valid: boolean, errors?: string[] } => {
  const errors: string[] = [];
  
  if (params.learningRate <= 0 || params.learningRate > 1) {
    errors.push('Learning rate must be between 0 and 1');
  }
  
  if (params.batchSize < 1) {
    errors.push('Batch size must be at least 1');
  }
  
  if (params.epochs < 1) {
    errors.push('Epochs must be at least 1');
  }
  
  if (params.decayConstant < 0 || params.decayConstant > 1) {
    errors.push('Decay constant must be between 0 and 1');
  }
  
  if (params.growthFactor <= 0) {
    errors.push('Growth factor must be positive');
  }
  
  if (params.cyclePeriod < 1) {
    errors.push('Cycle period must be at least 1');
  }
  
  if (params.harmonicCount < 1 || params.harmonicCount > 10) {
    errors.push('Harmonic count must be between 1 and 10');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};
