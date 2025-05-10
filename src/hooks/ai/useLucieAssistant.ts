
import { useState, useCallback } from 'react';
import { lucieAI } from '@/core/Lucie';
import { useUberEcosystem } from '@/contexts/UberEcosystemContext';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function useLucieAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { initialized, ready } = useUberEcosystem();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to state
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Directly use the lucieAI instance that's imported from the module
      const response = await lucieAI.generateContent({ prompt: content });
      
      // Add assistant response
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.content
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    messages,
    sendMessage,
    isLoading,
    initialized,
    ready
  };
}

export default useLucieAssistant;
