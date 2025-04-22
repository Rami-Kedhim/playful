
export interface AIProfile {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  avatar_url?: string;
  personality?: string;
  createdAt: string | Date;
  created_at?: string | Date;
  // Properties accessed in code but not in original definition
  location?: string;
  interests?: string[];
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
  };
  availability_status?: string;
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
  FAILED = 'failed'
}

export interface ProcessingStatusDetails {
  status: ProcessingStatus;
  message?: string;
  completedCount?: number;
  totalCount?: number;
}
