
export interface PersonalityTrait {
  name: string;
  description: string;
  intensity: number;
}

export interface PersonalityProfile {
  traits: PersonalityTrait[];
  dominantTrait?: string;
  compatibility?: {
    matchScore: number;
    matchTraits: string[];
  };
}

// Add all the missing types needed by the components
export type PersonalityType = 'flirty' | 'dominant' | 'submissive' | 'romantic' | 'shy' | 'playful' | 'intellectual' | 'adventurous';

export interface EmotionalState {
  joy: number;
  trust: number;
  fear: number;
  surprise: number;
  sadness: number;
  anger: number;
  anticipation: number;
  interest: number;
  dominantEmotion: string;
  intensityLevel: number;
  lastUpdated: string; // ISO date string
}

export interface EmotionalMemory {
  state: EmotionalState;
  keyMemories: Array<{
    topic: string;
    sentiment: number;
    importance: number;
    created: string;
    lastRecalled: string;
  }>;
  recentInteractions: Array<{
    content: string;
    emotion: string;
    timestamp: string;
  }>;
  relationshipLevel?: {
    trust: number;
    affection: number;
    intimacy: number;
  };
}

export interface AIPersonalityConfig {
  type: PersonalityType;
  traits: string[];
  baselineEmotions: Partial<EmotionalState>;
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
  };
}

export interface MonetizationHook {
  shouldRestrict: (contentType: string) => boolean;
  processPremiumContent: () => Promise<boolean>;
  getContentPrice: (contentType: string) => number;
  getUserBalance: () => number;
  processPayment: (amount: number) => Promise<boolean>;
}
