
import { useState, useEffect } from 'react';
import { AIMessage, AIConversation } from '@/types/ai-messages';
import { useAuth } from '@/hooks/auth/useAuth';

export interface AICompanionHookReturn {
  conversation: AIConversation;
  messages: AIMessage[];
  sendMessage: (content: string) => Promise<boolean>;
  sendingMessage: boolean;
  loadingConversation: boolean;
  error: string;
  refreshConversation: () => Promise<boolean>;
  isLoading: boolean;
  isInitialLoading: boolean;
  loadInitialMessages: () => Promise<void>;
  companion: any;
  loadCompanion: () => Promise<void>;
}

export const useAICompanion = (profileId: string): AICompanionHookReturn => {
  const [conversation, setConversation] = useState<AIConversation>({
    id: '',
    profileId: profileId,
    lastMessageAt: new Date().toISOString(),
    messagesCount: 0
  });
  
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [companion, setCompanion] = useState<any>(null);
  
  const { user } = useAuth();
  
  const loadInitialMessages = async () => {
    if (!profileId || !user) return;
    
    try {
      setIsInitialLoading(true);
      // In a real app, this would fetch messages from the API
      const mockMessages: AIMessage[] = [{
        id: 'welcome-msg',
        conversationId: conversation.id,
        content: 'Hello! How can I assist you today?',
        role: 'assistant',
        created_at: new Date().toISOString(),
      }];
      
      setMessages(mockMessages);
    } catch (err) {
      setError('Failed to load initial messages');
      console.error(err);
    } finally {
      setIsInitialLoading(false);
    }
  };
  
  const loadCompanion = async () => {
    if (!profileId) return;
    
    try {
      // In a real app, this would fetch companion data from the API
      const mockCompanion = {
        id: profileId,
        name: "AI Companion",
        avatar_url: "/default-avatar.png"
      };
      
      setCompanion(mockCompanion);
    } catch (err) {
      console.error('Failed to load companion:', err);
    }
  };
  
  // Load existing conversation or create a new one
  useEffect(() => {
    if (!profileId || !user) return;
    
    const loadConversation = async () => {
      try {
        setLoadingConversation(true);
        // In a real app, this would make an API call
        // For now, create a mock conversation
        const mockConversation: AIConversation = {
          id: `conv-${profileId}-${user.id}`,
          profileId: profileId,
          lastMessageAt: new Date().toISOString(),
          messagesCount: 0
        };
        
        setConversation(mockConversation);
        
        // Load initial messages
        await loadInitialMessages();
      } catch (err) {
        setError('Failed to load conversation');
        console.error(err);
      } finally {
        setLoadingConversation(false);
        setIsInitialLoading(false);
      }
    };
    
    loadConversation();
  }, [profileId, user]);
  
  const sendMessage = async (content: string): Promise<boolean> => {
    if (!content.trim() || !user || sendingMessage) return false;
    
    try {
      setSendingMessage(true);
      
      // Add user message to the conversation
      const userMessage: AIMessage = {
        id: `msg-${Date.now()}`,
        conversationId: conversation.id,
        content: content,
        role: 'user',
        created_at: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // In a real app, we would send this to an API
      // For now, simulate a response
      setTimeout(() => {
        const aiResponse: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          conversationId: conversation.id,
          content: `I received your message: "${content}". This is a simulated response.`,
          role: 'assistant',
          created_at: new Date().toISOString(),
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        
        // Update conversation
        setConversation(prev => ({
          ...prev,
          lastMessageAt: new Date().toISOString(),
          messagesCount: (prev.messagesCount || 0) + 2
        }));
        
        setSendingMessage(false);
      }, 1000);
      
      return true;
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
      setSendingMessage(false);
      return false;
    }
  };
  
  const refreshConversation = async (): Promise<boolean> => {
    try {
      setLoadingConversation(true);
      // In a real app, this would refresh from the API
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      setError('Failed to refresh conversation');
      return false;
    } finally {
      setLoadingConversation(false);
    }
  };
  
  return {
    conversation,
    messages,
    sendMessage,
    sendingMessage,
    loadingConversation,
    isLoading: sendingMessage || loadingConversation,
    isInitialLoading,
    error,
    refreshConversation,
    loadInitialMessages,
    companion,
    loadCompanion
  };
};

export default useAICompanion;
