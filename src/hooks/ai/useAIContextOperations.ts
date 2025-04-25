
import { useCallback } from 'react';
import { AIContext, AIPreferences } from './types';

export const useAIContextOperations = (
  aiContext: AIContext | null,
  setAIContext: React.Dispatch<React.SetStateAction<AIContext | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updatePreferences = useCallback(async (preferences: Partial<AIPreferences>) => {
    if (!aiContext) {
      setError('No AI context available');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, you would save these preferences to your backend
      // For now, we just update the local state
      setAIContext(prevContext => {
        if (!prevContext) return null;
        
        return {
          ...prevContext,
          preferences: {
            ...prevContext.preferences,
            ...preferences
          },
          updatedAt: new Date()
        };
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  }, [aiContext, setAIContext, setError, setIsLoading]);
  
  const trackInteraction = useCallback(async (topic?: string) => {
    if (!aiContext) {
      setError('No AI context available');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Update interaction tracking in the context
      setAIContext(prevContext => {
        if (!prevContext) return null;
        
        const favoriteTopics = [...prevContext.favoriteTopics];
        if (topic && !favoriteTopics.includes(topic)) {
          favoriteTopics.push(topic);
        }
        
        return {
          ...prevContext,
          lastInteraction: new Date(),
          conversationCount: prevContext.conversationCount + 1,
          favoriteTopics,
          updatedAt: new Date()
        };
      });
    } catch (err: any) {
      setError(err.message || 'Failed to track interaction');
    } finally {
      setIsLoading(false);
    }
  }, [aiContext, setAIContext, setError, setIsLoading]);
  
  const toggleAI = useCallback(async (enabled: boolean) => {
    if (!aiContext) {
      setError('No AI context available');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Toggle AI enabled state
      setAIContext(prevContext => {
        if (!prevContext) return null;
        
        return {
          ...prevContext,
          isEnabled: enabled,
          updatedAt: new Date()
        };
      });
    } catch (err: any) {
      setError(err.message || 'Failed to toggle AI');
    } finally {
      setIsLoading(false);
    }
  }, [aiContext, setAIContext, setError, setIsLoading]);
  
  const resetAIContext = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Reset the context to null
      setAIContext(null);
    } catch (err: any) {
      setError(err.message || 'Failed to reset AI context');
    } finally {
      setIsLoading(false);
    }
  }, [setAIContext, setError, setIsLoading]);
  
  return {
    updatePreferences,
    trackInteraction,
    toggleAI,
    resetAIContext
  };
};
