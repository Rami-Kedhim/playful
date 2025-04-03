import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AIConversation, AIMessage, AIProfile } from '@/types/ai-profile';
import {
  getAIProfileById,
  startAIConversation,
  getAIConversationWithMessages,
  sendMessageToAI,
  processAIMessagePayment,
  generateAIImage
} from '@/services/ai/aiProfileService';
import { toast } from '@/components/ui/use-toast';

interface UseAIMessagingProps {
  profileId?: string;
  conversationId?: string;
}

export const useAIMessaging = ({ profileId, conversationId }: UseAIMessagingProps = {}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [profile, setProfile] = useState<AIProfile | null>(null);
  const [conversation, setConversation] = useState<AIConversation | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<AIMessage | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [simulatingTyping, setSimulatingTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateResponseTime = useCallback((messageLength: number, aiProfile: AIProfile | null) => {
    if (!aiProfile) return 3000;
    
    const baseTime = aiProfile.delayed_response_min || 2000;
    const variableTime = (aiProfile.delayed_response_max || 5000) - baseTime;
    
    const lengthFactor = Math.min(1, messageLength / 300);
    let personalityFactor = 0.5;
    
    if (aiProfile.personality) {
      switch (aiProfile.personality.type) {
        case 'flirty': personalityFactor = 0.7; break;
        case 'shy': personalityFactor = 0.9; break;
        case 'dominant': personalityFactor = 0.4; break;
        case 'playful': personalityFactor = 0.6; break;
        case 'professional': personalityFactor = 0.5; break;
      }
    }
    
    return baseTime + (variableTime * lengthFactor * personalityFactor);
  }, []);

  const initializeConversation = useCallback(async () => {
    if (!user) {
      setError('You must be logged in to use AI messaging');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let currentConversation = conversation;

      if (conversationId) {
        const fetchedConversation = await getAIConversationWithMessages(conversationId);
        
        if (fetchedConversation) {
          currentConversation = fetchedConversation;
          setConversation(fetchedConversation);
          setMessages(fetchedConversation.messages || []);
          
          if (fetchedConversation.ai_profile) {
            setProfile(fetchedConversation.ai_profile);
          } else if (profileId) {
            const fetchedProfile = await getAIProfileById(profileId);
            if (fetchedProfile) {
              setProfile(fetchedProfile);
            }
          }
        }
      } 
      else if (profileId) {
        const fetchedProfile = await getAIProfileById(profileId);
        
        if (fetchedProfile) {
          setProfile(fetchedProfile);
          
          const newConversation = await startAIConversation(user.id, profileId);
          
          currentConversation = newConversation;
          setConversation(newConversation);
          
          if (newConversation.messages) {
            setMessages(newConversation.messages);
          }
        }
      }

      if (currentConversation?.messages?.some(msg => msg.requires_payment && msg.payment_status === 'pending')) {
        setPaymentRequired(true);
        setPaymentMessage(currentConversation.messages.find(msg => 
          msg.requires_payment && msg.payment_status === 'pending'
        ) || null);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while initializing the conversation');
      toast({
        title: 'Error',
        description: err.message || 'Failed to initialize conversation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, profileId, conversationId, conversation]);

  const simulateTyping = useCallback((message: AIMessage, callback: () => void) => {
    if (!profile) {
      callback();
      return;
    }
    
    setSimulatingTyping(true);
    
    const typingTime = calculateResponseTime(message.content.length, profile);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setSimulatingTyping(false);
      callback();
    }, typingTime);
    
  }, [profile, calculateResponseTime]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!user || !conversation) {
      setError('Cannot send message: no active conversation');
      return;
    }

    if (paymentRequired) {
      toast({
        title: 'Payment Required',
        description: 'You need to purchase Lucoins to continue this conversation',
        variant: 'destructive',
      });
      return;
    }

    setSendingMessage(true);
    setError(null);

    try {
      const result = await sendMessageToAI(conversation.id, user.id, content);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setMessages(prev => [...prev, result.userMessage]);

      if (result.requiresPayment && result.aiResponse) {
        setPaymentRequired(true);
        setPaymentMessage(result.aiResponse);
        setMessages(prev => [...prev, result.aiResponse as AIMessage]);
      } 
      else if (result.aiResponse) {
        simulateTyping(result.aiResponse, () => {
          setMessages(prev => [...prev, result.aiResponse as AIMessage]);
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      toast({
        title: 'Error',
        description: err.message || 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSendingMessage(false);
    }
  }, [user, conversation, paymentRequired, simulateTyping]);

  const generateImage = useCallback(async (prompt: string) => {
    if (!user || !profile) {
      setError('Cannot generate image: no active profile');
      return null;
    }
    
    setGeneratingImage(true);
    setError(null);
    
    try {
      const result = await generateAIImage(user.id, prompt, profile.id);
      
      if (result.error) {
        if (result.requiresPayment) {
          toast({
            title: 'Payment Required',
            description: `You need ${result.price || 10} Lucoins to generate this image`,
            variant: 'destructive',
          });
        } else {
          throw new Error(result.error);
        }
        return null;
      }
      
      return result.imageUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
      toast({
        title: 'Error',
        description: err.message || 'Failed to generate image',
        variant: 'destructive',
      });
      return null;
    } finally {
      setGeneratingImage(false);
    }
  }, [user, profile]);

  const processPayment = useCallback(async () => {
    if (!user || !paymentMessage) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await processAIMessagePayment(paymentMessage.id, user.id);
      
      if (!result.success) {
        throw new Error(result.error || 'Payment processing failed');
      }

      setPaymentRequired(false);
      setPaymentMessage(null);

      if (result.aiResponse) {
        simulateTyping(result.aiResponse, () => {
          setMessages(prev => [...prev, result.aiResponse as AIMessage]);
        });
      }

      toast({
        title: 'Payment Successful',
        description: 'Your Lucoins have been used to continue the conversation',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      toast({
        title: 'Payment Failed',
        description: err.message || 'Failed to process payment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, paymentMessage, simulateTyping]);

  return {
    loading,
    sendingMessage,
    profile,
    conversation,
    messages,
    error,
    paymentRequired,
    paymentMessage,
    simulatingTyping,
    generatingImage,
    initializeConversation,
    sendMessage,
    processPayment,
    generateImage
  };
};
