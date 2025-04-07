
import { useCallback } from 'react';
import { useGouldianFilters } from './useGouldianFilters';
import { HermesMode, ToneFilter } from '@/types/behavioral';

/**
 * Hook for managing HERMES emotional response system
 * Part of the HERMES-OXUM emotional intelligence layer
 */
export const useHermesMode = () => {
  const { systemSettings, applyResponseDelay } = useGouldianFilters();
  
  // Get current HERMES mode
  const getCurrentMode = useCallback((): HermesMode => {
    return systemSettings.hermesMode;
  }, [systemSettings.hermesMode]);
  
  // Get current tone filter
  const getToneFilter = useCallback((): ToneFilter => {
    return systemSettings.toneFilter;
  }, [systemSettings.toneFilter]);
  
  // Check if deep emotional responses should be used
  const shouldUseEmotionalResponses = useCallback((): boolean => {
    return ['emotional', 'premium'].includes(systemSettings.hermesMode);
  }, [systemSettings.hermesMode]);
  
  // Process a message through the HERMES system
  const processMessage = useCallback(async (message: string, defaultResponse: string): Promise<string> => {
    // Apply any response delay first
    await applyResponseDelay();
    
    // In a production system, this would pass the message through an AI pipeline
    // For now, we'll just adjust the response based on the tone filter
    switch (systemSettings.toneFilter) {
      case 'enhanced':
        return `${defaultResponse} 💖`; // Add more emotional elements
      case 'authentic':
        return defaultResponse; // No changes
      case 'restrained':
        // Remove excessive emotional language
        return defaultResponse
          .replace(/❤️|💖|💕|😍|😘/g, '')
          .replace(/amazing|incredible|fantastic/g, 'good');
      case 'generic':
        // Return a more generic version
        return "Thank you for your message. How can I assist you today?";
      default:
        return defaultResponse;
    }
  }, [systemSettings.toneFilter, applyResponseDelay]);
  
  // Determine if images should be used based on HERMES mode
  const shouldUseImages = useCallback((): boolean => {
    return systemSettings.hermesMode !== 'protective';
  }, [systemSettings.hermesMode]);
  
  // Check if monetization features should be offered
  const shouldOfferMonetization = useCallback((): boolean => {
    // Don't offer monetization options to suspicious users
    return systemSettings.hermesMode !== 'protective';
  }, [systemSettings.hermesMode]);
  
  return {
    getCurrentMode,
    getToneFilter,
    shouldUseEmotionalResponses,
    processMessage,
    shouldUseImages,
    shouldOfferMonetization
  };
};
