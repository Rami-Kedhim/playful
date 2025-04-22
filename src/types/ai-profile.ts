
export interface AIProfile {
  id: string;
  name: string;
  gender: string;
  age: number;
  bio: string;
  personality: string;
  avatarUrl?: string;
  avatar_url?: string; // For compatibility with API responses
  location?: string;
  interests?: string[];
  tags?: string[];
  isVerified?: boolean;
  createdAt?: string;
  created_at?: string; // For compatibility with API responses
  category?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  isPremium?: boolean;
  attributes?: Record<string, any>;
  preferences?: Record<string, any>;
  voiceId?: string;
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
  };
  availability_status?: string;
  
  // Additional properties used in other components
  displayName?: string;
  description?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  type?: string;
  gallery_images?: string[];
  lucoin_image_price?: number;
  lucoin_chat_price?: number;
  subscription_price?: number;
  premium_content_count?: number;
  livecam_enabled?: boolean;
}

export interface AIMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isAI: boolean;
  attachments?: Array<{
    type: string;
    url: string;
  }>;
  status?: 'sent' | 'delivered' | 'read';
  metadata?: {
    requires_payment?: boolean;
    payment_status?: 'pending' | 'completed';
    price?: number;
    [key: string]: any;
  };
  sender?: string; // For backward compatibility
  has_read?: boolean; // For backward compatibility
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

export interface AIModelGeneratorOptions {
  prompt: string;
  style?: string;
  count?: number;
  maxTokens?: number;
  temperature?: number;
  onSuccess?: (profiles: AIProfile[]) => void;
}

export enum ProcessingStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}
