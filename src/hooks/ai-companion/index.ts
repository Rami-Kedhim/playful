
import { useState, useCallback } from 'react';
import { useAICompanionMessages } from './useAICompanionMessages';
import { useCompanionProfile } from './useCompanionProfile';
import { useUserContext } from './useUserContext';
import { v4 as uuidv4 } from 'uuid';
import { CompanionMessage, UseAICompanionConversationProps } from './types';

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
      const userContext = getUserContext();
      
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
  }, [companion, getUserContext, addMessage, setIsTypingState, handleErrorResponse]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
  return {
    messages,
    isTyping,
    isLoading,
    companion,
    sendMessage,
    handleSuggestedActionClick
  };
}

// Export types
export * from './types';
