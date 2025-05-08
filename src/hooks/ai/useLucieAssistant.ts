import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { useUberEcosystem } from '@/contexts/UberEcosystemContext';
import { unifiedApiService } from '@/services/api/unifiedApiService';

// Define the Message interface that matches what's used in LucieAssistant
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface UseLucieAssistantOptions {
  initialSystemPrompt?: string;
  initialMessages?: Message[];
  autoOpen?: boolean;
  persona?: string;
  enableVoice?: boolean;
}

export function useLucieAssistant(options: UseLucieAssistantOptions = {}) {
  const {
    initialSystemPrompt = '',
    initialMessages = [],
    autoOpen = false,
    persona = 'helpful',
    enableVoice = false
  } = options;

  const { lucieAI } = useUberEcosystem();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt);
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [voiceId, setVoiceId] = useState<string>("EXAVITQu4vr4xnSDxMaL"); // Default to "Aria" voice

  useEffect(() => {
    // Check if Lucie is initialized
    if (!lucieAI) {
      setError("Lucie AI system is not initialized");
    }
  }, [lucieAI]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const updateSystemPrompt = useCallback((newPrompt: string) => {
    setSystemPrompt(newPrompt);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  }, []);

  const addAIMessage = useCallback((text: string) => {
    const aiMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    return aiMessage;
  }, []);
  
  const textToSpeech = useCallback(async (text: string) => {
    if (!enableVoice) return null;
    
    try {
      const audioUrl = await unifiedApiService.textToSpeech(text, voiceId);
      setAudioSrc(audioUrl);
      return audioUrl;
    } catch (error) {
      console.error("Error converting text to speech:", error);
      return null;
    }
  }, [enableVoice, voiceId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return null;
    
    setIsLoading(true);
    setIsTyping(true);
    setError(null);
    
    try {
      // Add user message
      addUserMessage(text);
      
      // Get conversation history for context
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add system prompt if available
      if (systemPrompt) {
        conversationHistory.unshift({
          role: 'system',
          content: systemPrompt
        });
      }
      
      // Call edge function to get AI response
      const { data, error } = await supabase.functions.invoke('lucie-chat', {
        body: {
          message: text,
          history: conversationHistory,
          persona
        }
      });
      
      if (error) throw error;
      
      const responseText = data?.response || "I'm sorry, I couldn't generate a response.";
      
      // Add AI response
      addAIMessage(responseText);
      
      // Generate speech if enabled
      if (enableVoice) {
        textToSpeech(responseText);
      }
      
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred while processing your message.';
      setError(errorMessage);
      console.error("Error sending message:", err);
      return null;
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [messages, addUserMessage, addAIMessage, systemPrompt, persona, enableVoice, textToSpeech]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setAudioSrc(null);
  }, []);
  
  const changeVoice = useCallback((id: string) => {
    setVoiceId(id);
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    error,
    systemPrompt,
    sendMessage,
    addUserMessage,
    addAIMessage,
    updateSystemPrompt,
    clearMessages,
    isOpen,
    toggleChat,
    audioSrc,
    voiceId,
    changeVoice,
    enableVoice
  };
}

export default useLucieAssistant;
