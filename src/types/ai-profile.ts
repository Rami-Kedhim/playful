
export interface AIProfile {
  id: string;
  name: string;
  gender: string;
  age: number;
  bio: string;
  personality: string;
  avatarUrl?: string;
  tags?: string[];
  isVerified?: boolean;
  createdAt?: string;
  createdBy?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  isPremium?: boolean;
  attributes?: Record<string, any>;
  preferences?: Record<string, any>;
  voiceId?: string;
  
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
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}
