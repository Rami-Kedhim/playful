
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
  const { messages, setMessages, isTyping, sendMessage: sendMessageToAI } = useAICompanionMessages();
  const { companion, isLoading } = useCompanionProfile(companionId, initialMessages);
  const { getUserContext } = useUserContext();
  
  // Initialize with welcome message if no messages exist
  useState(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
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
      
      setMessages([welcomeMessage]);
    }
  });
  
  // Send a message to the companion
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !companion) return;
    
    // Get user context
    const userContext = getUserContext();
    await sendMessageToAI(content, companion, userContext);
  }, [companion, getUserContext, sendMessageToAI]);
  
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
