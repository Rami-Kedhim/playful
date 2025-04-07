
import { useState, useCallback, useEffect } from 'react';
import { useUserContext } from './ai-lucie/useUserContext';
import { useLucieAPI } from './ai-lucie/useLucieAPI';
import { useFallbackResponses } from './ai-lucie/useFallbackResponses';
import { useMessageFormatting } from './ai-lucie/useMessageFormatting';
import { LucieMessage } from './ai-lucie/types';

export function useLucieAssistant() {
  const [messages, setMessages] = useState<LucieMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const userContextUtils = useUserContext();
  const { 
    apiAvailable, 
    shouldRetryApi, 
    callLucieAPI, 
    processVisualElements 
  } = useLucieAPI();
  const { getFallbackResponse } = useFallbackResponses();
  const { formatChatHistory } = useMessageFormatting();
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
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
  }, [messages.length]);
  
  // Reset API availability after backoff time
  useEffect(() => {
    if (!apiAvailable && shouldRetryApi()) {
      console.log(`Attempting to reset API availability`);
    }
  }, [apiAvailable, shouldRetryApi]);

  // Send a message to Lucie
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to UI immediately
    const userMessage: LucieMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Check if we should try the API
      if (!apiAvailable && !shouldRetryApi()) {
        console.log('API marked as unavailable, using fallback response');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Brief delay for typing effect
        const fallbackMessage = getFallbackResponse(content);
        setMessages(prev => [...prev, fallbackMessage]);
        setIsTyping(false);
        return;
      }

      // Get user context and chat history
      const userContext = userContextUtils.getUserContext();
      const chatHistory = formatChatHistory(messages);
      
      // Call the AI service
      const lucieResponse = await callLucieAPI(content, userContext, chatHistory);
      
      if (lucieResponse.error) {
        // Add the error response to messages
        const errorResponse: LucieMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: lucieResponse.text || "Sorry, I'm having trouble connecting at the moment.",
          timestamp: new Date(),
          suggestedActions: lucieResponse.suggestedActions || [],
          links: lucieResponse.links || [],
          emotion: 'apologetic'
        };
        
        setMessages(prev => [...prev, errorResponse]);
      } else {
        // Process any visual elements that might be requested in the response
        const { visualElements, processedText } = await processVisualElements(lucieResponse.text);
        
        // Add Lucie's normal response to the UI
        const lucieMessage: LucieMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: processedText,
          timestamp: new Date(),
          suggestedActions: lucieResponse.suggestedActions || [],
          links: lucieResponse.links || [],
          emotion: lucieResponse.emotion || 'neutral',
          visualElements
        };
        
        setMessages(prev => [...prev, lucieMessage]);
      }
    } catch (error: any) {
      console.error('Error sending message to Lucie:', error);
      
      // Use fallback response
      const fallbackMessage = getFallbackResponse(content);
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [apiAvailable, shouldRetryApi, formatChatHistory, getFallbackResponse, userContextUtils, callLucieAPI, messages, processVisualElements]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);
  
  // Toggle the assistant open/closed
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
    handleSuggestedActionClick
  };
}

export type { LucieMessage } from './ai-lucie/types';
export default useLucieAssistant;
