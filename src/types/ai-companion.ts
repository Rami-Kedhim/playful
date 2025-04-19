
import { EmotionalState } from './ai-personality';

export interface RelationshipLevel {
  trust: number;
  affection: number;
  intimacy: number;
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
}
