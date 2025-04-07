
import { useState, useCallback, useEffect } from 'react';
import { AIMessage, AIConversation, AIProfile } from '@/types/ai-messages';
import { useAuth } from '@/hooks/auth/useAuth';

export interface AICompanionHookReturn {
  conversation: AIConversation;
  messages: AIMessage[];
  sendMessage: (content: string) => Promise<boolean>;
  sendingMessage: boolean;
  loadingConversation: boolean;
  error: string;
  refreshConversation: () => Promise<AIConversation>;
  companion?: AIProfile;
  loadCompanion: (id: string) => Promise<AIProfile | null>;
  isLoading: boolean;
  loadInitialMessages: () => Promise<AIMessage[]>;
  isInitialLoading: boolean;
}

export function useAICompanion(profileId: string): AICompanionHookReturn {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<AIConversation>({
    id: '',
    profileId: profileId,
    lastMessageAt: new Date(),
    messagesCount: 0,
    messages: [],
    ai_profile: {
      id: profileId,
      name: 'AI Assistant',
      personality: {
        type: 'friendly'
      }
    }
  });
  
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [error, setError] = useState('');
  const [companion, setCompanion] = useState<AIProfile | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Load conversation on mount
  useEffect(() => {
    const loadConversation = async () => {
      setLoadingConversation(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create a mock conversation
        const mockConversation: AIConversation = {
          id: `conv-${Date.now()}`,
          profileId: profileId,
          user_id: user?.id,
          ai_profile_id: profileId,
          lastMessageAt: new Date(),
          messagesCount: 0,
          created_at: new Date(),
          updated_at: new Date(),
          messages: [],
          ai_profile: {
            id: profileId,
            name: 'AI Assistant',
            personality: {
              type: 'friendly'
            }
          }
        };
        
        setConversation(mockConversation);
        await loadInitialMessages();
      } catch (err) {
        setError('Failed to load conversation');
        console.error(err);
      } finally {
        setLoadingConversation(false);
      }
    };
    
    if (profileId) {
      loadConversation();
    }
  }, [profileId, user?.id]);
  
  // Load initial messages
  const loadInitialMessages = async (): Promise<AIMessage[]> => {
    setIsInitialLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Create a welcome message
      const welcomeMessage: AIMessage = {
        id: `msg-welcome-${Date.now()}`,
        conversation_id: conversation.id,
        role: 'assistant',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
        sender_id: profileId,
      };
      
      setMessages([welcomeMessage]);
      return [welcomeMessage];
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
      return [];
    } finally {
      setIsInitialLoading(false);
    }
  };
  
  // Send a message
  const sendMessage = async (content: string): Promise<boolean> => {
    if (!content.trim() || !user) return false;
    
    setSendingMessage(true);
    try {
      // Create user message
      const userMessage: AIMessage = {
        id: `msg-user-${Date.now()}`,
        conversation_id: conversation.id,
        role: 'user',
        content,
        timestamp: new Date(),
        sender_id: user.id,
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create AI response
      const aiResponse: AIMessage = {
        id: `msg-ai-${Date.now()}`,
        conversation_id: conversation.id,
        role: 'assistant',
        content: `I received your message: "${content}". This is a simulated response.`,
        timestamp: new Date(),
        sender_id: profileId,
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Update conversation
      setConversation(prev => ({
        ...prev,
        lastMessageAt: new Date(),
        messagesCount: prev.messagesCount ? prev.messagesCount + 2 : 2
      }));
      
      return true;
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
      return false;
    } finally {
      setSendingMessage(false);
    }
  };
  
  // Refresh conversation
  const refreshConversation = async (): Promise<AIConversation> => {
    setLoadingConversation(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return conversation;
    } catch (err) {
      setError('Failed to refresh conversation');
      console.error(err);
      return conversation;
    } finally {
      setLoadingConversation(false);
    }
  };
  
  // Load companion
  const loadCompanion = async (id: string = profileId): Promise<AIProfile | null> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock companion
      const mockCompanion: AIProfile = {
        id,
        name: 'AI Companion',
        personality: {
          type: 'friendly'
        }
      };
      
      setCompanion(mockCompanion);
      return mockCompanion;
    } catch (err) {
      setError('Failed to load companion');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    conversation,
    messages,
    sendMessage,
    sendingMessage,
    loadingConversation,
    error,
    refreshConversation,
    companion,
    loadCompanion,
    isLoading,
    loadInitialMessages,
    isInitialLoading
  };
}

export default useAICompanion;
