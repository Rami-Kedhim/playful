
import { useState } from 'react';
import { AIPreferences, ChatMessage } from '@/types/ai';

export const useNSFWAIChat = (initialPreferences?: AIPreferences) => {
  const [preferences, setPreferences] = useState<AIPreferences>(
    initialPreferences || {
      theme: 'adult',
      model: 'gpt-4o',
      temperature: 0.8,
      safetySettings: {
        adultContent: 'allowed',
        hateSpeech: 'blocked',
        violence: 'limited'
      },
      chatHistory: true
    }
  );
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `This is a simulated NSFW AI response to: "${content}"`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (err: any) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearMessages = () => {
    setMessages([]);
  };
  
  const updatePreferences = (newPreferences: Partial<AIPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    preferences,
    updatePreferences
  };
};
