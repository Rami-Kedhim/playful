
export interface AIPreferences {
  anonymized: boolean;
  personalizedResponses: boolean;
  adaptivePersonality: boolean;
  rememberConversations: boolean;
  suggestContent: boolean;
  learningEnabled: boolean;
  [key: string]: boolean | string | number | undefined;
}

export interface AIContext {
  preferences: AIPreferences;
  lastInteraction: Date | null;
  conversationCount: number;
  favoriteTopics: string[];
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseAIContextReturn {
  aiContext: AIContext | null;
  isLoading: boolean;
  error: string | null;
  updatePreferences: (preferences: Partial<AIPreferences>) => Promise<void>;
  trackInteraction: (topic?: string) => Promise<void>;
  toggleAI: (enabled: boolean) => Promise<void>;
  resetAIContext: () => Promise<void>;
}

export interface UseAIContextStateReturn {
  aiContext: AIContext | null;
  setAIContext: React.Dispatch<React.SetStateAction<AIContext | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
