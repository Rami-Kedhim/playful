
export interface AIModelPreference {
  model: string;
  temperature?: number;
  systemPrompt?: string;
  outputFormat?: string;
  maxTokens?: number;
  provider?: string;
}

export interface AIProvider {
  name: string;
  apiKey?: string;
  baseUrl?: string;
  models: string[];
  capabilities: {
    streaming: boolean;
    functionCalling: boolean;
    vision: boolean;
    audio: boolean;
  };
}
