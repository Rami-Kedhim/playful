
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { lucie } from '@/core/Lucie';
import { GenerateContentResult, ModerateContentParams } from '@/types/core-systems';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface LucieMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

interface UseLucieAssistantOptions {
  initialSystemPrompt?: string;
  initialMessages?: LucieMessage[];
  autoOpen?: boolean;
}

export function useLucieAssistant(options: UseLucieAssistantOptions = {}) {
  const {
    initialSystemPrompt = '',
    initialMessages = [],
    autoOpen = false
  } = typeof options === 'string' ? { initialSystemPrompt: options } : options;

  const [messages, setMessages] = useState<Message[]>(
    initialMessages.map(msg => ({
      id: msg.id,
      text: msg.content,
      sender: msg.role === 'user' ? 'user' : 'ai',
      timestamp: msg.timestamp
    }))
  );
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
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  }, []);

  const addAIMessage = useCallback((text: string) => {
    const aiMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    return aiMessage;
  }, []);

  const sendMessage = useCallback(async (text: string, options?: Record<string, any>) => {
    if (!text.trim()) return null;
    
    setIsLoading(true);
    setIsTyping(true);
    setError(null);
    
    try {
      // Add user message
      addUserMessage(text);
      
      // Moderate content
      const moderationParams: ModerateContentParams = {
        content: text,
        contentType: 'text',
        context: {}
      };
      
      const moderationResult = await lucie.moderateContent(moderationParams);
      
      if (!moderationResult.safe) {
        const safetyMessage = "I'm sorry, I can't respond to that type of content. Let's talk about something else.";
        addAIMessage(safetyMessage);
        return safetyMessage;
      }
      
      // Generate response
      const contextOptions = {
        systemPrompt,
        ...options
      };
      
      const response = await lucie.generateContent(text, contextOptions);
      
      // Add AI response
      addAIMessage(response.content);
      return response.content;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred while processing your message.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [addUserMessage, addAIMessage, systemPrompt]);

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
