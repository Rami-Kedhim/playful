
export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'confused' | 'friendly' | 'apologetic';
  suggestedActions?: string[];
  links?: string[]; // Added links property
  visualElements?: {
    type: string;
    data: any;
  }[];
}

export interface CompanionProfile {
  id: string;
  name: string;
  avatar_url?: string;
  description?: string;
  personality_traits?: string[];
  speech_style?: string;
  speechStyle?: string;
  voice_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserContext {
  userId?: string;
  preferences?: {
    topics?: string[];
    learning_style?: string;
    interaction_mode?: 'casual' | 'formal' | 'educational' | 'supportive';
  };
  recent_interactions?: {
    topic: string;
    timestamp: Date;
  }[];
  session_duration?: number;
}

export interface UseAICompanionConversationProps {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export interface AICompanionVoiceConfig {
  voice: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}
