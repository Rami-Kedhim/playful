
export interface CompanionProfile {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  personality?: string;
  visualCapabilities?: boolean;
  voiceType?: string;
  speechStyle?: string;
}

export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  suggestedActions?: string[];
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprise' | 'fear' | 'disgust' | 'friendly' | 'professional' | 'supportive' | 'apologetic' | 'helpful' | 'confused';
  links?: { text: string; url: string }[];
  visualElements?: {
    type: string;
    data: any;
  }[];
}

export interface UserContext {
  name?: string;
  interests?: string[];
  recentInteractions?: string;
  relationshipStatus?: string;
}

export interface UseAICompanionConversationProps {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export interface AICompanionResponse {
  text: string;
  emotions?: string | null;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
}
