
import { useState } from 'react';
import { AIMessage } from '@/types/ai-chat';
import { aiConversationsService } from '@/services/ai/aiConversationsService';

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
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      // Send message using service
      const aiMessage = await aiConversationsService.sendMessage({
        role: 'user',
        content: message,
        senderId: 'user-1',
        receiverId: 'ai-1'
      });
      
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
