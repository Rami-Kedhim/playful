
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { LucieResponse, LucieAPIOptions, VisualElementRequest, InteractiveCard } from './types';

export const useLucieAPI = () => {
  const [apiAvailable, setApiAvailable] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [apiBackoffTime, setApiBackoffTime] = useState<number>(60000); // Start with 1 minute
  const { toast } = useToast();

  // Process visual elements request
  const generateVisualElement = useCallback(async (type: string, content: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('lucie-visual-response', {
        body: { type, content }
      });
      
      if (error) {
        console.error('Error generating visual element:', error);
        return null;
      }
      
      return data.data;
    } catch (error) {
      console.error('Error generating visual element:', error);
      return null;
    }
  }, []);

  // Check if we should retry the API based on time passed
  const shouldRetryApi = useCallback(() => {
    if (apiAvailable) return true;
    
    if (!lastRequestTime) return false;
    
    const timeSinceLastRequest = Date.now() - lastRequestTime;
    return timeSinceLastRequest > apiBackoffTime;
  }, [apiAvailable, lastRequestTime, apiBackoffTime]);

  // Call the Lucie AI service
  const callLucieAPI = useCallback(async (
    content: string, 
    userContext: any, 
    chatHistory: any[]
  ) => {
    try {
      // Check if we should try the API
      if (!apiAvailable && !shouldRetryApi()) {
        console.log('API marked as unavailable, using fallback response');
        return { error: 'API_UNAVAILABLE' };
      }

      setLastRequestTime(Date.now());

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('lucie-chat', {
        body: {
          message: content,
          userContext,
          chatHistory,
          visualCapabilities: true // Flag to indicate we support visual elements
        }
      });
      
      if (error) {
        console.error('Error invoking lucie-chat function:', error);
        throw new Error(error.message);
      }
      
      if (data.error || data.errorCode) {
        console.log('lucie-chat function returned error:', data.error || data.errorCode);
        
        // Handle quota exceeded and other error types
        if (data.errorCode === 'QUOTA_EXCEEDED' || data.error?.includes('quota')) {
          setApiAvailable(false);
          setApiBackoffTime(prev => Math.min(prev * 2, 30 * 60 * 1000)); // Exponential backoff, max 30 minutes
          console.log(`API quota exceeded, backing off for ${apiBackoffTime / 1000} seconds`);
        }
        
        return {
          error: data.errorCode || 'API_ERROR',
          text: data.text,
          suggestedActions: data.suggestedActions || [],
          links: data.links || [],
          emotion: 'apologetic'
        };
      }

      // Reset backoff time on successful request
      if (!apiAvailable) {
        setApiAvailable(true);
        setApiBackoffTime(60000); // Reset to 1 minute
      }
      
      return data;
    } catch (error: any) {
      console.error('Error calling Lucie API:', error);
      
      toast({
        title: 'Connection Issue',
        description: 'Sorry, I had trouble connecting. Please try again.',
        variant: 'destructive'
      });
      
      // Mark API as potentially unavailable after consecutive errors
      setRetryCount(prev => prev + 1);
      
      if (retryCount >= 2) {
        setApiAvailable(false);
        setApiBackoffTime(prev => Math.min(prev * 2, 30 * 60 * 1000)); // Exponential backoff
      }
      
      return { error: error.message };
    }
  }, [apiAvailable, shouldRetryApi, toast, apiBackoffTime, retryCount]);

  // Process visual elements that might be present in the response text
  const processVisualElements = useCallback(async (responseText: string, cards?: InteractiveCard[]) => {
    let visualElements = [];
    let processedText = responseText;
    
    // Check for image request patterns like [IMAGE: description]
    const imageMatches = responseText.match(/\[IMAGE: (.+?)\]/g);
    if (imageMatches) {
      for (const match of imageMatches) {
        const description = match.replace('[IMAGE: ', '').replace(']', '');
        const imageElement = await generateVisualElement('image', description);
        if (imageElement) {
          visualElements.push({
            type: 'image',
            data: imageElement
          });
        }
      }
      // Remove the image tags from the text
      processedText = processedText.replace(/\[IMAGE: (.+?)\]/g, '');
    }
    
    // Check for card request patterns like [CARD: {...json...}]
    const cardMatches = responseText.match(/\[CARD: (.+?)\]/g);
    if (cardMatches) {
      for (const match of cardMatches) {
        try {
          const cardJsonStr = match.replace('[CARD: ', '').replace(']', '');
          const cardContent = JSON.parse(cardJsonStr);
          const cardElement = await generateVisualElement('card', cardContent);
          if (cardElement) {
            visualElements.push({
              type: 'card',
              data: cardElement
            });
          }
        } catch (e) {
          console.error('Error parsing card content:', e);
        }
      }
      // Remove the card tags from the text
      processedText = processedText.replace(/\[CARD: (.+?)\]/g, '');
    }
    
    // Also add any interactive cards from the response
    if (cards && cards.length > 0) {
      for (const card of cards) {
        visualElements.push({
          type: 'card',
          data: {
            type: 'interactive',
            ...card
          }
        });
      }
    }
    
    return { 
      visualElements: visualElements.length > 0 ? visualElements : undefined,
      processedText
    };
  }, [generateVisualElement]);

  return {
    apiAvailable,
    retryCount,
    lastRequestTime,
    apiBackoffTime,
    setApiAvailable,
    shouldRetryApi,
    callLucieAPI,
    processVisualElements
  };
};
