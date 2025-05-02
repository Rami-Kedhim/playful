
import { useState, useCallback } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { BrainHubRequest, BrainHubResponse } from '@/services/neural/types/neuralHub';

interface AIMessage {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}

interface AIMessagingHook {
  messages: AIMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  generateResponse: (prompt: string) => Promise<string>;
  clearMessages: () => void;
  processContentRequest: (type: string, data: any) => Promise<any>;
}

export function useAIMessaging(): AIMessagingHook {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to add a new message to the state
  const addMessage = useCallback((content: string, role: 'assistant' | 'user') => {
    const newMessage: AIMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Function to send a message and get a response
  const sendMessage = useCallback(async (content: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add the user message
      addMessage(content, 'user');
      
      // Generate a response
      const response = await generateResponse(content);
      
      // Add the assistant message
      addMessage(response, 'assistant');
    } catch (err: any) {
      setError(err.message || 'Error sending message');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  // Function to generate a response from the AI
  const generateResponse = useCallback(async (prompt: string): Promise<string> => {
    try {
      // Create the request for the neural hub
      const request: BrainHubRequest = {
        type: 'generation',
        data: { prompt, max_tokens: 500 }
      };
      
      // Process the request
      const response = await neuralHub.processRequest(request);
      
      // Check if the response was successful
      if (response.success && response.data) {
        return response.data.text || 'I processed your request, but no response was generated.';
      } else {
        throw new Error(response.error || 'Failed to generate response');
      }
    } catch (err: any) {
      setError(err.message || 'Error generating response');
      return 'I encountered an error while processing your request.';
    }
  }, []);

  // Function to process content-related requests
  const processContentRequest = useCallback(async (type: string, data: any): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create the request
      const request: BrainHubRequest = {
        type,
        data
      };
      
      // Process the request
      const response = await neuralHub.processRequest(request);
      
      // Check if the response was successful
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || `Failed to process ${type} request`);
      }
    } catch (err: any) {
      setError(err.message || `Error processing ${type} request`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to analyze user content
  const analyzeContent = useCallback(async (content: string): Promise<any> => {
    try {
      // Create the request
      const request: BrainHubRequest = {
        type: 'analysis',
        data: { content }
      };
      
      // Process the request
      const response = await neuralHub.processRequest(request);
      
      // Check if the response was successful
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to analyze content');
      }
    } catch (err: any) {
      setError(err.message || 'Error analyzing content');
      throw err;
    }
  }, []);

  // Function to moderate content
  const moderateContent = useCallback(async (content: string): Promise<boolean> => {
    try {
      // Create the request
      const request: BrainHubRequest = {
        type: 'moderation',
        data: { content }
      };
      
      // Process the request
      const response = await neuralHub.processRequest(request);
      
      // Check if the response was successful
      if (response.success && response.data) {
        return response.data.isAppropriate || false;
      } else {
        throw new Error(response.error || 'Failed to moderate content');
      }
    } catch (err: any) {
      setError(err.message || 'Error moderating content');
      return false;
    }
  }, []);

  // Function to enhance AI messages with emotional content
  const enhanceAIMessage = useCallback(async (message: string, context: any = {}): Promise<string> => {
    try {
      // Create the request
      const request: BrainHubRequest = {
        type: 'enhance_ai_message',
        data: { message, context }
      };
      
      // Process the request
      const response = await neuralHub.processRequest(request);
      
      // Check if the response was successful
      if (response.success && response.data) {
        return response.data.enhancedMessage || message;
      } else {
        return message; // Return original message if enhancement fails
      }
    } catch (err: any) {
      console.error('Error enhancing AI message:', err);
      return message; // Return original message if error occurs
    }
  }, []);

  // Function to clear all messages
  const clearMessages = useCallback((): void => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    generateResponse,
    clearMessages,
    processContentRequest
  };
}

export default useAIMessaging;
