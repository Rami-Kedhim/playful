
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AIConversation, AIMessage, AIProfile } from '@/types/ai-profile';
import {
  getAIProfileById,
  startAIConversation,
  getAIConversationWithMessages,
  sendMessageToAI,
  processAIMessagePayment
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

  // Initialize conversation
  const initializeConversation = useCallback(async () => {
    if (!user) {
      setError('You must be logged in to use AI messaging');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let currentConversation = conversation;

      // If we have a specific conversation ID
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
      // If we have a profile ID but no conversation yet
      else if (profileId) {
        const fetchedProfile = await getAIProfileById(profileId);
        
        if (fetchedProfile) {
          setProfile(fetchedProfile);
          
          // Start or get existing conversation
          const newConversation = await startAIConversation(user.id, profileId);
          
          currentConversation = newConversation;
          setConversation(newConversation);
          
          // Fetch messages if any
          if (newConversation.messages) {
            setMessages(newConversation.messages);
          }
        }
      }

      // Check if any message requires payment
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

  // Send a message
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

      // Add user message to the list
      setMessages(prev => [...prev, result.userMessage]);

      // If payment is required
      if (result.requiresPayment && result.aiResponse) {
        setPaymentRequired(true);
        setPaymentMessage(result.aiResponse);
        setMessages(prev => [...prev, result.aiResponse as AIMessage]);
      } 
      // If AI responded normally
      else if (result.aiResponse) {
        setMessages(prev => [...prev, result.aiResponse as AIMessage]);
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
  }, [user, conversation, paymentRequired]);

  // Process payment for a message
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
        setMessages(prev => [...prev, result.aiResponse as AIMessage]);
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
  }, [user, paymentMessage]);

  return {
    loading,
    sendingMessage,
    profile,
    conversation,
    messages,
    error,
    paymentRequired,
    paymentMessage,
    initializeConversation,
    sendMessage,
    processPayment
  };
};
