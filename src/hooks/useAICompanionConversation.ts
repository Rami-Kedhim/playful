
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export interface CompanionProfile {
  id: string;
  name: string;
  avatarUrl: string;
  personality: string;
  background: string;
  interests: string[];
  speechStyle: string;
  emotion?: string;
}

export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  emotion?: string | null;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
}

export interface UserContext {
  name?: string;
  interests?: string[];
  recentInteractions?: string;
  relationshipStatus?: string;
}

export interface UseAICompanionConversationProps {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export function useAICompanionConversation({ companionId, initialMessages = [] }: UseAICompanionConversationProps) {
  const [messages, setMessages] = useState<CompanionMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [companion, setCompanion] = useState<CompanionProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch companion profile
  useEffect(() => {
    const fetchCompanionProfile = async () => {
      try {
        // In a real app, this would fetch from the database
        // For demo purposes, we'll use a mock response
        const mockCompanion: CompanionProfile = {
          id: companionId,
          name: "Sophia",
          avatarUrl: "/sophia-avatar.png",
          personality: "Friendly, outgoing, empathetic",
          background: "Virtual companion specializing in meaningful conversations",
          interests: ["art", "psychology", "travel", "literature"],
          speechStyle: "Articulate with a touch of playfulness"
        };
        
        setCompanion(mockCompanion);
        
        // Add welcome message if no messages exist
        if (messages.length === 0) {
          const welcomeMessage: CompanionMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: `Hi there! I'm ${mockCompanion.name}. It's lovely to meet you! How are you doing today?`,
            timestamp: new Date(),
            emotion: 'happy',
            suggestedActions: [
              "Tell me about yourself",
              "What do you like to do for fun?",
              "How's your day going?"
            ]
          };
          
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Error fetching companion:', error);
        toast({
          title: 'Error',
          description: 'Failed to load companion profile',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanionProfile();
  }, [companionId, messages.length, toast]);
  
  // Build user context based on authenticated user info
  const getUserContext = useCallback((): UserContext => {
    if (!user) return {};
    
    // In a real app, you would fetch relationship status and interaction history
    return {
      name: user.username,
      interests: user.user_metadata?.interests || [],
      relationshipStatus: "friendly", // This would come from a database
      recentInteractions: "You discussed art and travel destinations recently" // This would be derived from chat history
    };
  }, [user]);
  
  // Format chat history for the API
  const formatChatHistory = useCallback(() => {
    return messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }, [messages]);

  // Send a message to the companion
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !companion) return;
    
    // Add user message to UI immediately
    const userMessage: CompanionMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Get user context and chat history
      const userContext = getUserContext();
      const chatHistory = formatChatHistory();
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-companion-chat', {
        body: {
          message: content,
          userContext,
          chatHistory,
          companionProfile: companion
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Add companion's response to the UI
      const companionResponse: CompanionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        emotion: data.emotions,
        suggestedActions: data.suggestedActions || [],
        links: data.links || []
      };
      
      setMessages(prev => [...prev, companionResponse]);
    } catch (error) {
      console.error('Error sending message to companion:', error);
      
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive'
      });
      
      // Add error message
      const errorMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
        emotion: "confused"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [companion, getUserContext, formatChatHistory, toast]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
  return {
    messages,
    isTyping,
    isLoading,
    companion,
    sendMessage,
    handleSuggestedActionClick
  };
}

export default useAICompanionConversation;
