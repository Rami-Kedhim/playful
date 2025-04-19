
// Define basic types for AI companion interactions
export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  emotion?: string; // Added to support emotional states
  visualElements?: Array<{
    data: {
      type: string;
      [key: string]: any;
    }
  }>;
  requiresPayment?: boolean;
  paymentAmount?: number;
  suggestedActions?: string[];
  isPremium?: boolean;
}

export interface AICompanionContact {
  id: string;
  name: string;
  avatar: string;
  lastActive?: string;
  online?: boolean;
  preview?: string;
}

export interface AIContentGenerationParams {
  companion_id: string;
  prompt: string;
  type: 'image' | 'voice' | 'video' | 'text';
  settings?: Record<string, any>;
}

export interface AICompanionConversation {
  id: string;
  companionId: string;
  userId: string;
  messages: CompanionMessage[];
  lastMessage?: string;
  lastActivity: Date;
}

export interface AICompanionRelationshipLevel {
  intimacy: number; // 0-100
  trust: number; // 0-100
  attachment: number; // 0-100
  dominantDynamic: 'submissive' | 'equal' | 'dominant' | null;
  stage: 'stranger' | 'acquaintance' | 'friend' | 'close' | 'intimate';
  lastInteraction: string; // ISO date string
  interactionCount: number; 
}

// Add missing CompanionProfile type
export interface CompanionProfile {
  id: string;
  name: string;
  avatar_url: string;
  personality?: string;
  description: string;
  visualCapabilities: boolean;
  voice_type: string;
  speechStyle: string;
}

// Add missing UserContext type
export interface UserContext {
  name?: string;
  interests?: string[];
  relationshipStatus?: string;
  recentInteractions?: string;
}

// Add missing UseAICompanionConversationOptions and UseAICompanionConversationResult types
export interface UseAICompanionConversationOptions {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export interface UseAICompanionConversationResult {
  messages: CompanionMessage[];
  isTyping: boolean;
  isLoading: boolean;
  error: string | null;
  companion: any; // Using any here as it's being casted in the hook
  sendMessage: (content: string) => Promise<void>;
  handleSuggestedActionClick: (action: string) => void;
  generateImage: (prompt: string) => Promise<void>;
  generatingImage: boolean;
  creditCost: number;
}

export interface AICompanionMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  emotionalState?: EmotionalState;
  is_from_user?: boolean; // For backward compatibility
  created_at?: string; // For backward compatibility
  attachments?: Array<{
    type: string;
    url: string;
  }>;
}
