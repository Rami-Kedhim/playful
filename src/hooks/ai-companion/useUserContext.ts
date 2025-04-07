
import { useState, useCallback } from 'react';
import { UserContext } from './types';

export const useUserContext = () => {
  const [userContext, setUserContext] = useState<UserContext>({
    preferences: {
      topics: ['technology', 'productivity'],
      learning_style: 'visual',
      interaction_mode: 'casual'
    },
    recent_interactions: []
  });

  const getUserContext = useCallback(() => {
    return userContext;
  }, [userContext]);

  const updateUserContext = useCallback((newContext: Partial<UserContext>) => {
    setUserContext(prev => ({
      ...prev,
      ...newContext
    }));
  }, []);

  const addInteraction = useCallback((topic: string) => {
    setUserContext(prev => ({
      ...prev,
      recent_interactions: [
        ...(prev.recent_interactions || []),
        {
          topic,
          timestamp: new Date()
        }
      ].slice(-5) // Keep only the last 5 interactions
    }));
  }, []);

  return {
    userContext,
    getUserContext,
    updateUserContext,
    addInteraction
  };
};
