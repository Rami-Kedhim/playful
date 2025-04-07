
import { useState, useCallback } from 'react';
import { useAICompanionMessages } from './useAICompanionMessages';
import { useCompanionProfile } from './useCompanionProfile';
import { useUserContext } from './useUserContext';
import { v4 as uuidv4 } from 'uuid';
import { 
  CompanionMessage, 
  UseAICompanionConversationOptions, 
  UseAICompanionConversationResult 
} from './types';
import { AICompanion } from '@/types/ai-companion';

export function useAICompanionConversation({ 
  companionId, 
  initialMessages = [] 
}: UseAICompanionConversationOptions): UseAICompanionConversationResult {
  const { 
    messages, 
    isTyping, 
    addMessage, 
    handleErrorResponse, 
    handleSuggestedAction, 
    setIsTyping: setIsTypingState 
  } = useAICompanionMessages({ initialMessages });
  
  const { companion, isLoading } = useCompanionProfile(companionId, initialMessages);
  const userContextUtils = useUserContext();
  
  const [generatingImage, setGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const creditCost = 1; // Default credit cost
  
  // Initialize with welcome message if no messages exist
  useState(() => {
    if (initialMessages.length > 0) {
      // Messages already initialized
    } else if (messages.length === 0 && companion) {
      const welcomeMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `Hi there! I'm ${companion.name}. It's lovely to meet you! How are you doing today?`,
        timestamp: new Date(),
        emotion: 'happy',
        suggestedActions: [
          "Tell me about yourself",
          "What do you like to do for fun?",
          "How's your day going?"
        ]
      };
      
      addMessage(welcomeMessage);
    }
  });
  
  // Send a message to the companion
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !companion) return;
    
    // Add user message
    addMessage({
      role: 'user',
      content,
      timestamp: new Date()
    });
    
    // Set typing indicator
    setIsTypingState(true);
    
    try {
      // Get user context
      const userContext = userContextUtils.getUserContext();
      
      // In a real implementation, this would call an API
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add companion response
      addMessage({
        role: 'assistant',
        content: `I appreciate your message: "${content}". How can I assist you further?`,
        timestamp: new Date(),
        emotion: 'friendly',
        suggestedActions: [
          "Tell me more",
          "Ask a question",
          "End conversation"
        ]
      });
    } catch (error) {
      console.error("Error sending message:", error);
      handleErrorResponse("Something went wrong with the AI companion.");
    } finally {
      setIsTypingState(false);
    }
  }, [companion, userContextUtils, addMessage, setIsTypingState, handleErrorResponse]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
  // Implement generate image functionality
  const generateImage = useCallback(async (prompt: string): Promise<void> => {
    if (!prompt.trim() || !companion) return;
    
    setGeneratingImage(true);
    setError(null);
    
    try {
      // Mock image generation for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add an image as a response
      addMessage({
        role: 'assistant',
        content: `I've created an image based on: "${prompt}"`,
        timestamp: new Date(),
        visualElements: [
          { 
            data: {
              type: 'image',
              url: 'https://placehold.co/600x400?text=AI+Generated+Image',
              alt: prompt,
              caption: `Image based on: "${prompt}"`
            }
          }
        ],
        emotion: 'creative'
      });
    } catch (error: any) {
      setError(error.message || "Failed to generate image");
      handleErrorResponse("I couldn't generate that image right now.");
    } finally {
      setGeneratingImage(false);
    }
  }, [companion, addMessage, handleErrorResponse]);
  
  // Cast companion to AICompanion to make TypeScript happy
  // In a real app, you would ensure the proper type conversion
  const aiCompanion = companion ? {
    id: companion.id,
    user_id: companion.id, // Using id as a fallback
    name: companion.name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: companion.avatar_url || '',
    gallery: [],
    description: companion.description,
    personality_traits: [],
    body_type: 'slim',
    voice_type: companion.voice_type,
    relationship_level: {
      trust: 50,
      affection: 50,
      obedience: 50,
      intimacy: 50
    },
    engagement_stats: {
      chat_messages: 0,
      images_generated: 0,
      voice_messages: 0,
      last_interaction: null
    },
    is_preset: true
  } as AICompanion : null;
  
  return {
    messages,
    isTyping,
    isLoading,
    error,
    companion: aiCompanion,
    sendMessage,
    handleSuggestedActionClick,
    generateImage,
    generatingImage,
    creditCost
  };
}

// Export types
export * from './types';
