
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { aiCompanionMessagingService } from '@/services/messaging/aiCompanionMessagingService';
import { voiceService } from '@/services/voiceService';
import { CompanionMessage, UseAICompanionConversationProps } from './types';

export function useAICompanionConversation({ 
  companionId, 
  initialMessages = [] 
}: UseAICompanionConversationProps) {
  const [messages, setMessages] = useState<CompanionMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [companion, setCompanion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Fetch companion profile
  useEffect(() => {
    const fetchCompanion = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would get the companion from an API
        // For now we'll just simulate a companion
        const mockCompanion = {
          id: companionId,
          name: 'AI Companion',
          description: 'An AI companion for testing',
          avatar_url: '',
          personality_traits: ['friendly', 'helpful'],
          voice_type: 'friendly',
          speechStyle: 'friendly'
        };
        
        setCompanion(mockCompanion);
        
        // If no initial messages, add a welcome message
        if (initialMessages.length === 0 && messages.length === 0) {
          const welcomeMessage: CompanionMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: `Hi there! I'm ${mockCompanion.name}. It's nice to meet you!`,
            timestamp: new Date(),
            emotion: 'happy'
          };
          
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Error fetching companion:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (companionId) {
      fetchCompanion();
    }
  }, [companionId, initialMessages, messages.length]);
  
  // Add a new message
  const addMessage = useCallback((message: Partial<CompanionMessage>) => {
    const fullMessage: CompanionMessage = {
      id: message.id || uuidv4(),
      role: message.role || 'user',
      content: message.content || '',
      timestamp: message.timestamp || new Date(),
      emotion: message.emotion,
      suggestedActions: message.suggestedActions
    };
    
    setMessages(prev => [...prev, fullMessage]);
    return fullMessage;
  }, []);
  
  // Handle response errors
  const handleErrorResponse = useCallback((errorMessage: string) => {
    addMessage({
      role: 'assistant',
      content: errorMessage,
      emotion: 'sad'
    });
  }, [addMessage]);
  
  // Handle suggested action click
  const handleSuggestedAction = useCallback((action: string) => {
    addMessage({
      role: 'user',
      content: action
    });
  }, [addMessage]);
  
  // Get AI response with speech support
  const getAIResponse = useCallback(async (content: string) => {
    setIsTyping(true);
    
    try {
      // In a real implementation, we'd call an API for the response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `I understand you said: "${content}". How can I help you further?`,
        timestamp: new Date(),
        emotion: 'friendly',
        suggestedActions: ['Tell me more', 'Change topic', 'End conversation']
      };
      
      // Add the message to the UI
      addMessage(aiMessage);
      
      return aiMessage;
    } catch (error) {
      console.error('Error getting AI response:', error);
      handleErrorResponse('Sorry, I encountered an error processing your message.');
      return null;
    } finally {
      setIsTyping(false);
    }
  }, [addMessage, handleErrorResponse]);
  
  // Send message and get response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage({
      role: 'user',
      content,
    });
    
    // Get AI response
    const aiResponse = await getAIResponse(content);
    
    // Speak the response if we have a companion with voice type
    if (aiResponse && companion?.speechStyle) {
      try {
        const success = await voiceService.speak(aiResponse.content, { 
          voice: companion.speechStyle 
        });
        
        if (success) {
          setIsSpeaking(true);
          
          // Check when speech ends
          const checkInterval = setInterval(() => {
            if (!voiceService.isSpeaking()) {
              setIsSpeaking(false);
              clearInterval(checkInterval);
            }
          }, 100);
        }
      } catch (error) {
        console.error('Error with speech synthesis:', error);
      }
    }
  }, [addMessage, getAIResponse, companion]);
  
  // Stop speaking
  const stopSpeaking = useCallback(() => {
    voiceService.stop();
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
    handleSuggestedActionClick: handleSuggestedAction,
    setIsTyping,
    addMessage,
    handleErrorResponse
  };
}

export default useAICompanionConversation;
