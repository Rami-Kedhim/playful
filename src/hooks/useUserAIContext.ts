
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';

export interface AIPreferences {
  anonymized: boolean;
  personalizedResponses: boolean;
  adaptivePersonality: boolean;
  rememberConversations: boolean;
  suggestContent: boolean;
  learningEnabled: boolean;
  voiceSettings?: {
    voice: string;
    speed: number;
    pitch: number;
  };
}

export interface AIContext {
  preferences: AIPreferences;
  lastInteraction: Date | null;
  conversationCount: number;
  favoriteTopics: string[];
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useUserAIContext = () => {
  const { user } = useAuth();
  const [aiContext, setAIContext] = useState<AIContext | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContext = async () => {
      if (!user) {
        setAIContext(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Check if user has app-related metadata
        const userMetadata = user.user_metadata || {};
        
        // If user has existing AI preferences, use them
        if (userMetadata.aiPreferences) {
          const defaultPreferences: AIPreferences = {
            anonymized: false,
            personalizedResponses: true,
            adaptivePersonality: true,
            rememberConversations: true,
            suggestContent: true,
            learningEnabled: true,
          };

          const preferences = {
            ...defaultPreferences,
            ...(userMetadata.aiPreferences as Partial<AIPreferences>)
          };

          setAIContext({
            preferences,
            lastInteraction: userMetadata.lastAiInteraction ? new Date(userMetadata.lastAiInteraction) : null,
            conversationCount: userMetadata.aiConversationCount || 0,
            favoriteTopics: userMetadata.aiFavoriteTopics || [],
            isEnabled: userMetadata.aiEnabled === true,
            createdAt: new Date(userMetadata.aiContextCreated || user.created_at),
            updatedAt: new Date()
          });
        } else {
          // Create default AI context
          setAIContext({
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

  const updatePreferences = async (newPreferences: Partial<AIPreferences>): Promise<boolean> => {
    if (!user || !aiContext) return false;
    
    try {
      setIsLoading(true);
      
      // Update local state first
      const updatedPreferences = {
        ...aiContext.preferences,
        ...newPreferences
      };
      
      setAIContext({
        ...aiContext,
        preferences: updatedPreferences,
        updatedAt: new Date()
      });
      
      // In a real app, you would update this in your backend/database
      return true;
    } catch (err) {
      setError('Failed to update AI preferences');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const trackInteraction = async (topic?: string): Promise<void> => {
    if (!user || !aiContext) return;
    
    try {
      const updatedTopics = [...aiContext.favoriteTopics];
      
      // Add topic to favorites if provided and not already in the list
      if (topic && !updatedTopics.includes(topic)) {
        updatedTopics.push(topic);
        
        // Keep only the 10 most recent topics
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
    if (!user) return false;
    
    try {
      setIsLoading(true);
      
      // Create fresh AI context with default settings
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
    aiContext, 
    isLoading, 
    error,
    updatePreferences,
    trackInteraction,
    toggleAI,
    resetAIContext
  };
};

export default useUserAIContext;
