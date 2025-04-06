
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
  
  // Monetization-related fields
  premium_content_count?: {
    photos: number;
    videos: number;
    messages: number;
  };
  subscription_price?: number;
  boost_status?: {
    is_boosted: boolean;
    boost_level: number;
    boost_expires_at: string;
  };
  gift_preferences?: string[];
  livecam_enabled?: boolean;
  livecam_schedule?: string[];
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

// New types for AI monetization
export interface AIPremiumContent {
  id: string;
  profile_id: string;
  type: 'photo' | 'video' | 'message';
  title: string;
  description?: string;
  content_url: string;
  thumbnail_url?: string;
  price: number;
  created_at: string;
}

export interface AIContentPurchase {
  id: string;
  content_id: string;
  user_id: string;
  profile_id: string;
  amount: number;
  created_at: string;
}

export interface AIGift {
  id: string;
  gift_type: string;
  name: string;
  description?: string;
  image_url?: string;
  price: number;
  profile_id: string;
  user_id: string;
  created_at: string;
}

export interface AIBoost {
  id: string;
  profile_id: string;
  user_id: string;
  boost_amount: number;
  boost_level: number;
  start_time: string;
  end_time: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface AILivecamSession {
  id: string;
  profile_id: string;
  status: 'scheduled' | 'live' | 'ended';
  start_time: string;
  end_time?: string;
  viewer_count: number;
  max_viewer_count: number;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
}
