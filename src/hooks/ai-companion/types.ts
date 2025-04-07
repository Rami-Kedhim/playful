
export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'confused' | 'friendly' | 'apologetic';
  suggestedActions?: string[];
  visualElements?: {
    type: string;
    data: any;
  }[];
}

export interface UseAICompanionConversationProps {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export interface AICompanionVoiceConfig {
  voice: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}
