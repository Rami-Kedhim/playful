
export interface PersonalityTrait {
  name: string;
  description?: string;
  intensity: number; // Range from 0 to 100
}

export interface AIPersonality {
  id: string;
  name: string;
  traits: PersonalityTrait[];
  interests: string[];
  description: string;
  voiceType?: string;
  languageModel?: string;
  conversationStyle?: 'formal' | 'casual' | 'flirty' | 'professional';
  backstory?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EmotionalState = 'neutral' | 'happy' | 'sad' | 'excited' | 'angry' | 'flirty' | 'thoughtful';
