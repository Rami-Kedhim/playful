
export interface EmotionalState {
  primary: string;
  secondary?: string;
  intensity: number;
}

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
