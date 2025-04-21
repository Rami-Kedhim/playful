
export interface AIProfile {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  avatar_url?: string; // For backward compatibility
  tags?: string[];
  abilities?: string[];
  pricing?: {
    hourly?: number;
    message?: number;
  };
  rating?: number;
  reviewCount?: number;
  online?: boolean;
  categories?: string[];
  
  // Additional properties needed by components
  age?: number;
  location?: string;
  personality?: {
    type: string;
    traits?: string[];
    responseStyle?: string;
  };
  interests?: string[];
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  boost_status?: {
    is_boosted: boolean;
    expires_at?: string;
  };
  gallery_images?: string[];
  subscription_price?: number;
  premium_content_count?: {
    photos: number;
    videos: number;
    messages: number;
  };
  livecam_enabled?: boolean;
}

// Add missing AIMessage interface
export interface AIMessage {
  id: string;
  content: string;
  is_ai: boolean;
  timestamp: Date;
  requires_payment?: boolean;
  payment_status?: 'pending' | 'complete' | 'failed';
  price?: number;
}
