
export interface AIProfile {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  avatar_url?: string;
  personality?: string | { type: string };
  createdAt: string | Date;
  created_at?: string | Date;
  // Additional properties accessed in the codebase
  location?: string;
  interests?: string[];
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
  };
  availability_status?: string;
  // AI model specific fields
  displayName?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  isPremium?: boolean;
  rating?: number;
  bio?: string;
  tags?: string[];
  gallery_images?: string[];
  lucoin_image_price?: number;
  premium_content_count?: {
    photos: number;
    videos: number;
    messages: number;
  };
  subscription_price?: number;
  reviewCount?: number;
  livecam_enabled?: boolean;
  type?: string;
  gender?: string;
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
  sender?: string; // Backward compatibility
  conversation_id?: string; // Backward compatibility
  // Additional fields based on component usage
  attachments?: {
    type: string;
    url: string;
  }[];
  status?: string;
  metadata?: {
    requires_payment?: boolean;
    payment_status?: string;
    price?: number;
    [key: string]: any;
  };
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

export enum ProcessingStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface ProcessingStatusDetails {
  status: ProcessingStatus;
  message?: string;
  completedCount?: number;
  totalCount?: number;
}

export interface AIModelGeneratorOptions {
  prompt: string;
  style?: string;
  count?: number;
  maxTokens?: number;
  temperature?: number;
  onSuccess?: (profiles: AIProfile[]) => void;
}
