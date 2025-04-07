import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { CompanionMessage } from './types';

interface UseAICompanionMessagesProps {
  initialMessages?: CompanionMessage[];
}

export const useAICompanionMessages = ({ initialMessages = [] }: UseAICompanionMessagesProps = {}) => {
  const [messages, setMessages] = useState<CompanionMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const addMessage = useCallback((message: Omit<CompanionMessage, 'id'>) => {
    const newMessage: CompanionMessage = {
      id: nanoid(),
      ...message,
      timestamp: new Date()
    };
    setMessages(current => [...current, newMessage]);
  }, []);

  const updateMessage = useCallback((messageId: string, updates: Partial<CompanionMessage>) => {
    setMessages(current =>
      current.map(msg =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    );
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    setMessages(current => current.filter(msg => msg.id !== messageId));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const setIsTypingState = useCallback((typing: boolean) => {
    setIsTyping(typing);
  }, []);

  const handleErrorResponse = (errorMessage: string) => {
    const errorResponse: CompanionMessage = {
      id: nanoid(),
      role: 'assistant',
      content: `I'm having trouble connecting right now. ${errorMessage}`,
      timestamp: new Date(),
      suggestedActions: ['Try again', 'Ask something else'],
      emotion: 'apologetic',
      links: []
    };
    
    setMessages(current => [...current, errorResponse]);
    setIsTyping(false);
  };

  const handleSuggestedAction = useCallback((action: string) => {
    const assistantMessage: CompanionMessage = {
      id: nanoid(),
      role: 'assistant',
      content: action,
      timestamp: new Date(),
      suggestedActions: [],
      emotion: 'friendly',
      links: []
    };
    setMessages(current => [...current, assistantMessage]);
  }, []);

  // Error response when API or processing fails
  const handleApiFailure = (error: any) => {
    console.error("API call failed:", error);
    
    const errorResponse: CompanionMessage = {
      id: nanoid(),
      role: 'assistant',
      content: "I'm having trouble responding right now. Please try again in a moment.",
      timestamp: new Date(),
      suggestedActions: ['Try again later', 'Ask something else'],
      emotion: 'apologetic',
      links: []
    };
    
    setMessages(current => [...current, errorResponse]);
    setIsTyping(false);
  };

  return {
    messages,
    isTyping,
    addMessage,
    updateMessage,
    deleteMessage,
    clearMessages,
    setIsTyping: setIsTypingState,
    handleErrorResponse,
    handleSuggestedAction,
    handleApiFailure
  };
};
