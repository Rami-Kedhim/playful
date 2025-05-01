
export interface ModelParameters {
  temperature: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stopSequences: string[];
  modelName: string;
  decayConstant: number;
  growthFactor: number;
  cyclePeriod: number;
  harmonicCount: number;
}

export type RequestType = 'analysis' | 'generation' | 'moderation' | 'transformation';

export interface BrainHubRequest {
  type: RequestType;
  data?: any;
}

export interface BrainHubResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface INeuralHub {
  initialize(): void;
  updateModelParameters(parameters: Partial<ModelParameters>): void;
  getModelParameters(): ModelParameters;
  processRequest(request: BrainHubRequest): Promise<BrainHubResponse>;
}
