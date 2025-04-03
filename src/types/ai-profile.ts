
export interface AIProfilePersonality {
  type: 'flirty' | 'shy' | 'dominant' | 'playful' | 'professional';
  traits: string[];
  responseStyle: string;
}

export interface AIProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  avatar_url: string;
  gallery_images: string[];
  personality: AIProfilePersonality;
  interests: string[];
  is_ai: boolean;
  systemPrompt: string;
  delayed_response_min: number;
  delayed_response_max: number;
  created_at: string;
  lucoin_chat_price: number;
  lucoin_image_price: number;
}

export interface AIMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_ai: boolean;
  requires_payment?: boolean;
  price?: number;
  payment_status?: 'pending' | 'completed';
}

export interface AIConversation {
  id: string;
  user_id: string;
  ai_profile_id: string;
  created_at: string;
  updated_at: string;
  messages: AIMessage[];
  status: 'active' | 'archived' | 'blocked';
  ai_profile?: AIProfile;
}
