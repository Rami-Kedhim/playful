
import { useState, useCallback, useEffect } from 'react';
import { AIMessage, AIConversation } from '@/types/ai-profile';

interface UseAIChatOptions {
  aiProfileId: string;
  initialMessages?: AIMessage[];
}

interface UseAIChatReturn {
  messages: AIMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  markAllAsRead: () => void;
  hasUnread: boolean;
}

export const useAIChat = ({ aiProfileId, initialMessages = [] }: UseAIChatOptions): UseAIChatReturn => {
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  // Check for unread messages
  useEffect(() => {
    const unreadCount = messages.filter(msg => msg.role === 'assistant' && msg.has_read === false).length;
    setHasUnread(unreadCount > 0);
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response generation with some delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple response generator - in production, this would call an API
    const responses = [
      "I'm so glad you reached out to me! What would you like to talk about next?",
      "That's interesting! Tell me more about your preferences?",
      "I've been thinking about what you said. Would you like to explore that idea further?",
      "I'm enjoying our conversation. What else is on your mind?",
      "That's a fascinating perspective. I'd love to hear more about it."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message
      const userMessage: AIMessage = {
        id: `msg-${Date.now()}-user`,
        content,
        role: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Generate AI response
      const responseContent = await generateResponse(content);
      
      // Add AI response
      const aiMessage: AIMessage = {
        id: `msg-${Date.now()}-ai`,
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
        has_read: false
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const markAllAsRead = useCallback(() => {
    setMessages(prev => 
      prev.map(msg => 
        msg.role === 'assistant' && msg.has_read === false
          ? { ...msg, has_read: true }
          : msg
      )
    );
    setHasUnread(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    markAllAsRead,
    hasUnread
  };
};

export default useAIChat;
