
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  is_ai?: boolean;
  created_at?: string | Date;
  requires_payment?: boolean;
  payment_status?: 'pending' | 'completed' | 'failed';
  price?: number;
  has_read?: boolean;
  conversation_id: string;
  sender_id?: string;
  conversationId?: string;
}

export interface AIProfile {
  id: string;
  name: string;
  avatar_url?: string;
  personality?: {
    type: 'flirty' | 'shy' | 'dominant' | 'playful' | string;
  };
  location?: string;
  age?: number;
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  verification_status?: 'verified' | 'pending' | 'rejected';
  availability_status?: 'online' | 'away' | 'offline';
  last_active?: string;
  interests?: string[];
  bio?: string;
  boost_status?: {
    is_boosted: boolean;
    expires_at?: string;
  };
}

export interface AIConversation {
  id: string;
  profileId: string;
  user_id?: string;
  ai_profile_id?: string;
  lastMessageAt?: string | Date;
  messagesCount?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  messages?: AIMessage[];
  ai_profile?: AIProfile;
}
