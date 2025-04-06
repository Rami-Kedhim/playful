
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/services/ai/aiImageService'; // Fixed import name

// Add any missing types
interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export function useAIMessaging() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);

      // Add user message to the chat
      const userMessage: AIMessage = {
        id: `msg-${Date.now()}-user`,
        role: 'user',
        content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // This would be an actual API call in production
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add AI response to the chat
      const aiMessage: AIMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: `This is a response to: ${content}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      return aiMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Generate an image using AI
  const generateAIImage = useCallback(async (prompt: string) => {
    try {
      const imageUrl = await generateImage(prompt);
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate image',
        variant: 'destructive',
      });
      return null;
    }
  }, [toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    generateAIImage
  };
}

export default useAIMessaging;
