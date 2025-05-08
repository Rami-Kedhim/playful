
export interface ModerateContentParams {
  content: string;
  userId?: string;
  strictness?: 'low' | 'medium' | 'high';
  contentType?: string; // Add this to fix BrainCore errors
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
  model?: string;             // Add this for useNSFWAIChat
  systemPrompt?: string;      // Add this for useNSFWAIChat
}

// Add any other AI-related types here
