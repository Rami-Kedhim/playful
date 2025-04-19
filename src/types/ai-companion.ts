
import { EmotionalState } from './ai-personality';

export interface RelationshipLevel {
  trust: number;
  affection: number;
  intimacy: number;
  obedience: number;
}

export interface AICompanion {
  id: string;
  name: string;
  description?: string;
  avatar_url: string;
  personality_traits?: string[];
  verification_status?: 'verified' | 'pending' | 'rejected';
  relationship_level?: RelationshipLevel;
  emotional_state?: EmotionalState;
  created_at: string;
  updated_at: string;
  body_type?: string;
  voice_type?: string;
  is_preset?: boolean;
  engagement_stats?: {
    messages_sent: number;
    messages_received: number;
    total_interaction_time: number;
    last_interaction?: string;
    chat_messages?: number;
    images_generated?: number;
    voice_messages?: number;
  };
}

export interface AICompanionMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  emotionalState?: EmotionalState;
  is_from_user?: boolean;
  created_at?: string;
  attachments?: Array<{
    type: string;
    url: string;
  }>;
}
