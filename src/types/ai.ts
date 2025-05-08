
export interface ModerateContentParams {
  content: string;
  userId?: string;
  strictness?: 'low' | 'medium' | 'high';
  contentType?: string;
  type?: string;
}

export interface ModerationResult {
  isAppropriate: boolean;
  score: number;
  categories: {
    [key: string]: number;
  };
  message?: string;
}

export interface AIModelPreference {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
  contextLength?: number;
  provider?: string;
  capabilities?: string[];
  settings?: Record<string, any>;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
}

export interface AIProvider {
  id: string;
  name: string;
  models: AIModelPreference[];
  apiKey?: string;
  baseUrl?: string;
  isEnabled?: boolean;
  defaultModel?: string;
  capabilities?: {
    streaming?: boolean;
    functionCalling?: boolean;
    vision?: boolean;
    audio?: boolean;
  };
}
