
export interface AIPreferences {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  modelName: string;
}

// Add AIModelPreference for compatibility
export type AIModelPreference = AIPreferences;

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  id?: string;
  timestamp?: number;
}

export interface AIContext {
  messages: AIMessage[];
  preferences: AIPreferences;
  systemPrompt?: string;
  metadata?: Record<string, any>;
}

export interface AICompletionRequest {
  messages: AIMessage[];
  preferences?: Partial<AIPreferences>;
  systemPrompt?: string;
  metadata?: Record<string, any>;
}

export interface AICompletionResponse {
  message: AIMessage;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
