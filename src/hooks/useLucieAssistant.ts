
import { useState, useCallback, useEffect, useRef } from 'react';
import { lucie } from '@/core/Lucie';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';

export interface LucieMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'confused' | 'friendly' | 'concerned';
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
  visualElements?: {
    type: 'image' | 'chart' | 'map';
    data: any;
  }[];
}

interface RouteContextSafe {
  userId: string;
  walletId?: string;
  actionType?: string;
  contentPurpose?: string;
  personalityType?: string;
  [key: string]: any;
}

export function useLucieAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<LucieMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const initializedRef = useRef(false);
  const sessionStartedRef = useRef(false);

  // Initialize with welcome message only once
  useEffect(() => {
    if (!sessionStartedRef.current && isOpen && messages.length === 0) {
      sessionStartedRef.current = true;
      
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
  }, [messages.length, isOpen]);

  // Reset the session when chat is closed
  useEffect(() => {
    if (!isOpen) {
      sessionStartedRef.current = false;
    }
  }, [isOpen]);

  // Send a message to Lucie
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsTyping(true);
    setError(null);

    try {
      // Add user message to the UI immediately for better UX
      const userMessage: LucieMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      // Provide userId for context or fallback to 'anonymous'
      const userId = user?.id || 'anonymous';

      // Use Lucie's generateContent method to get a response
      const response = await lucie.generateContent({
        prompt: content,
        type: 'text',
        nsfw: false,
        userId,
      });

      if (!response.success) {
        throw new Error("Failed to generate response");
      }

      // Determine emotion based on response content
      let emotion: LucieMessage['emotion'] = 'neutral';
      const responseText = response.text || '';
      
      if (responseText.includes('sorry') || responseText.includes('apologize')) {
        emotion = 'concerned';
      } else if (responseText.includes('great') || responseText.includes('happy')) {
        emotion = 'happy';
      } else if (responseText.includes('let me think') || responseText.includes('hmm')) {
        emotion = 'thinking';
      } else if (responseText.includes('?')) {
        emotion = 'confused';
      } else {
        emotion = 'friendly';
      }

      // Generate relevant suggested actions based on the response
      const suggestedActions = generateSuggestedActions(content, responseText);

      // Create the Lucie response message
      const lucieMessage: LucieMessage = {
        id: 'lucie-' + Date.now().toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
        emotion,
        suggestedActions
      };

      setMessages(prev => [...prev, lucieMessage]);

    } catch (err: any) {
      console.error('Error sending message to Lucie:', err);
      setError('Failed to get a response. Please try again.');
      toast({
        title: "Error",
        description: "Failed to get response from assistant.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  }, [user, toast]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const clearMessages = useCallback(() => {
    // Reset the messages list
    setMessages([]);
    sessionStartedRef.current = false; // Allow re-initialization
  }, []);

  // Helper to generate suggested actions based on context
  function generateSuggestedActions(userQuery: string, response: string): string[] {
    const lowerQuery = userQuery.toLowerCase();
    
    // Default suggestions
    const defaultSuggestions = ["Find escorts near me", "Browse creators", "Check wallet balance"];
    
    // Context-aware suggestions
    if (lowerQuery.includes('escort') || lowerQuery.includes('book')) {
      return ["View popular escorts", "Filter by service", "Show verified only"];
    }
    
    if (lowerQuery.includes('creator') || lowerQuery.includes('content')) {
      return ["Browse top creators", "See latest posts", "Subscribe"];
    }
    
    if (lowerQuery.includes('wallet') || lowerQuery.includes('pay') || lowerQuery.includes('money')) {
      return ["Check balance", "Add funds", "View transaction history"];
    }
    
    return defaultSuggestions;
  }

  return {
    messages,
    isTyping,
    isOpen,
    error,
    sendMessage,
    toggleChat,
    clearMessages
  };
}

export default useLucieAssistant;
