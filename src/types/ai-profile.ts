
export interface AIMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isProcessing?: boolean;
}

export interface AIProfile {
  id: string;
  name: string;
  avatarUrl: string;
  type: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  
  // Additional fields needed by components
  avatar_url?: string; // For compatibility
  lucoin_chat_price?: number;
  boost_status?: any;
  age?: number;
  location?: string;
  personality?: string;
  interests?: string[];
  gallery_images?: string[];
  lucoin_image_price?: number;
  premium_content_count?: number;
  subscription_price?: number;
  livecam_enabled?: boolean;
  region?: string;
}
