
import { useState, useCallback, useEffect } from 'react';
import { useAICompanionMessages } from './useAICompanionMessages';
import { useCompanionProfile } from './useCompanionProfile';
import { useUserContext } from './useUserContext';
import { v4 as uuidv4 } from 'uuid';
import { CompanionMessage, UseAICompanionConversationProps } from './types';
import { aiCompanionMessagingService } from '@/services/messaging/aiCompanionMessagingService';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';

export function useAICompanionConversation({ 
  companionId, 
  initialMessages = [] 
}: UseAICompanionConversationProps) {
  const { 
    messages, 
    isTyping, 
    addMessage, 
    handleErrorResponse, 
    handleSuggestedAction, 
    setIsTyping: setIsTypingState 
  } = useAICompanionMessages({ initialMessages });
  
  const { companion, isLoading } = useCompanionProfile(companionId, initialMessages);
  const { getUserContext } = useUserContext();
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Initialize with welcome message if no messages exist
  useEffect(() => {
    const initializeMessages = () => {
      if (initialMessages.length > 0) {
        // Messages already initialized
        return;
      } 
      
      if (messages.length === 0 && companion) {
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
        
        // Connect to HERMES-OXUM neural hub
        console.log('[HERMES-OXUM] Initializing companion conversation');
        neuralHub.applyBoostToContent(
          companion.id,
          'profile',
          80,
          'global'
        );
      }
    };
    
    initializeMessages();
  }, [companion, messages.length, addMessage, initialMessages.length]);
  
  // Check speaking status
  useEffect(() => {
    const checkSpeakingInterval = setInterval(() => {
      const speaking = aiCompanionMessagingService.isSpeaking();
      setIsSpeaking(speaking);
    }, 500);
    
    return () => clearInterval(checkSpeakingInterval);
  }, []);
  
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
      const userContext = getUserContext();
      
      // In a real implementation, this would call an API
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add companion response
      const responseMessage: CompanionMessage = {
        id: uuidv4(), // Added unique ID to fix the TypeScript error
        role: 'assistant',
        content: `I appreciate your message: "${content}". How can I assist you further?`,
        timestamp: new Date(),
        emotion: 'friendly',
        suggestedActions: [
          "Tell me more",
          "Ask a question",
          "End conversation"
        ]
      };
      
      addMessage(responseMessage);
      
      // Process through the messaging service
      await aiCompanionMessagingService.processMessage(
        responseMessage,
        companion.speechStyle ? true : false,
        { voice: companion.voice_id || 'friendly' }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      handleErrorResponse("Something went wrong with the AI companion.");
    } finally {
      setIsTypingState(false);
    }
  }, [companion, getUserContext, addMessage, setIsTypingState, handleErrorResponse]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
  // Stop speaking
  const stopSpeaking = useCallback(() => {
    aiCompanionMessagingService.stopSpeaking();
    setIsSpeaking(false);
  }, []);
  
  return {
    messages,
    isTyping,
    isLoading,
    isSpeaking,
    companion,
    sendMessage,
    stopSpeaking,
    handleSuggestedActionClick
  };
}
