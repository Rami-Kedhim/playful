
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/services/ai/aiImageService';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';

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

// Brain Hub message processing interface
interface BrainHubMessageContext {
  userId?: string;
  profileId?: string;
  conversationHistory: Array<{
    role: string;
    content: string;
  }>;
  userPreferences?: {
    messaging_style?: string;
    content_length?: 'short' | 'medium' | 'long';
    nsfw_allowed?: boolean;
  };
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
  const [brainHubConnected, setBrainHubConnected] = useState<boolean>(false);
  const { toast } = useToast();

  // Try to connect to Brain Hub
  const connectToBrainHub = useCallback(() => {
    try {
      // Attempt to connect to Brain Hub for messaging intelligence
      const connected = brainHub.processRequest({
        type: "register_capabilities",
        data: {
          componentId: "ai-messaging",
          capabilities: [
            "message_enhancement",
            "personality_adaptation",
            "content_moderation"
          ]
        }
      }).success;
      
      setBrainHubConnected(connected);
      return connected;
    } catch (err) {
      console.warn("Could not connect to Brain Hub for message enhancement:", err);
      setBrainHubConnected(false);
      return false;
    }
  }, []);

  // Initialize conversation
  const initializeConversation = useCallback(async () => {
    try {
      setLoading(true);
      // Connect to Brain Hub
      connectToBrainHub();
      
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
      
      let welcomeMessage = 'Hello! How can I assist you today?';
      
      // Try to enhance welcome message with Brain Hub
      if (brainHubConnected) {
        try {
          const brainHubResponse = brainHub.processRequest({
            type: "ai_welcome_message",
            data: {
              profileId: options?.profileId,
              personalityType: 'friendly',
            }
          });
          
          if (brainHubResponse.success && brainHubResponse.data?.message) {
            welcomeMessage = brainHubResponse.data.message;
          }
        } catch (err) {
          console.warn("Could not enhance welcome message:", err);
        }
      }
      
      // Set initial welcome message
      const welcomeMessageObj: AIMessage = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
        is_ai: true,
        created_at: new Date()
      };
      
      setMessages([welcomeMessageObj]);
    } catch (err) {
      setError('Failed to initialize conversation');
    } finally {
      setLoading(false);
    }
  }, [options?.profileId, connectToBrainHub, brainHubConnected]);

  // Process message through Brain Hub for enhancement
  const processMessageWithBrainHub = useCallback((content: string, messageContext: BrainHubMessageContext): string => {
    if (!brainHubConnected) return content;
    
    try {
      const brainHubResponse = brainHub.processRequest({
        type: "enhance_ai_message",
        data: messageContext
      });
      
      if (brainHubResponse.success && brainHubResponse.data?.enhancedContent) {
        return brainHubResponse.data.enhancedContent;
      }
    } catch (err) {
      console.warn("Failed to enhance message with Brain Hub:", err);
    }
    
    return content;
  }, [brainHubConnected]);

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

      // Prepare conversation history for Brain Hub
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add current user message
      conversationHistory.push({
        role: 'user',
        content
      });
      
      // Process response through Brain Hub if possible
      let responseContent = `This is a response to: ${content}`;
      
      if (brainHubConnected) {
        responseContent = processMessageWithBrainHub(responseContent, {
          userId: 'current-user',
          profileId: options?.profileId,
          conversationHistory,
          userPreferences: {
            messaging_style: 'conversational',
            content_length: 'medium',
            nsfw_allowed: false
          }
        });
      }

      // Add AI response to the chat
      const aiMessage: AIMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: responseContent,
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
  }, [messages, toast, options, brainHubConnected, processMessageWithBrainHub]);

  // Generate an image using AI
  const generateAIImage = useCallback(async (prompt: string) => {
    try {
      setGeneratingImage(true);
      
      // Process prompt through Brain Hub for enhancement if available
      let enhancedPrompt = prompt;
      
      if (brainHubConnected) {
        try {
          const brainHubResponse = brainHub.processRequest({
            type: "enhance_image_prompt",
            data: {
              prompt,
              style: "realistic"
            }
          });
          
          if (brainHubResponse.success && brainHubResponse.data?.enhancedPrompt) {
            enhancedPrompt = brainHubResponse.data.enhancedPrompt;
          }
        } catch (err) {
          console.warn("Failed to enhance image prompt:", err);
        }
      }
      
      const imageUrl = await generateImage(enhancedPrompt);
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
  }, [toast, brainHubConnected]);

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
    brainHubConnected,
    sendMessage,
    generateAIImage,
    generateImage: generateAIImage, // Alias for backward compatibility
    initializeConversation,
    processPayment,
    connectToBrainHub
  };
}

export default useAIMessaging;
