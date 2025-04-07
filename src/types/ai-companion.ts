
/**
 * Types for the AI Companion system
 */

// AI Companion personality traits
export type AICompanionPersonalityTrait = 
  | "flirtatious" 
  | "shy" 
  | "dominant" 
  | "sweet" 
  | "intellectual" 
  | "playful" 
  | "mysterious" 
  | "caring";

// AI Companion body type
export type AICompanionBodyType = 
  | "slim" 
  | "athletic" 
  | "curvy" 
  | "plus-size" 
  | "petite" 
  | "muscular";

// AI Companion voice type
export type AICompanionVoiceType = 
  | "soft" 
  | "deep" 
  | "sultry" 
  | "bubbly" 
  | "sophisticated" 
  | "breathy";

// Relationship level types
export type AICompanionRelationshipLevel = {
  trust: number;       // 0-100
  affection: number;   // 0-100
  obedience: number;   // 0-100
  intimacy: number;    // 0-100
};

// AI Companion base model
export interface AICompanion {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  gallery: string[];
  description: string;
  personality_traits: AICompanionPersonalityTrait[];
  body_type: AICompanionBodyType;
  voice_type: AICompanionVoiceType;
  relationship_level: AICompanionRelationshipLevel;
  engagement_stats: {
    chat_messages: number;
    images_generated: number;
    voice_messages: number;
    last_interaction: string | null;
  };
  is_preset: boolean;
  verification_status?: string;
}

// AI Companion creation parameters
export interface AICompanionCreateParams {
  name: string;
  description?: string;
  personality_traits: AICompanionPersonalityTrait[];
  body_type: AICompanionBodyType;
  voice_type: AICompanionVoiceType;
  avatar_url?: string;
}

// AI Companion update parameters
export interface AICompanionUpdateParams {
  name?: string;
  description?: string;
  personality_traits?: AICompanionPersonalityTrait[];
  body_type?: AICompanionBodyType;
  voice_type?: AICompanionVoiceType;
  avatar_url?: string;
}

// Chat message with AI Companion
export interface AICompanionMessage {
  id: string;
  user_id: string;
  companion_id: string;
  content: string;
  is_from_user: boolean;
  created_at: string;
  attachments?: {
    type: "image" | "voice";
    url: string;
  }[];
}

// AI Content generation parameters
export interface AIContentGenerationParams {
  prompt: string;
  companion_id: string;
  type: "image" | "voice" | "text";
  style?: string;
  nsfw_level?: "mild" | "moderate" | "explicit";
}

// Unlockable content item
export interface AICompanionContent {
  id: string;
  companion_id: string;
  content_type: "image" | "voice" | "video";
  url: string;
  thumbnail_url?: string;
  title: string;
  description?: string;
  price: number;
  is_premium: boolean;
  created_at: string;
}
