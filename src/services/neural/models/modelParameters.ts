
export interface ModelParameters {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stopSequences: string[];
  modelName: string;
  // Adding missing properties for brain hub configuration
  decayConstant?: number;
  growthFactor?: number;
  cyclePeriod?: number;
  harmonicCount?: number;
  bifurcationPoint?: number;
  attractorStrength?: number;
  learningRate?: number;
  batchSize?: number;
}

// Helper functions for model parameters
export function initializeDefaultParameters(): ModelParameters {
  return {
    temperature: 0.7,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    maxTokens: 1024,
    stopSequences: [],
    modelName: 'gpt-4',
    decayConstant: 0.2,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3,
    bifurcationPoint: 0.6,
    attractorStrength: 0.6,
    learningRate: 0.001,
    batchSize: 32
  };
}

export function calculateSystemEfficiency(params: ModelParameters): number {
  // Simple calculation based on parameter values
  let efficiency = 0;
  
  if (params.decayConstant !== undefined) {
    efficiency += (1 - params.decayConstant) * 25; // 0-25 points
  }
  
  if (params.growthFactor !== undefined) {
    efficiency += (params.growthFactor / 2) * 25; // 0-25 points
  }
  
  if (params.cyclePeriod !== undefined && params.harmonicCount !== undefined) {
    // Balance between cycle period and harmonic count
    const balance = Math.min(params.cyclePeriod / 30, 1) * Math.min(params.harmonicCount / 5, 1);
    efficiency += balance * 25; // 0-25 points
  }
  
  if (params.learningRate !== undefined && params.batchSize !== undefined) {
    // Optimal learning parameters
    const learningBalance = (0.002 - Math.abs(0.001 - params.learningRate)) / 0.002 * 
                          Math.min(params.batchSize / 64, 1);
    efficiency += learningBalance * 25; // 0-25 points
  }
  
  return Math.min(100, Math.max(0, efficiency));
}

export function validateModelParameters(params: ModelParameters): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate temperature
  if (params.temperature < 0 || params.temperature > 1) {
    errors.push('Temperature must be between 0 and 1');
  }
  
  // Validate topP
  if (params.topP < 0 || params.topP > 1) {
    errors.push('Top P must be between 0 and 1');
  }
  
  // Validate maxTokens
  if (params.maxTokens < 1 || params.maxTokens > 4096) {
    errors.push('Max tokens must be between 1 and 4096');
  }
  
  // Validate decayConstant if present
  if (params.decayConstant !== undefined && (params.decayConstant < 0 || params.decayConstant > 1)) {
    errors.push('Decay constant must be between 0 and 1');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export class ModelParametersBuilder {
  private params: ModelParameters = {
    temperature: 0.7,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    maxTokens: 1024,
    stopSequences: [],
    modelName: 'gpt-4',
    decayConstant: 0.2,
    growthFactor: 1.5,
    cyclePeriod: 24,
    harmonicCount: 3
  };
  
  public withTemperature(temperature: number): ModelParametersBuilder {
    this.params.temperature = Math.max(0, Math.min(1, temperature));
    return this;
  }
  
  public withTopP(topP: number): ModelParametersBuilder {
    this.params.topP = Math.max(0, Math.min(1, topP));
    return this;
  }
  
  public withFrequencyPenalty(penalty: number): ModelParametersBuilder {
    this.params.frequencyPenalty = penalty;
    return this;
  }
  
  public withPresencePenalty(penalty: number): ModelParametersBuilder {
    this.params.presencePenalty = penalty;
    return this;
  }
  
  public withMaxTokens(tokens: number): ModelParametersBuilder {
    this.params.maxTokens = tokens;
    return this;
  }
  
  public withStopSequences(sequences: string[]): ModelParametersBuilder {
    this.params.stopSequences = sequences;
    return this;
  }
  
  public withModelName(name: string): ModelParametersBuilder {
    this.params.modelName = name;
    return this;
  }
  
  public withDecayConstant(value: number): ModelParametersBuilder {
    this.params.decayConstant = value;
    return this;
  }
  
  public withGrowthFactor(value: number): ModelParametersBuilder {
    this.params.growthFactor = value;
    return this;
  }
  
  public withCyclePeriod(value: number): ModelParametersBuilder {
    this.params.cyclePeriod = value;
    return this;
  }
  
  public withHarmonicCount(value: number): ModelParametersBuilder {
    this.params.harmonicCount = value;
    return this;
  }
  
  public build(): ModelParameters {
    return { ...this.params };
  }
  
  public static defaultCreativeParameters(): ModelParameters {
    return new ModelParametersBuilder()
      .withTemperature(0.9)
      .withTopP(1.0)
      .withMaxTokens(2048)
      .build();
  }
  
  public static defaultPreciseParameters(): ModelParameters {
    return new ModelParametersBuilder()
      .withTemperature(0.3)
      .withTopP(0.8)
      .withFrequencyPenalty(0.5)
      .withMaxTokens(1024)
      .build();
  }
  
  public static defaultBalancedParameters(): ModelParameters {
    return new ModelParametersBuilder()
      .withTemperature(0.7)
      .withTopP(0.9)
      .withMaxTokens(1536)
      .build();
  }
}

export default ModelParametersBuilder;
