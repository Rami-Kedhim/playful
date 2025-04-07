
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
}

export interface UseAICompanionConversationOptions {
  companionId: string;
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
