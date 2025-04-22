
export interface AIProfile {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  description?: string;
  bio?: string;
  personality?: string;
  type?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  created_at?: string;
  availability_status?: string;
  systemMetadata?: {
    version?: string;
    lastSynced?: Date;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      hasPendingUpdates?: boolean;
    }
  };
  stats?: {
    followerCount?: number;
    messageCount?: number;
    responseRate?: number;
    averageResponseTime?: number;
  };
  features?: string[];
  settings?: {
    voiceEnabled?: boolean;
    imageGenerationEnabled?: boolean;
    personalityLevel?: number;
  };
  subscription?: {
    price?: number;
    currency?: string;
    interval?: string;
  };
  premium_content_count?: {
    photos?: number;
    videos?: number;
    messages?: number;
    [key: string]: number | undefined;
  };
  // Additional properties needed by AI components
  age?: number;
  location?: string;
  country?: string;
  avatar_url?: string;
  avatarUrl?: string;
  interests?: string[];
  gallery_images?: string[];
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  subscription_price?: number;
  livecam_enabled?: boolean;
  boost_status?: any;
  boost?: any;
}

// Add ProcessingStatus enum for AI model generation
export enum ProcessingStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PENDING = 'pending',
  CANCELLED = 'cancelled'
}

// Add AIMessage interface for AI message components
export interface AIMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isAI: boolean;
  attachments?: {
    type: string;
    url: string;
  }[];
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: Record<string, any>;
}
