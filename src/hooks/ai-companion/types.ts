
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
