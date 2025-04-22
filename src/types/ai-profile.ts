
// Enhanced AIProfile interface
export interface AIProfile {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  age?: number;
  country?: string;
  language?: string;
  personality?: string;
  interests?: string[];
  tags?: string[];
  category?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  
  // Additional properties needed by components
  avatar_url?: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
  type?: string;
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  boost_status?: any;
  subscription_price?: number;
  premium_content_count?: number;
  gallery_images?: string[];
  livecam_enabled?: boolean;
}

// AI Message interface
export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date | string;
  has_read?: boolean;
  requires_payment?: boolean;
  payment_status?: string;
  sender?: string;
  price?: number;
}

// AI Conversation interface
export interface AIConversation {
  id: string;
  messages: AIMessage[];
  aiProfileId: string;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// AI Generation Options
export interface AIGenerationOptions {
  count?: number;
  personalityTypes?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  regions?: string[];
}

// Processing Status
export interface ProcessingStatus {
  completedCount: number;
  totalCount: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  message?: string;
}
