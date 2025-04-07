
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
