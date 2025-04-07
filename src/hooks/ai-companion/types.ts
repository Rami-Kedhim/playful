
import { AICompanion } from '@/types/ai-companion';
import { VisualElementData } from '@/components/ai/companion-chat/AICompanionVisualElements';

export type CompanionMessageRole = 'user' | 'assistant' | 'system';

export interface VisualElement {
  type: 'image' | 'card' | 'carousel' | 'map';
  data: VisualElementData;
}

export interface CompanionMessage {
  id: string;
  role: CompanionMessageRole;
  content: string;
  timestamp?: Date;
  suggestedActions?: string[];
  visualElements?: { data: VisualElementData }[];
  emotion?: string;
  links?: string[]; // Include links property to fix type error
}

export interface UseAICompanionConversationOptions {
  companionId: string;
}

// Using the same interface name to match the import in index.ts
export interface UseAICompanionConversationProps {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export interface UseAICompanionConversationResult {
  messages: CompanionMessage[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  companion: AICompanion | null;
  sendMessage: (content: string) => Promise<void>;
  handleSuggestedActionClick: (action: string) => void;
  generateImage?: (prompt: string) => Promise<void>;
  generatingImage?: boolean;
  creditCost?: number;
}

export interface CompanionProfile {
  id: string;
  name: string;
  avatar?: string;
  avatar_url?: string;
  personality: string;
  description: string;
  visualCapabilities: boolean;
  voice_type: string; // Changed from voiceType to match AICompanion
  speechStyle: string;
}

export interface UserContext {
  name?: string;
  interests?: string[];
  relationshipStatus?: string;
  recentInteractions?: string;
}
