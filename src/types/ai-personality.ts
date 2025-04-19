
// Fix missing export ErrorType and add to EmotionalState
export interface EmotionalState {
  primary: string;
  secondary?: string;
  intensity: number;
  dominantEmotion?: string;
  intensityLevel: number;
  joy?: number;
  trust?: number;
  fear?: number;
  surprise?: number;
  sadness?: number;
  anger?: number;
  anticipation?: number;
  interest?: number;
  lastUpdated?: string;
}

export type EmotionType =
  | 'joy'
  | 'trust'
  | 'fear'
  | 'surprise'
  | 'sadness'
  | 'anger'
  | 'anticipation'
  | 'interest'
  | 'neutral';

export interface PersonalityTrait {
  name: string;
  description?: string;
  intensity: number; // 0-100 value representing trait strength
  category?: string;
}

export interface PersonalityProfile {
  traits: PersonalityTrait[];
  dominantTraits?: string[];
  compatibilityScore?: number;
}

export type PersonalityType =
  | 'flirty'
  | 'shy'
  | 'dominant'
  | 'playful'
  | 'professional'
  | 'romantic'
  | 'intellectual'
  | 'adventurous'
  | 'submissive';

export interface AIPersonalityConfig {
  type: PersonalityType;
  traits: string[];
  baselineEmotions: Record<string, number>;
  responseStyle: {
    formality: number;
    friendliness: number;
    verbosity: number;
    humor: number;
    surprise: number;
  };
  interactionPatterns: Record<string, number>;
}

