
import { useState, useCallback, useEffect } from 'react';
import { lucieAIOrchestrator } from '@/utils/core/aiOrchestration';
import { useToast } from '@/components/ui/use-toast';
import { LucieMessage } from './ai-lucie/types';

export function useLucieAssistant() {
  const [messages, setMessages] = useState<LucieMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: LucieMessage = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: "Hi there! I'm Lucie, your personal UberEscorts assistant. How can I help you today?",
        timestamp: new Date(),
        suggestedActions: [
          "Find escorts near me",
          "Browse creator content",
          "Check my wallet"
        ],
        emotion: "friendly"
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Send a message to Lucie orchestrator
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsTyping(true);
    setError(null);

    try {
      // Compose sessionId with user ID or anon
      const sessionId = 'lucie-' + Date.now().toString();

      const userContext = {}; // Can be extended

      // Use routePrompt from Lucie orchestrator
      const { response, tokensUsed, moderationPassed, flaggedContent } = await lucieAIOrchestrator.orchestrateResponse(sessionId, content, userContext, messages);

      if (!moderationPassed) {
        setError('Your message was flagged by moderation and cannot be processed.');
        setIsTyping(false);
        return;
      }

      if (flaggedContent) {
        setError(`Blocked content detected: ${flaggedContent}`);
        setIsTyping(false);
        return;
      }

      // Add Lucie's response message
      const lucieMessage: LucieMessage = {
        id: 'lucie-' + Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        emotion: 'neutral'
      };

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content }]);
      setMessages(prev => [...prev, lucieMessage]);
    } catch (err: any) {
      setError('Failed to get a response. Please try again.');
      console.error('Error sending message to Lucie:', err);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  // Toggle the assistant open/closed
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    messages,
    isTyping,
    isOpen,
    error,
    sendMessage,
    toggleChat,
  };
}

export type { LucieMessage } from './ai-lucie/types';
export default useLucieAssistant;
