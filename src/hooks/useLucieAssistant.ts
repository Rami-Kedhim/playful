
import { useState, useCallback } from 'react';
import { lucie } from '@/core/Lucie';

type LucieMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

interface UseLucieAssistantOptions {
  initialMessages?: LucieMessage[];
  initialContext?: Record<string, any>;
  userId?: string;
}

export const useLucieAssistant = (options: UseLucieAssistantOptions = {}) => {
  const [messages, setMessages] = useState<LucieMessage[]>(options.initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<Record<string, any>>(options.initialContext || {});
  
  // Helper function to generate a unique ID
  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    try {
      // Add user message to state
      const userMessage: LucieMessage = {
        id: generateId(),
        content,
        role: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);
      
      // Check if content is appropriate
      const moderationResult = await lucie.moderateContent(content);
      if (!moderationResult.safe) {
        const warningMessage: LucieMessage = {
          id: generateId(),
          content: "I'm sorry, but I cannot process that request as it may contain inappropriate content.",
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, warningMessage]);
        setIsLoading(false);
        return;
      }
      
      // Generate Lucie's response
      const messageHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      const enhancedContext = {
        ...context,
        userId: options.userId || 'anonymous',
        messageHistory
      };
      
      const response = await lucie.generateContent(content, enhancedContext);
      
      // Add assistant message to state
      const assistantMessage: LucieMessage = {
        id: generateId(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error in Lucie assistant:', err);
      setError('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, context, options.userId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const updateContext = useCallback((newContext: Record<string, any>) => {
    setContext(prev => ({
      ...prev,
      ...newContext
    }));
  }, []);

  return {
    messages,
    isLoading,
    error,
    context,
    sendMessage,
    clearMessages,
    updateContext
  };
};

export default useLucieAssistant;
