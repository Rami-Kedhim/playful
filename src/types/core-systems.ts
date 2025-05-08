
// Core system types for the application

export interface ModerateContentParams {
  content: string;
  type?: string; // This will be compatible with contentType usage
}

export interface ModerateContentResult {
  isSafe: boolean;
  reasons?: string[];
  issues?: string[]; // Making this compatible with existing code
  score?: number;
  categories?: Record<string, number>;
}

export interface GenerateContentParams {
  prompt?: string;
  systemPrompt?: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings?: string[];
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface SystemHealthStatus {
  operational: boolean;
  latency?: number;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  action?: string;
  priority?: number;
  type?: string;
  completed?: boolean;
  url?: string;
  metadata?: Record<string, any>;
}
