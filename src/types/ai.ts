
export type AIModelType = 'text' | 'image' | 'video' | 'audio';
export type AIModelProvider = 'openai' | 'anthropic' | 'stability' | 'replicate' | 'custom';
export type AIModelTemperature = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
export type AIModelSize = 'small' | 'medium' | 'large';

export interface AIModel {
  id: string;
  name: string;
  provider: AIModelProvider;
  type: AIModelType;
  contextSize?: number;
  maxOutputTokens?: number;
  capabilities?: string[];
  isPremium?: boolean;
}

export interface AIPreferences {
  model?: string;
  temperature?: AIModelTemperature;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  safetyFilter?: boolean;
  id?: string; // Add missing property
}

export interface AIMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  model: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface AIContentGenerationConfig {
  prompt: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
  responseFormat?: 'text' | 'json';
  safetySettings?: AIContentSafetySettings;
}

export interface AIContentSafetySettings {
  filterProfanity: boolean;
  filterSensitiveContent: boolean;
  blockUnsafe: boolean;
}
