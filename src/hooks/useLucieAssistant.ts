
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { lucie } from '@/core/Lucie';
import { GenerateContentResult, Message, ModerateContentParams } from '@/types/core-systems';

export function useLucieAssistant(initialSystemPrompt: string = '') {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt);

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
    setError(null);
    
    try {
      // Add user message
      addUserMessage(text);
      
      // Moderate content
      const moderationResult = await lucie.moderateContent({
        content: text,
        contentType: 'text'
      });
      
      if (!moderationResult.safe) {
        const safetyMessage = "I'm sorry, I can't respond to that type of content. Let's talk about something else.";
        addAIMessage(safetyMessage);
        return safetyMessage;
      }
      
      // Generate response
      const response = await lucie.generateContent(text, options);
      
      // Add AI response
      addAIMessage(response.content);
      return response.content;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred while processing your message.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [addUserMessage, addAIMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    systemPrompt,
    sendMessage,
    addUserMessage,
    addAIMessage,
    updateSystemPrompt,
    clearMessages
  };
}

export default useLucieAssistant;
