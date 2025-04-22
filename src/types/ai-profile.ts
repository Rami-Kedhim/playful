
export interface AIProfile {
  id: string;
  name: string;
  avatar_url?: string;
  avatarUrl?: string;
  personality?: {
    type: 'flirty' | 'shy' | 'dominant' | 'playful' | string;
    traits?: string[];
  };
  location?: string;
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  interests?: string[];
  availability_status?: string;
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
    boost_level?: number;
  };
  isVerified?: boolean;
  
  // Additional properties needed by components
  displayName?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  isPremium?: boolean;
  rating?: number;
  description?: string;
  bio?: string;
  tags?: string[];
  gallery_images?: string[];
  premium_content_count?: number;
  subscription_price?: number;
  reviewCount?: number;
  type?: string;
  livecam_enabled?: boolean;
  created_at?: string | Date;
  age?: number;
}

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
  sender?: string;
  conversation_id?: string;
  status?: string;
  profileId?: string;
  messages?: AIMessage[];
  metadata?: {
    requires_payment?: boolean;
    payment_status?: string;
    price?: number;
  };
  attachments?: Array<{
    url: string;
    type: string;
  }>;
}

// Add ProcessingStatus and ProcessingStatusDetails types
export enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface ProcessingStatusDetails {
  status: ProcessingStatus;
  progress: number;
  message: string;
  error?: string;
}
