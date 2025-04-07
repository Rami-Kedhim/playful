
export interface CompanionProfile {
  id: string;
  name: string;
  avatarUrl: string;
  personality: string;
  background: string;
  interests: string[];
  speechStyle: string;
  emotion?: string;
}

export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  emotion?: string | null;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
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
