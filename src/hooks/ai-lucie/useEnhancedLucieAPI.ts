
/**
 * Enhanced LucieAPI hook incorporating Schauberger flow principles
 * for more natural and resource-efficient API usage
 */
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { LucieResponse, LucieAPIOptions, VisualElementRequest, InteractiveCard } from './types';
import { useSchaubergerFlow } from '../useSchaubergerFlow';

export const useEnhancedLucieAPI = (messageHistory: any[] = []) => {
  const [apiAvailable, setApiAvailable] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [apiBackoffTime, setApiBackoffTime] = useState<number>(60000); // Start with 1 minute
  const { toast } = useToast();
  
  // Use Schauberger flow for optimization
  const { 
    emotionalFlow, 
    vortexStrength,
    resourceAllocation,
    shouldUseImages,
    shouldUseCards
  } = useSchaubergerFlow({
    messageHistory: messageHistory.map(m => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp
    }))
  });

  // Process visual elements request with Schauberger efficiency
  const generateVisualElement = useCallback(async (type: string, content: any) => {
    // Apply Schauberger's implosive principle - only generate if needed
    if ((type === 'image' && !shouldUseImages()) || 
        (type === 'card' && !shouldUseCards())) {
      console.log(`Skipping ${type} generation based on Schauberger flow analysis`);
      return null;
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('lucie-visual-response', {
        body: { 
          type, 
          content,
          flowState: { emotionalFlow, vortexStrength, resourceAllocation }
        }
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
  }, [emotionalFlow, vortexStrength, resourceAllocation, shouldUseImages, shouldUseCards]);

  // Check if we should retry the API based on time passed
  const shouldRetryApi = useCallback(() => {
    if (apiAvailable) return true;
    
    if (!lastRequestTime) return false;
    
    const timeSinceLastRequest = Date.now() - lastRequestTime;
    return timeSinceLastRequest > apiBackoffTime;
  }, [apiAvailable, lastRequestTime, apiBackoffTime]);

  // Call the Lucie AI service with Schauberger optimization
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

      // Apply Schauberger flow to optimize request
      const optimizedRequest = {
        message: content,
        userContext,
        chatHistory,
        visualCapabilities: shouldUseImages() || shouldUseCards(), // Only enable if needed
        flowState: {
          emotionalFlow,
          vortexStrength,
          resourceAllocation
        }
      };

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('lucie-chat', {
        body: optimizedRequest
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
  }, [
    apiAvailable, 
    shouldRetryApi, 
    toast, 
    apiBackoffTime, 
    retryCount, 
    emotionalFlow,
    vortexStrength,
    resourceAllocation,
    shouldUseImages,
    shouldUseCards
  ]);

  // Process visual elements with Schauberger optimization
  const processVisualElements = useCallback(async (responseText: string, cards?: InteractiveCard[]) => {
    let visualElements = [];
    let processedText = responseText;
    
    // Apply Schauberger implosive principle - only process if likely to be valuable
    const shouldProcess = shouldUseImages() || shouldUseCards();
    
    if (shouldProcess) {
      // Check for image request patterns like [IMAGE: description]
      const imageMatches = responseText.match(/\[IMAGE: (.+?)\]/g);
      if (imageMatches && shouldUseImages()) {
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
      if (cardMatches && shouldUseCards()) {
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
      if (cards && cards.length > 0 && shouldUseCards()) {
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
    } else {
      // Remove the tags without generating elements (resource saving)
      processedText = processedText.replace(/\[IMAGE: (.+?)\]/g, '');
      processedText = processedText.replace(/\[CARD: (.+?)\]/g, '');
    }
    
    return { 
      visualElements: visualElements.length > 0 ? visualElements : undefined,
      processedText
    };
  }, [generateVisualElement, shouldUseImages, shouldUseCards]);

  return {
    apiAvailable,
    retryCount,
    lastRequestTime,
    apiBackoffTime,
    emotionalFlow,
    vortexStrength,
    resourceAllocation,
    setApiAvailable,
    shouldRetryApi,
    callLucieAPI,
    processVisualElements
  };
};

export default useEnhancedLucieAPI;
