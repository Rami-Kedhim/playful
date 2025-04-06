
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/services/ai/aiImageService';

// Define the AIMessage type with all required properties
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  is_ai?: boolean;
  created_at?: string | Date;
  requires_payment?: boolean;
  payment_status?: 'pending' | 'completed' | 'failed';
  price?: number;
}

// Add the AIProfile type
export interface AIProfile {
  id: string;
  name: string;
  avatar_url?: string;
  personality?: {
    type: 'flirty' | 'shy' | 'dominant' | 'playful' | string;
  };
  location?: string;
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
}

// Define the hook interface
interface UseAIMessagingOptions {
  profileId?: string;
  conversationId?: string;
}

export function useAIMessaging(options?: UseAIMessagingOptions) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [profile, setProfile] = useState<AIProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [simulatingTyping, setSimulatingTyping] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const { toast } = useToast();

  // Initialize conversation
  const initializeConversation = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call to get profile
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Set mock profile
      setProfile({
        id: options?.profileId || 'default-profile',
        name: 'AI Assistant',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        personality: {
          type: 'friendly'
        },
        location: 'Virtual',
        lucoin_chat_price: 5,
        lucoin_image_price: 10
      });
      
      // Set initial welcome message
      const welcomeMessage: AIMessage = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: 'Hello! How can I assist you today?',
        timestamp: new Date(),
        is_ai: true,
        created_at: new Date()
      };
      
      setMessages([welcomeMessage]);
    } catch (err) {
      setError('Failed to initialize conversation');
    } finally {
      setLoading(false);
    }
  }, [options?.profileId]);

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    try {
      setSendingMessage(true);

      // Add user message to the chat
      const userMessage: AIMessage = {
        id: `msg-${Date.now()}-user`,
        role: 'user',
        content,
        timestamp: new Date(),
        is_ai: false,
        created_at: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate typing
      setSimulatingTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSimulatingTyping(false);

      // Add AI response to the chat
      const aiMessage: AIMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: `This is a response to: ${content}`,
        timestamp: new Date(),
        is_ai: true,
        created_at: new Date()
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
      setSendingMessage(false);
    }
  }, [toast]);

  // Generate an image using AI
  const generateAIImage = useCallback(async (prompt: string) => {
    try {
      setGeneratingImage(true);
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
    } finally {
      setGeneratingImage(false);
    }
  }, [toast]);

  // Process payment for premium messages
  const processPayment = useCallback(async () => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPaymentRequired(false);
      setPaymentMessage(null);
      
      toast({
        title: 'Payment successful',
        description: 'Your premium response has been unlocked',
      });
      
      return true;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment failed',
        description: 'Could not process your payment',
        variant: 'destructive',
      });
      return false;
    }
  }, [toast]);

  return {
    messages,
    isLoading,
    loading,
    sendingMessage,
    profile,
    error,
    paymentRequired,
    paymentMessage,
    simulatingTyping,
    generatingImage,
    sendMessage,
    generateAIImage,
    generateImage: generateAIImage, // Alias for backward compatibility
    initializeConversation,
    processPayment
  };
}

export default useAIMessaging;
