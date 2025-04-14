
import { useState, useEffect } from 'react';
import { useAIVoice } from '@/components/ai/AIVoiceProvider';
import { useAI } from '@/contexts/AIContext';
import { useUserAIContext } from '@/hooks/useUserAIContext';
import { toast } from 'sonner';
import { AIAnalyticsService } from '@/services/ai/aiAnalyticsService';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  requiresPayment?: boolean;
}

interface UseCompanionChatProps {
  initialMessage?: string;
  onSendMessage?: (message: string) => Promise<string>;
  companionId?: string;
  name?: string;
  personaType?: string;
}

export function useCompanionChat({
  initialMessage = "Hello! How can I assist you today?",
  onSendMessage,
  companionId,
  name,
  personaType
}: UseCompanionChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { isAuthenticated, user } = useUserAIContext();
  const { speak, stopSpeaking, isPlaying, isMuted, toggleMute } = useAIVoice();
  const { trackInteraction, setCurrentCompanion } = useAI();

  // Initialize with the assistant's greeting
  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date()
      }]);
      
      // Optionally speak the initial message
      if (!isMuted) {
        speak(initialMessage);
      }
    }

    // Set current companion in context if provided
    if (companionId && name) {
      setCurrentCompanion({
        id: companionId,
        name: name,
        avatarUrl: undefined,
        personalityType: personaType
      });
      
      // Track this companion view
      if (user?.id) {
        AIAnalyticsService.trackEvent(
          user.id,
          'ai_companion_open',
          { companionId, name, personalityType: personaType }
        );
      }
    }
  }, [initialMessage, isMuted, speak, companionId, name, personaType, setCurrentCompanion, user?.id]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;
    
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please log in to chat with AI companions",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let response: string;
      
      if (onSendMessage) {
        // Use provided message handler
        response = await onSendMessage(input);
      } else {
        // Mock response for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = `I'm ${name || 'your AI companion'}, and this is a demo response. In a real implementation, I would provide a helpful answer about "${input}".`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if voice is not muted
      if (!isMuted) {
        speak(response);
      }
      
      // Track interaction with this companion
      if (companionId && user?.id) {
        trackInteraction(companionId);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Communication error", {
        description: "Failed to get a response from the AI",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (!isMuted) {
      speak(content);
    }
  };

  return {
    messages,
    isTyping,
    isPlaying,
    isMuted,
    toggleMute,
    stopSpeaking,
    handleSendMessage,
    handleSpeakMessage
  };
}
