
import { useState, useCallback } from 'react';
import { AIModelPreference } from '@/types/ai';
import { nsfwAIProviderService } from '@/services/ai/NSFWAIProviderService';

export const useNSFWAIChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get default provider and model
  const provider = nsfwAIProviderService.getDefaultProvider();
  const defaultModel = provider.models.find(m => m.id === provider.defaultModel) || provider.models[0];
  
  // Model settings
  const [modelPreference, setModelPreference] = useState<AIModelPreference>({
    id: defaultModel.id,
    name: defaultModel.name,
    model: defaultModel.model || defaultModel.id,
    temperature: defaultModel.temperature || 0.7,
    systemPrompt: defaultModel.systemPrompt || 'You are a helpful assistant'
  });
  
  // Function to send message to AI
  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to chat
      const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${content}"`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      return aiMessage;
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to update model settings
  const updateModelSettings = useCallback((settings: Partial<AIModelPreference>) => {
    setModelPreference(prev => ({
      ...prev,
      ...settings
    }));
  }, []);
  
  // Function to clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);
  
  // Function to set system prompt
  const setSystemPrompt = useCallback((prompt: string) => {
    setModelPreference(prev => ({
      ...prev,
      systemPrompt: prompt
    }));
  }, []);
  
  return {
    messages,
    isLoading,
    error,
    modelPreference,
    sendMessage,
    updateModelSettings,
    clearChat,
    setSystemPrompt,
    setMessages
  };
};

export default useNSFWAIChat;
