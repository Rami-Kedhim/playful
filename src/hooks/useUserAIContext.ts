
import { useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { UseAIContextReturn } from './ai/types';
import { useAIContextState } from './ai/useAIContextState';
import { useAIContextOperations } from './ai/useAIContextOperations';
import { getDefaultPreferences, processLastInteractionDate } from '@/utils/ai/aiPreferenceUtils';

export const useUserAIContext = (): UseAIContextReturn => {
  const { user } = useAuth();
  const {
    aiContext,
    setAIContext,
    isLoading,
    setIsLoading,
    error,
    setError
  } = useAIContextState();

  const {
    updatePreferences,
    trackInteraction,
    toggleAI,
    resetAIContext
  } = useAIContextOperations(aiContext, setAIContext, setError, setIsLoading);

  useEffect(() => {
    const loadContext = async () => {
      if (!user) {
        setAIContext(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const userMetadata = user.user_metadata || {};
        
        if (userMetadata.aiPreferences) {
          const defaultPreferences = getDefaultPreferences();
          const preferences = {
            ...defaultPreferences,
            ...(userMetadata.aiPreferences)
          };

          // Safely pass the lastAiInteraction to processLastInteractionDate
          const lastInteractionValue = userMetadata.lastAiInteraction;
          const lastInteraction = processLastInteractionDate(lastInteractionValue);

          setAIContext({
            preferences,
            lastInteraction,
            conversationCount: userMetadata.aiConversationCount || 0,
            favoriteTopics: userMetadata.aiFavoriteTopics || [],
            isEnabled: userMetadata.aiEnabled === true,
            createdAt: new Date(userMetadata.aiContextCreated || user.created_at),
            updatedAt: new Date()
          });
        } else {
          setAIContext({
            preferences: getDefaultPreferences(),
            lastInteraction: null,
            conversationCount: 0,
            favoriteTopics: [],
            isEnabled: true,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load AI context');
      } finally {
        setIsLoading(false);
      }
    };

    loadContext();
  }, [user]);

  return {
    aiContext,
    isLoading,
    error,
    updatePreferences,
    trackInteraction,
    toggleAI,
    resetAIContext
  };
};

export * from './ai/types';
export default useUserAIContext;
