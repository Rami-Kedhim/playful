
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { CompanionMessage, CompanionProfile, UserContext, AICompanionResponse } from './types';

export function useAICompanionMessages() {
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Format chat history for the API
  const formatChatHistory = useCallback(() => {
    return messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }, [messages]);

  // Send a message to the companion
  const sendMessage = useCallback(async (
    content: string,
    companion: CompanionProfile | null,
    userContext: UserContext
  ) => {
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
  }, [formatChatHistory, toast]);

  return {
    messages,
    setMessages,
    isTyping,
    sendMessage
  };
}
