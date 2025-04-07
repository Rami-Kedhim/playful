
export type PersonalityType = 
  'flirty' | 
  'shy' | 
  'dominant' | 
  'playful' | 
  'professional' | 
  'romantic' | 
  'intellectual' | 
  'adventurous' | 
  'submissive';

export interface PersonalityTrait {
  name: string;
  description: string;
  intensity: number;
}

export interface AIPersonalityConversation {
  id: string;
  messages: string[];
  created_at: string;
  updated_at: string;
}

export interface EmotionalState {
  joy: number;
  interest: number;
  surprise: number;
  sadness: number;
  anger: number;
  fear: number;
  trust: number;
  anticipation: number;
  dominantEmotion: string;
  intensityLevel: number;
  lastUpdated: string;
}

export interface AIPersonalityConfig {
  type: PersonalityType;
  traits: string[];
  baselineEmotions: {
    joy: number;
    interest: number;
    trust: number;
    [key: string]: number;
  };
  responseStyle: {
    formality: number;
    friendliness: number;
    verbosity: number;
    humor: number;
  };
  interactionPatterns: {
    questionFrequency: number;
    emotionalResponseIntensity: number;
    personalDisclosureLevel: number;
    [key: string]: number;
  };
}

// Add the missing types needed by other parts of the application
export interface EmotionalMemory {
  userId: string;
  companionId: string;
  emotions: {
    currentState: EmotionalState;
    history: EmotionalState[];
  };
  lastUpdated: string;
}

export interface MonetizationHook {
  triggerPurchaseFlow: (productId: string, amount: number) => Promise<boolean>;
  checkUserCredits: () => Promise<number>;
  deductCredits: (amount: number, reason: string) => Promise<boolean>;
  getSubscriptionStatus: () => Promise<{ isSubscribed: boolean; plan: string | null }>;
}
