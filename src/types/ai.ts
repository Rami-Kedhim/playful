
export interface AIPersonality {
  name: string;
  type: 'friendly' | 'flirty' | 'shy' | 'confident' | 'mysterious';
  traits: string[];
  interests: string[];
  backstory: string;
  voiceType?: string;
  speaking_style?: string;
}

export interface AIProfile {
  id: string;
  name: string;
  personality: AIPersonality;
  avatarUrl: string;
  bio: string;
  age?: number;
  location?: string;
  status: 'online' | 'offline' | 'away';
  lastActive?: Date;
  popularity: number;
  featured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  id: string;
  profileId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'audio';
  audioUrl?: string;
  isUserMessage: boolean;
}

export interface AIConversation {
  id: string;
  profileId: string;
  userId: string;
  messages: AIMessage[];
  lastMessageAt: Date;
  createdAt: Date;
}
