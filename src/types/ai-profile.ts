
/**
 * AI Profile Types
 */

export interface AIProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  avatar_url: string;
  gallery_images: string[];
  personality: {
    type: string;
    traits: string[];
  };
  interests: string[];
  ubx_chat_price: number;
  ubx_image_price: number;
  created_at: string;
  isVerified: boolean;
  rating?: number;
  reviewCount?: number;
  isPremium?: boolean;
  availability_status: 'available' | 'away' | 'offline';
}

export interface AIChat {
  id: string;
  profile_id: string;
  user_id: string;
  messages: AIMessage[];
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  id: string;
  chat_id: string;
  sender: 'ai' | 'user';
  content: string;
  created_at: string;
  metadata?: {
    emotion?: string;
    attachment?: {
      type: 'image' | 'audio';
      url: string;
    };
  };
}

export interface AISubscription {
  id: string;
  user_id: string;
  profile_id: string;
  level: 'basic' | 'premium' | 'vip';
  started_at: string;
  expires_at: string;
  benefits: string[];
  auto_renew: boolean;
  price_paid: number;
}
