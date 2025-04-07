
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
  emotion?: string;
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
  const [apiAvailable, setApiAvailable] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
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
        ],
        emotion: "friendly"
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

  // Get a fallback response when the API is unavailable
  const getFallbackResponse = useCallback((userMessage: string): LucieMessage => {
    const genericResponses = [
      {
        content: "I'm sorry, I'm currently experiencing connection issues. Please try again later.",
        suggestedActions: ["Try again", "Contact support", "Browse escort profiles"],
        emotion: "apologetic"
      },
      {
        content: "I apologize for the inconvenience. Our AI service is temporarily unavailable. In the meantime, you can browse our top profiles.",
        suggestedActions: ["Show top profiles", "Send feedback", "Check my account"],
        emotion: "concerned"
      },
      {
        content: "Sorry about that! Our servers are a bit busy right now. Would you like to check out some of our featured content instead?",
        suggestedActions: ["See featured content", "Browse new escorts", "Help with something else"],
        emotion: "friendly"
      }
    ];

    // Simple keyword detection for better fallback responses
    let responseIndex = 0;
    const lowercaseMsg = userMessage.toLowerCase();
    
    if (lowercaseMsg.includes('escort') || lowercaseMsg.includes('profile') || lowercaseMsg.includes('find')) {
      responseIndex = 0;
    } else if (lowercaseMsg.includes('content') || lowercaseMsg.includes('video') || lowercaseMsg.includes('photo')) {
      responseIndex = 1;
    } else if (lowercaseMsg.includes('account') || lowercaseMsg.includes('wallet') || lowercaseMsg.includes('lucoin')) {
      responseIndex = 2;
    }

    const response = genericResponses[responseIndex];
    
    return {
      id: 'fallback-' + Date.now(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      suggestedActions: response.suggestedActions,
      emotion: response.emotion
    };
  }, []);

  // Retry mechanism for API calls
  const resetApiStatus = useCallback(() => {
    // After 5 minutes, try the API again
    const timeout = setTimeout(() => {
      console.log('Resetting API availability status');
      setApiAvailable(true);
      setRetryCount(0);
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearTimeout(timeout);
  }, []);

  // Effect to reset API status periodically
  useEffect(() => {
    if (!apiAvailable && retryCount < 3) {
      return resetApiStatus();
    }
  }, [apiAvailable, retryCount, resetApiStatus]);

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
      // If API was previously marked as unavailable, delay a bit and use fallback
      if (!apiAvailable) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const fallbackMessage = getFallbackResponse(content);
        setMessages(prev => [...prev, fallbackMessage]);
        setIsTyping(false);
        return;
      }

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
        console.error('Error invoking Lucie chat function:', error);
        throw new Error(error.message);
      }
      
      if (data && data.error) {
        console.error('Lucie chat function returned error:', data.error);
        
        // If there's a quota error, mark API as unavailable
        if (data.error.includes('quota') || data.error.includes('OpenAI API quota exceeded')) {
          setApiAvailable(false);
          setRetryCount(prev => prev + 1);
          console.log('OpenAI API quota exceeded, using fallback responses');
          resetApiStatus();
        }
        
        // Use fallback response
        const fallbackMessage = getFallbackResponse(content);
        setMessages(prev => [...prev, fallbackMessage]);
      } else if (data) {
        // Add Lucie's response to the UI
        const lucieResponse: LucieMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date(),
          suggestedActions: data.suggestedActions || [],
          links: data.links || [],
          emotion: data.emotion || 'neutral'
        };
        
        setMessages(prev => [...prev, lucieResponse]);
      }
    } catch (error: any) {
      console.error('Error sending message to Lucie:', error);
      
      toast({
        title: 'Connection Issue',
        description: 'Sorry, I had trouble connecting. Please try again.',
        variant: 'destructive'
      });
      
      // Use fallback response
      const fallbackMessage = getFallbackResponse(content);
      setMessages(prev => [...prev, fallbackMessage]);
      
      // Mark API as potentially unavailable after consecutive errors
      if (retryCount >= 2) {
        setApiAvailable(false);
        resetApiStatus();
      } else {
        setRetryCount(prev => prev + 1);
      }
    } finally {
      setIsTyping(false);
    }
  }, [apiAvailable, formatChatHistory, getFallbackResponse, getUserContext, resetApiStatus, retryCount, toast]);
  
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
