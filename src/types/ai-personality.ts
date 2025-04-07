
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
  emotion?: string;
  trigger?: string;
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
    surprise: number;
  };
  interactionPatterns: {
    questionFrequency: number;
    emotionalResponseIntensity: number;
    personalDisclosureLevel: number;
    [key: string]: number;
  };
}

export interface EmotionalMemory {
  userId: string;
  companionId: string;
  emotions: {
    currentState: EmotionalState;
    history: EmotionalState[];
  };
  lastUpdated: string;
  state?: EmotionalState; // Added for backward compatibility
  emotionalHistory?: EmotionalState[]; // Added for backward compatibility
  keyMemories?: any[]; // Added for missing property
  recentInteractions?: any[]; // Added for missing property
}

// Update the MonetizationHook interface to make all the properties non-optional or add index signature
export interface MonetizationHook {
  // Required core methods (must be non-optional)
  triggerPurchaseFlow: (productId: string, amount: number) => Promise<boolean>;
  checkUserCredits: () => Promise<number>;
  deductCredits: (amount: number, reason: string) => Promise<boolean>;
  getSubscriptionStatus: () => Promise<{ isSubscribed: boolean; plan: string | null }>;
  
  // Required properties
  type: string;
  triggerConditions: { 
    messageCount?: number; 
    intimacyLevel?: number;
    keywords?: string[];
    [key: string]: any;
  };
  lucoinCost: number;
  teaser: string;
  
  // Optional properties with index signature for additional properties
  [key: string]: any;
}
