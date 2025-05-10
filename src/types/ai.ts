
export type AIModelName = 'gpt-4-mini' | 'gpt-4o' | 'claude-3' | 'gemini-pro';

export interface AIPreferences {
  theme?: string;
  model?: AIModelName;
  temperature?: number;
  safetySettings?: Record<string, any>;
  chatHistory?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface AIModelConfig {
  id: AIModelName;
  name: string;
  description: string;
  maxTokens: number;
  tokenCost: number;
  capabilities: string[];
  modelProvider: 'OpenAI' | 'Anthropic' | 'Google';
}

export interface AIModelOptions {
  temperature?: number; // 0.0 to 1.0
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface AICompanion {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatarUrl: string;
  systemPrompt: string;
  createdAt: Date;
  lastInteraction?: Date;
  conversationCount: number;
  favoriteTopics?: string[];
}

export interface AIConversationHistory {
  id: string;
  userId: string;
  companionId?: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIError {
  code: string;
  message: string;
  type: 'rate_limit' | 'api_error' | 'token_limit' | 'content_policy' | 'other';
  timestamp: Date;
}
