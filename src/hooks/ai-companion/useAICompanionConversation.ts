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
  
  useEffect(() => {
    const initializeMessages = () => {
      if (initialMessages.length > 0) {
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
  
  useEffect(() => {
    const checkSpeakingInterval = setInterval(() => {
      const speaking = aiCompanionMessagingService.isSpeaking();
      setIsSpeaking(speaking);
    }, 500);
    
    return () => clearInterval(checkSpeakingInterval);
  }, []);
  
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !companion) return;
    
    addMessage({
      role: 'user',
      content,
      timestamp: new Date()
    });
    
    setIsTypingState(true);
    
    try {
      const userContext = getUserContext();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const responseMessage: CompanionMessage = {
        id: uuidv4(),
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
  
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
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
