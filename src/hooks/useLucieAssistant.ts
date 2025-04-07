
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface LucieMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
}

export interface UserContext {
  name?: string;
  role?: string;
  recentActivity?: string;
  interests?: string[];
}

export function useLucieAssistant() {
  const [messages, setMessages] = useState<LucieMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: LucieMessage = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: "Hi there! I'm Lucie, your personal UberEscorts assistant. How can I help you today?",
        timestamp: new Date(),
        suggestedActions: [
          "Find escorts near me",
          "Browse creator content",
          "Check my wallet"
        ]
      };
      
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);
  
  // Build user context based on authenticated user info
  const getUserContext = useCallback((): UserContext => {
    if (!user) return {};
    
    return {
      name: user.username,
      role: user.role,
      interests: user.user_metadata?.interests || []
    };
  }, [user]);
  
  // Format chat history for the API
  const formatChatHistory = useCallback(() => {
    return messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }, [messages]);

  // Send a message to Lucie
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to UI immediately
    const userMessage: LucieMessage = {
      id: Date.now().toString(),
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
      const { data, error } = await supabase.functions.invoke('lucie-chat', {
        body: {
          message: content,
          userContext,
          chatHistory
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Add Lucie's response to the UI
      const lucieResponse: LucieMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        suggestedActions: data.suggestedActions || [],
        links: data.links || []
      };
      
      setMessages(prev => [...prev, lucieResponse]);
    } catch (error) {
      console.error('Error sending message to Lucie:', error);
      
      toast({
        title: 'Error',
        description: 'Failed to get a response from Lucie. Please try again.',
        variant: 'destructive'
      });
      
      // Add error message
      const errorMessage: LucieMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [getUserContext, formatChatHistory, toast]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
  // Toggle the assistant open/closed
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
    handleSuggestedActionClick
  };
}

export default useLucieAssistant;
