
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
}

export interface AIProfile {
  id: string;
  name: string;
  avatar_url?: string;
  avatarUrl?: string;
  personality?: {
    type: 'flirty' | 'shy' | 'dominant' | 'playful' | string;
  };
  location?: string;
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  interests?: string[];
  availability_status?: string;
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
  };
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
