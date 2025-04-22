
import { AIProfile } from './ai-profile';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  is_ai?: boolean;
  created_at?: string | Date;
  requires_payment?: boolean;
  payment_status?: 'pending' | 'completed' | 'failed';
  price?: number;
  has_read?: boolean;
  senderId?: string;
  receiverId?: string;
  isAI?: boolean;
  sender?: string; // Backward compatibility
  conversation_id?: string; // Backward compatibility
}

export interface AIConversation {
  id: string;
  user_id: string;
  ai_profile_id: string;
  created_at: string | Date;
  updated_at: string | Date;
  messages?: AIMessage[];
  ai_profile?: AIProfile;
}

export interface AIMessageRequest {
  content: string;
  senderId: string;
  receiverId: string;
  conversation_id?: string;
}

export interface AIMessageResponse {
  id: string;
  conversation_id?: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_ai: boolean;
  has_read: boolean;
  requires_payment: boolean;
  price?: number;
  payment_status?: string;
}
