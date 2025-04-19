
export type EmotionType = 'joy' | 'trust' | 'fear' | 'surprise' | 'sadness' | 'anger' | 'anticipation' | 'interest' | 'neutral';

export interface EmotionalState {
  // Core emotion values
  joy: number;
  trust: number;
  fear: number;
  surprise: number;
  sadness: number;
  anger: number;
  anticipation: number;
  interest: number;
  
  // Calculated properties
  dominantEmotion: EmotionType;
  intensityLevel: number;
  lastUpdated: number;
}

export interface PersonalityTrait {
  name: string;
  value: number; // 0-100 scale
  description?: string;
}
