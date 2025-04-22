
// Define AI-related types

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
}

export interface AIModelGeneratorOptions {
  prompt: string;
  style?: string;
  count?: number;
  maxTokens?: number;
  temperature?: number;
  onSuccess?: (profiles: AIProfile[]) => void;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: {
    type: string;
    url: string;
  }[];
}

export interface AIConversation {
  id: string;
  profileId: string;
  messages: AIMessage[];
  lastMessage?: string;
  lastTimestamp?: string;
  unread?: number;
}
