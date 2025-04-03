
import { AIConversation, AIMessage, AIProfile } from '@/types/ai-profile';

export interface UseAIMessagingProps {
  profileId?: string;
  conversationId?: string;
}

export interface UseAIMessagingState {
  loading: boolean;
  sendingMessage: boolean;
  profile: AIProfile | null;
  conversation: AIConversation | null;
  messages: AIMessage[];
  error: string | null;
  paymentRequired: boolean;
  paymentMessage: AIMessage | null;
  generatingImage: boolean;
  simulatingTyping: boolean;
}

export interface UseAIMessagingActions {
  initializeConversation: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  processPayment: () => Promise<void>;
  generateImage: (prompt: string) => Promise<string | null>;
}

export type UseAIMessagingReturn = UseAIMessagingState & UseAIMessagingActions;
