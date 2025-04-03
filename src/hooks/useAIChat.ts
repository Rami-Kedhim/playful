
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AIMessage, AIConversation } from '@/types/ai-profile';
import { toast } from '@/components/ui/use-toast';
import { 
  startAIConversation, 
  getAIConversationWithMessages 
} from '@/services/ai/aiConversationsService';
import { 
  sendMessageToAI,
  markMessageAsRead
} from '@/services/ai/aiMessagesService';

export const useAIChat = (aiProfileId: string) => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<AIConversation | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize or fetch existing conversation
  useEffect(() => {
    const initConversation = async () => {
      if (!user || !aiProfileId) return;
      
      setLoadingConversation(true);
      setError(null);
      
      try {
        const conversationData = await startAIConversation(user.id, aiProfileId);
        if (conversationData) {
          setConversation(conversationData);
          
          // If the conversation exists and has an ID, fetch messages
          if (conversationData.id) {
            const fullConversation = await getAIConversationWithMessages(conversationData.id);
            if (fullConversation) {
              setMessages(fullConversation.messages || []);
            }
          }
        }
      } catch (err: any) {
        console.error("Error initializing AI conversation:", err);
        setError('Failed to start conversation with AI profile');
        toast({
          title: "Conversation Error",
          description: "Couldn't connect with the AI profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingConversation(false);
      }
    };
    
    initConversation();
  }, [user, aiProfileId]);

  // Send a message and get AI response
  const sendMessage = useCallback(async (content: string) => {
    if (!user || !conversation?.id || !content.trim() || sendingMessage) {
      return false;
    }
    
    setSendingMessage(true);
    setError(null);
    
    try {
      const aiResponse = await sendMessageToAI(
        user.id,
        conversation.id,
        content,
        aiProfileId
      );
      
      // Refresh the messages list
      if (conversation.id) {
        const updatedConversation = await getAIConversationWithMessages(conversation.id);
        if (updatedConversation) {
          setMessages(updatedConversation.messages || []);
        }
      }
      
      return true;
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError('Failed to send message');
      toast({
        title: "Message failed",
        description: "Your message couldn't be delivered. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setSendingMessage(false);
    }
  }, [user, conversation, aiProfileId, sendingMessage]);
  
  // Mark messages as read when user opens conversation
  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!messages.length) return;
      
      const unreadMessages = messages.filter(msg => msg.is_ai && !msg.has_read);
      
      for (const message of unreadMessages) {
        await markMessageAsRead(message.id);
      }
    };
    
    if (user && conversation) {
      markMessagesAsRead();
    }
  }, [user, conversation, messages]);
  
  // Function to refresh the conversation after unlocking a message
  const refreshConversation = useCallback(async () => {
    if (!conversation?.id) return;
    
    try {
      const updatedConversation = await getAIConversationWithMessages(conversation.id);
      if (updatedConversation) {
        setMessages(updatedConversation.messages || []);
      }
    } catch (err) {
      console.error("Error refreshing conversation:", err);
    }
  }, [conversation]);

  return {
    conversation,
    messages,
    sendMessage,
    sendingMessage,
    loadingConversation,
    error,
    refreshConversation
  };
};
