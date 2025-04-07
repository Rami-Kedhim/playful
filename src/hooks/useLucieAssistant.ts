
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
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [apiBackoffTime, setApiBackoffTime] = useState(60000); // Start with 1 minute
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
    // Smart fallback responses based on keywords in the user message
    const lowercaseMsg = userMessage.toLowerCase();
    
    // Predefined fallback responses for different topics
    const fallbackResponses = {
      profile: {
        content: "While I can't access my full capabilities right now, I can help you browse profiles. Would you like to see popular profiles or search by specific criteria?",
        suggestedActions: ["Popular profiles", "Search by location", "Browse newest profiles"],
        emotion: "helpful"
      },
      content: {
        content: "I'm having trouble accessing my AI systems, but I can still help you find content. Would you like to see trending content or browse by category?",
        suggestedActions: ["Trending content", "Premium content", "Creator spotlight"],
        emotion: "friendly"
      },
      payment: {
        content: "Though I'm experiencing some technical issues, I can direct you to payment and wallet information. What would you like to know about?",
        suggestedActions: ["Check wallet balance", "Add funds", "Subscription info"],
        emotion: "professional"
      },
      help: {
        content: "I'm currently operating with limited capabilities, but I can still guide you to help resources. What kind of assistance do you need?",
        suggestedActions: ["Contact support", "FAQs", "Account issues"],
        emotion: "supportive"
      },
      default: {
        content: "I apologize, but I'm currently operating with limited capabilities due to high demand. Can I help you with something from these options instead?",
        suggestedActions: ["Browse profiles", "Check account", "View content"],
        emotion: "apologetic"
      }
    };
    
    // Determine which fallback to use based on message content
    let responseType = 'default';
    
    if (lowercaseMsg.match(/profile|escort|model|person|girl|woman|man|guy/i)) {
      responseType = 'profile';
    } else if (lowercaseMsg.match(/content|video|photo|picture|image|watch|view/i)) {
      responseType = 'content';
    } else if (lowercaseMsg.match(/pay|wallet|money|coin|lucoin|credit|fund|subscription/i)) {
      responseType = 'payment';
    } else if (lowercaseMsg.match(/help|support|issue|problem|question|how|why/i)) {
      responseType = 'help';
    }
    
    const response = fallbackResponses[responseType];
    
    return {
      id: 'fallback-' + Date.now(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      suggestedActions: response.suggestedActions,
      emotion: response.emotion
    };
  }, []);

  // Check if we should retry the API based on time passed
  const shouldRetryApi = useCallback(() => {
    if (apiAvailable) return true;
    
    if (!lastRequestTime) return false;
    
    const timeSinceLastRequest = Date.now() - lastRequestTime;
    return timeSinceLastRequest > apiBackoffTime;
  }, [apiAvailable, lastRequestTime, apiBackoffTime]);

  // Reset API availability after backoff time
  useEffect(() => {
    if (!apiAvailable && shouldRetryApi()) {
      console.log(`Attempting to reset API availability after ${apiBackoffTime / 1000} seconds`);
      setApiAvailable(true);
      setRetryCount(0);
    }
  }, [apiAvailable, shouldRetryApi, apiBackoffTime]);

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
      // Check if we should try the API
      if (!apiAvailable && !shouldRetryApi()) {
        console.log('API marked as unavailable, using fallback response');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Brief delay for typing effect
        const fallbackMessage = getFallbackResponse(content);
        setMessages(prev => [...prev, fallbackMessage]);
        setIsTyping(false);
        return;
      }

      setLastRequestTime(Date.now());

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
      
      if (data.error || data.errorCode) {
        console.log('Lucie chat function returned error:', data.error || data.errorCode);
        
        // Handle quota exceeded and other error types
        if (data.errorCode === 'QUOTA_EXCEEDED' || data.error?.includes('quota')) {
          setApiAvailable(false);
          setApiBackoffTime(prev => Math.min(prev * 2, 30 * 60 * 1000)); // Exponential backoff, max 30 minutes
          console.log(`API quota exceeded, backing off for ${apiBackoffTime / 1000} seconds`);
        }
        
        // Add the error response to messages, it already contains appropriate text
        const errorResponse: LucieMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date(),
          suggestedActions: data.suggestedActions || [],
          links: data.links || [],
          emotion: 'apologetic'
        };
        
        setMessages(prev => [...prev, errorResponse]);
      } else if (data) {
        // Add Lucie's normal response to the UI
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
        
        // Reset backoff time on successful request
        if (!apiAvailable) {
          setApiAvailable(true);
          setApiBackoffTime(60000); // Reset to 1 minute
        }
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
      setRetryCount(prev => prev + 1);
      
      if (retryCount >= 2) {
        setApiAvailable(false);
        setApiBackoffTime(prev => Math.min(prev * 2, 30 * 60 * 1000)); // Exponential backoff
      }
    } finally {
      setIsTyping(false);
    }
  }, [apiAvailable, shouldRetryApi, formatChatHistory, getFallbackResponse, getUserContext, retryCount, toast, apiBackoffTime, lastRequestTime]);
  
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
