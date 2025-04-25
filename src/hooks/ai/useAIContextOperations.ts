
import { AIContext, AIPreferences } from './types';

export const useAIContextOperations = (
  aiContext: AIContext | null,
  setAIContext: (context: AIContext | null) => void,
  setError: (error: string | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const updatePreferences = async (newPreferences: Partial<AIPreferences>): Promise<boolean> => {
    if (!aiContext) return false;
    
    try {
      setIsLoading(true);
      
      const updatedPreferences = {
        ...aiContext.preferences,
        ...newPreferences
      };
      
      setAIContext({
        ...aiContext,
        preferences: updatedPreferences,
        updatedAt: new Date()
      });
      
      return true;
    } catch (err) {
      setError('Failed to update AI preferences');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const trackInteraction = async (topic?: string): Promise<void> => {
    if (!aiContext) return;
    
    try {
      const updatedTopics = [...aiContext.favoriteTopics];
      
      if (topic && !updatedTopics.includes(topic)) {
        updatedTopics.push(topic);
        
        if (updatedTopics.length > 10) {
          updatedTopics.shift();
        }
      }
      
      setAIContext({
        ...aiContext,
        lastInteraction: new Date(),
        conversationCount: aiContext.conversationCount + 1,
        favoriteTopics: updatedTopics,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Failed to track AI interaction:', err);
    }
  };

  const toggleAI = async (enabled: boolean): Promise<boolean> => {
    if (!aiContext) return false;
    
    try {
      setAIContext({
        ...aiContext,
        isEnabled: enabled,
        updatedAt: new Date()
      });
      
      return true;
    } catch (err) {
      setError('Failed to toggle AI');
      return false;
    }
  };

  const resetAIContext = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const freshContext: AIContext = {
        preferences: {
          anonymized: false,
          personalizedResponses: true,
          adaptivePersonality: true,
          rememberConversations: true,
          suggestContent: true,
          learningEnabled: true,
        },
        lastInteraction: null,
        conversationCount: 0,
        favoriteTopics: [],
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setAIContext(freshContext);
      
      return true;
    } catch (err) {
      setError('Failed to reset AI context');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updatePreferences,
    trackInteraction,
    toggleAI,
    resetAIContext
  };
};

