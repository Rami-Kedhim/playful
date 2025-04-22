import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth/useAuthContext';
import { AIConversation, AIMessage } from '@/types/ai-chat';
import { AIProfile } from '@/types/ai-profile';
import { aiMessagesService } from '@/services/ai/aiMessagesService';
import { aiConversationsService } from '@/services/ai/aiConversationsService';

interface UseAIChatProps {
  profileId: string;
  initialMessages?: AIMessage[];
  onMessageSent?: (message: AIMessage) => void;
  onMessageReceived?: (message: AIMessage) => void;
}

export const useAIChat = ({
  profileId,
  initialMessages = [],
  onMessageSent,
  onMessageReceived
}: UseAIChatProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<AIConversation | null>(null);
  
  const loadMessages = useCallback(async () => {
    if (!profileId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await aiMessagesService.fetchMessages(profileId);
      
      if (result.messages) {
        setMessages(result.messages);
      }
      
      if (result.conversation) {
        setConversation(result.conversation);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);
  
  const sendUserMessage = async (content: string) => {
    if (!profileId || !content.trim()) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const newMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
        senderId: user?.id || '',
        receiverId: profileId,
        isAI: false,
        status: 'sent'
      };
      
      setMessages(prev => [...prev, newMessage]);
      if (onMessageSent) onMessageSent(newMessage);
      
      const response = await aiMessagesService.sendMessage({
        content,
        profileId
      });
      
      if (response && response.messages) {
        setMessages(response.messages);
        
        const aiResponse = response.messages.find(msg => 
          msg.isAI && !messages.some(existingMsg => existingMsg.id === msg.id)
        );
        
        if (aiResponse && onMessageReceived) {
          onMessageReceived(aiResponse);
        }
      }
      
      return response;
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const markMessagesAsRead = useCallback(async () => {
    const unreadMessages = messages.filter(msg => 
      msg.isAI && !(msg.has_read || msg.status === 'read')
    );
    
    if (unreadMessages.length === 0) return;
    
    try {
      setMessages(prev => 
        prev.map(msg => 
          msg.isAI && !(msg.has_read || msg.status === 'read')
            ? { ...msg, has_read: true, status: 'read' }
            : msg
        )
      );
      
      // TODO: Add API call to mark messages as read on server
      // await markAsRead(unreadMessages.map(msg => msg.id));
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  }, [messages]);
  
  return {
    messages,
    loading,
    error,
    conversation,
    sendMessage: sendUserMessage,
    loadMessages,
    markAsRead: markMessagesAsRead
  };
};

export default useAIChat;
