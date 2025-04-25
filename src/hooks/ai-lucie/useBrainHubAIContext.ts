
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';

// Define proper types
interface BrainHubContextPreferences {
  anonymized: boolean;
  personalizedResponses: boolean;
  adaptivePersonality: boolean;
  rememberConversations: boolean;
}

interface BrainHubContext {
  preferences: BrainHubContextPreferences;
  lastInteraction: Date | null;
  conversationCount: number;
  favoriteTopics: string[];
  isEnabled: boolean;
}

export const useBrainHubAIContext = () => {
  const { user } = useAuth();
  const [brainHubContext, setBrainHubContext] = useState<BrainHubContext | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContext = async () => {
      if (!user) {
        setBrainHubContext(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Get user metadata
        const userMetadata = user.user_metadata || {};
        
        // If user has existing preferences, use them
        if (userMetadata.aiPreferences) {
          const defaultPreferences: BrainHubContextPreferences = {
            anonymized: false,
            personalizedResponses: true,
            adaptivePersonality: true,
            rememberConversations: true,
          };

          setBrainHubContext({
            preferences: {
              ...defaultPreferences,
              ...(userMetadata.aiPreferences as Partial<BrainHubContextPreferences>)
            },
            lastInteraction: userMetadata.lastAiInteraction ? new Date(userMetadata.lastAiInteraction) : null,
            conversationCount: userMetadata.aiConversationCount || 0,
            favoriteTopics: userMetadata.aiFavoriteTopics || [],
            isEnabled: userMetadata.aiEnabled !== false,
          });
        } else {
          // Create default context
          setBrainHubContext({
            preferences: {
              anonymized: false,
              personalizedResponses: true,
              adaptivePersonality: true,
              rememberConversations: true,
            },
            lastInteraction: null,
            conversationCount: 0,
            favoriteTopics: [],
            isEnabled: true,
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load BrainHub context');
      } finally {
        setIsLoading(false);
      }
    };

    loadContext();
  }, [user]);

  const getUserContext = (): string => {
    if (!user) return "Anonymous user";
    
    let context = "";
    
    // Basic user info
    const displayName = typeof user.username === 'string' ? user.username : 
                        (typeof user.email === 'string' ? user.email.split('@')[0] : 'User');
    
    context += `User: ${displayName}. `;
    
    // Add region info if available
    if (user.user_metadata?.region) {
      // Handle both string and object region
      const region = user.user_metadata.region;
      if (typeof region === 'string') {
        context += `Region: ${region}. `;
      } else if (typeof region === 'object' && region !== null) {
        context += `Region: ${JSON.stringify(region)}. `;
      }
    }
    
    return context;
  };

  return { 
    brainHubContext, 
    isLoading, 
    error,
    getUserContext
  };
};

export default useBrainHubAIContext;
