
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AIConversation, AIMessage, AIProfile } from '@/types/ai-profile';
import {
  getAIProfileById,
  startAIConversation,
  getAIConversationWithMessages
} from '@/services/ai/aiProfileService';
import { toast } from '@/components/ui/use-toast';

export const useAIConversation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<AIProfile | null>(null);
  const [conversation, setConversation] = useState<AIConversation | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<AIMessage | null>(null);

  const initializeConversation = useCallback(async (profileId?: string, conversationId?: string) => {
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
  }, [user, conversation]);

  return {
    loading,
    profile,
    conversation,
    messages,
    error,
    paymentRequired,
    paymentMessage,
    setMessages,
    setError,
    setPaymentRequired,
    setPaymentMessage,
    initializeConversation,
  };
};
