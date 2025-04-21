
export interface AIMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isProcessing?: boolean;
  
  // Add missing properties that components expect
  requires_payment?: boolean;
  payment_status?: string;
  is_ai?: boolean;
  price?: number;
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
  bio?: string; // Add bio field
  lucoin_chat_price?: number;
  boost_status?: any;
  age?: number;
  location?: string;
  personality?: {
    type?: string;  // Make personality an object with type
  };
  interests?: string[];
  gallery_images?: string[];
  lucoin_image_price?: number;
  premium_content_count?: {
    photos?: number;
    videos?: number;
    messages?: number;
  };
  subscription_price?: number;
  livecam_enabled?: boolean;
  region?: string;
}
