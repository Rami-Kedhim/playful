// Create AI profile types if missing

// Basic AIProfile interface
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
}

// AI Message interface
export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date | string;
  has_read?: boolean;
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
