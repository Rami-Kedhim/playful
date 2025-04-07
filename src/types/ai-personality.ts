
/**
 * AI Personality Types for UberEscorts virtual companions
 */

export type PersonalityType = 
  | 'flirty'
  | 'dominant'
  | 'submissive'
  | 'playful'
  | 'romantic'
  | 'shy'
  | 'intellectual'
  | 'adventurous';

export interface PersonalityTrait {
  name: string;
  description: string;
  intensity: number; // 0-100
}

export interface AIPersonalityConfig {
  type: PersonalityType;
  baseTraits: PersonalityTrait[];
  responseStyle: string;
  emotionalTendency: string;
  conversationPreferences: {
    directness: number; // 0-100
    verbosity: number; // 0-100
    emotionality: number; // 0-100
    intimacy: number; // 0-100
  };
  systemPrompt: string;
}

export interface EmotionalState {
  joy: number; // 0-100
  interest: number; // 0-100
  surprise: number; // 0-100
  sadness: number; // 0-100
  anger: number; // 0-100
  fear: number; // 0-100
  trust: number; // 0-100
  anticipation: number; // 0-100
  dominantEmotion?: string;
  intensityLevel: number; // 0-100
  lastUpdated: string; // ISO date string
}

export interface EmotionalMemory {
  companionId: string;
  userId: string;
  state: EmotionalState;
  emotionalHistory: Array<{
    emotion: string;
    trigger: string;
    intensity: number;
    timestamp: string;
  }>;
  keyMemories: Array<{
    topic: string;
    sentiment: number; // -100 to 100
    importance: number; // 0-100
    created: string;
    lastRecalled: string;
  }>;
}

export interface MonetizationHook {
  type: 'image' | 'voice' | 'explicit_content' | 'extended_chat' | 'special_interaction';
  triggerConditions: {
    messageCount?: number;
    intimacyLevel?: number;
    keywords?: string[];
    timeInterval?: number; // minutes since last monetization
  };
  lucoinCost: number;
  teaser: string;
  fullContent?: string;
  previewUrl?: string;
}

// Extended types for AI companion interaction
export interface AIInteractionPreferences {
  responseDelay: {
    min: number;  // Minimum delay in milliseconds
    max: number;  // Maximum delay in milliseconds
    typing: boolean; // Whether to show typing indicator during delay
  };
  textStyle: {
    emoji: number;  // 0-100 frequency
    slang: number;  // 0-100 frequency
    formality: number; // 0-100 (0 = very casual, 100 = very formal)
  };
  interactionBoundaries: {
    explicitContent: boolean;
    politicalDiscussions: boolean;
    personalQuestions: boolean;
    roleplayWillingness: number; // 0-100
  };
}
