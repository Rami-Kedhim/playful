
import { useState, useEffect, useCallback } from 'react';
import { AIMessage, AIConversation } from '@/types/ai-profile';

interface AIMessageInput {
  content: string;
  attachments?: { type: string, url: string }[];
}

export const useAIChat = (profileId: string) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [conversation, setConversation] = useState<AIConversation | null>(null);

  // Fetch conversation history
  const fetchConversation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockConversation: AIConversation = {
        id: `conv-${Date.now()}`,
        profileId,
        userId: 'current-user-id',
        messages: [
          {
            id: '1',
            content: 'Hello! How can I assist you today?',
            sender: profileId,
            isAI: true,
            timestamp: new Date().toISOString(),
            role: 'assistant',
            has_read: true
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setConversation(mockConversation);
      setMessages(mockConversation.messages);
      
      return mockConversation;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch conversation');
      setError(error);
      console.error('Error fetching conversation:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [profileId]);
  
  // Send message to AI
  const sendMessage = useCallback(async (messageInput: AIMessageInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create user message
      const userMessage: AIMessage = {
        id: `msg-${Date.now()}`,
        content: messageInput.content,
        sender: 'user-id',
        isAI: false,
        timestamp: new Date().toISOString(),
        attachments: messageInput.attachments,
        role: 'user',
        has_read: true
      };
      
      // Add user message to state
      setMessages(prev => [...prev, userMessage]);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create AI response
      const aiResponse: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        content: `This is an AI response to "${messageInput.content}"`,
        sender: profileId,
        isAI: true,
        timestamp: new Date().toISOString(),
        role: 'assistant',
        has_read: true
      };
      
      // Add AI response to state
      setMessages(prev => [...prev, aiResponse]);
      
      return aiResponse;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to send message');
      setError(error);
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [profileId]);
  
  // Mark messages as read
  const markAsRead = useCallback(async () => {
    try {
      const unreadMessages = messages.filter(msg => msg.isAI && !msg.has_read);
      
      if (unreadMessages.length > 0) {
        // In a real app, this would make an API call to update the database
        setMessages(prev => 
          prev.map(msg => 
            msg.isAI && !msg.has_read ? { ...msg, has_read: true } : msg
          )
        );
      }
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  }, [messages]);

  // Initialize conversation on mount
  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  return {
    messages,
    isLoading,
    error,
    conversation,
    fetchConversation,
    sendMessage,
    markAsRead
  };
};

export default useAIChat;
