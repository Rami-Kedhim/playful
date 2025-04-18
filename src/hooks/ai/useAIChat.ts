
import { useState } from 'react';

interface UseAIChatReturn {
  isProcessing: boolean;
  currentPrompt: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

export const useAIChat = (): UseAIChatReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const sendMessage = async (message: string) => {
    setIsProcessing(true);
    setCurrentPrompt(message);
    
    try {
      // Mock AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      // Mock AI response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add AI response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I processed your message: "${message}"`
      }]);
    } catch (error) {
      console.error('Error processing AI message:', error);
    } finally {
      setIsProcessing(false);
      setCurrentPrompt(null);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    isProcessing,
    currentPrompt,
    sendMessage,
    clearChat
  };
};

export default useAIChat;
