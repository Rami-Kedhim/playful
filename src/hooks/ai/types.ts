
export interface AIPreferences {
  anonymized: boolean;
  personalizedResponses: boolean;
  adaptivePersonality: boolean;
  rememberConversations: boolean;
  suggestContent: boolean;
  learningEnabled: boolean;
  voiceSettings?: {
    voice: string;
    speed: number;
    pitch: number;
  };
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
  updatePreferences: (newPreferences: Partial<AIPreferences>) => Promise<boolean>;
  trackInteraction: (topic?: string) => Promise<void>;
  toggleAI: (enabled: boolean) => Promise<boolean>;
  resetAIContext: () => Promise<boolean>;
}

