
export interface ModelParameters {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stopSequences: string[];
  modelName: string;
}

export class ModelParametersBuilder {
  private params: ModelParameters = {
    temperature: 0.7,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    maxTokens: 1024,
    stopSequences: [],
    modelName: 'gpt-4'
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
