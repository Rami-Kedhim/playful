
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define the Message interface that matches what's used in LucieAssistant
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system'; // Use role to determine sender in the component
  content: string; // Use content for message text
  timestamp: Date;
}

interface UseLucieAssistantOptions {
  initialSystemPrompt?: string;
  initialMessages?: Message[];
  autoOpen?: boolean;
}

export function useLucieAssistant(options: UseLucieAssistantOptions = {}) {
  const {
    initialSystemPrompt = '',
    initialMessages = [],
    autoOpen = false
  } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt);
  const [isOpen, setIsOpen] = useState(autoOpen);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const updateSystemPrompt = useCallback((newPrompt: string) => {
    setSystemPrompt(newPrompt);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  }, []);

  const addAIMessage = useCallback((text: string) => {
    const aiMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    return aiMessage;
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return null;
    
    setIsLoading(true);
    setIsTyping(true);
    setError(null);
    
    try {
      // Add user message
      addUserMessage(text);
      
      // Simulate AI response (in a real app, this would call an API)
      setTimeout(() => {
        const response = `I received your message: "${text}". This is a placeholder response.`;
        addAIMessage(response);
        setIsLoading(false);
        setIsTyping(false);
      }, 1000);
      
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred while processing your message.';
      setError(errorMessage);
      setIsLoading(false);
      setIsTyping(false);
      return null;
    }
  }, [addUserMessage, addAIMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    error,
    systemPrompt,
    sendMessage,
    addUserMessage,
    addAIMessage,
    updateSystemPrompt,
    clearMessages,
    isOpen,
    toggleChat
  };
}

export default useLucieAssistant;
