
export interface AIProfilePersonality {
  type: 'flirty' | 'shy' | 'dominant' | 'playful' | 'professional';
  traits: string[];
  responseStyle: string;
  systemPrompt?: string;
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
  response_quality?: 'basic' | 'premium';
  sample_messages?: string[];
  verification_status?: 'pending' | 'verified' | 'rejected';
  availability_status?: 'online' | 'away' | 'offline';
  last_active?: string;
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
  personality_type?: string;
  generated_by?: 'basic' | 'premium' | 'gpt4' | 'gpt3.5';
  media_urls?: string[];
  has_read?: boolean;
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
  last_message_date?: string;
  unread_count?: number;
  payment_status?: 'free_trial' | 'paid' | 'pending_payment';
  free_messages_remaining?: number;
}

// New types for AI message generation
export interface AIChatRequest {
  conversation_id: string;
  user_id: string;
  user_message: string;
  ai_profile_id: string;
  message_history?: AIMessage[];
}

export interface AIChatResponse {
  message: AIMessage;
  requiresPayment: boolean;
  price?: number;
  error?: string;
}

// AI image generation types
export interface AIImageGenerationRequest {
  prompt: string;
  user_id: string;
  ai_profile_id?: string;
  size?: string;
  style?: string;
}

export interface AIImageGenerationResponse {
  image_url: string;
  prompt: string;
  price?: number;
  requiresPayment: boolean;
  error?: string;
}
