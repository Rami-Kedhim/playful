
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useUserContext } from '@/hooks/ai-lucie/useUserContext';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import useBrainHub from '@/hooks/useBrainHub';

export type AIModelPreference = {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
  nsfwAllowed: boolean;
  responseStyle?: string;
};

export type AIContextData = {
  userPreferences: {
    language: string;
    region: string;
    contentFilters: {
      nsfw: boolean;
      violence: boolean;
      political: boolean;
      religious: boolean;
    },
    modelPreference?: string;
  };
  sessionData: {
    interactionCount: number;
    lastInteractionTimestamp: number;
    favoriteTopics: string[];
    emotionalState?: string;
    responseQuality: 'basic' | 'premium';
  };
  systemContext: {
    currentProvider: string;
    fallbackProvider: string;
    modelFamily: 'mitigation' | 'unfiltered' | 'nsfw';
    modelCapabilities: string[];
    geolocation?: string;
    legalCompliance: boolean;
  };
};

export const useBrainHubAIContext = (componentId: string) => {
  const { user } = useAuth();
  const { getUserContext } = useUserContext();
  const [aiContext, setAIContext] = useState<AIContextData | null>(null);
  const [preferredModel, setPreferredModel] = useState<AIModelPreference | null>(null);
  const { isConnected, syncWith } = useBrainHub(componentId, { type: 'ai-context' });

  // Initialize AI context based on user and Brain Hub configuration
  useEffect(() => {
    if (user && isConnected) {
      // Get Brain Hub configuration to determine available models and settings
      const brainHubConfig = brainHub.getConfig();
      
      // Default context with conservative settings
      const defaultContext: AIContextData = {
        userPreferences: {
          language: 'en',
          region: 'global',
          contentFilters: {
            nsfw: false,
            violence: false,
            political: false,
            religious: false
          },
          modelPreference: 'default'
        },
        sessionData: {
          interactionCount: 0,
          lastInteractionTimestamp: Date.now(),
          favoriteTopics: [],
          responseQuality: 'basic'
        },
        systemContext: {
          currentProvider: 'openai',
          fallbackProvider: 'openai',
          modelFamily: 'mitigation', // Default to safe models
          modelCapabilities: ['text', 'chat'],
          legalCompliance: true
        }
      };

      // Process user metadata to customize context
      if (user.user_metadata) {
        // Check for premium status
        if (user.user_metadata.subscription_tier === 'premium') {
          defaultContext.sessionData.responseQuality = 'premium';
        }
        
        // Set content preferences if available
        if (user.user_metadata.content_preferences) {
          defaultContext.userPreferences.contentFilters = {
            ...defaultContext.userPreferences.contentFilters,
            ...user.user_metadata.content_preferences
          };
        }
        
        // Set region if available for geo-compliance
        if (user.user_metadata.region) {
          defaultContext.userPreferences.region = user.user_metadata.region;
          defaultContext.systemContext.geolocation = user.user_metadata.region;
        }
      }

      // Apply Brain Hub settings
      if (brainHubConfig) {
        // Enable NSFW if neuroEmotionEnabled is true
        if (brainHubConfig.neuroEmotionEnabled) {
          defaultContext.systemContext.modelFamily = defaultContext.userPreferences.contentFilters.nsfw ? 'nsfw' : 'unfiltered';
        }
        
        // Apply geo-legal filtering
        if (brainHubConfig.geoLegalFilteringEnabled) {
          defaultContext.systemContext.legalCompliance = true;
        }
      }

      setAIContext(defaultContext);
    }
  }, [user, isConnected]);

  // Determine preferred AI model based on context
  useEffect(() => {
    if (aiContext) {
      let modelPreference: AIModelPreference;
      
      // Select appropriate model based on content filters and system context
      if (aiContext.systemContext.modelFamily === 'nsfw') {
        modelPreference = {
          provider: 'nomi',
          model: 'nomi-unleashed',
          temperature: 0.9,
          maxTokens: 2000,
          nsfwAllowed: true,
          responseStyle: 'flirty'
        };
      } else if (aiContext.systemContext.modelFamily === 'unfiltered') {
        modelPreference = {
          provider: 'openrouter',
          model: 'mythomax',
          temperature: 0.8,
          maxTokens: 1500,
          nsfwAllowed: true,
          responseStyle: 'creative'
        };
      } else {
        // Default safe model
        modelPreference = {
          provider: 'openai',
          model: 'gpt-4o',
          temperature: 0.7,
          maxTokens: 1000,
          nsfwAllowed: false,
          responseStyle: 'helpful'
        };
      }
      
      // Add user-specific context to system prompt
      const userContextStr = getUserContext();
      if (userContextStr) {
        modelPreference.systemPrompt = `${modelPreference.systemPrompt || ''}\n\nUser context: ${userContextStr}`;
      }
      
      setPreferredModel(modelPreference);
    }
  }, [aiContext, getUserContext]);

  // Function to update AI context with new data
  const updateAIContext = (updatedContext: Partial<AIContextData>) => {
    setAIContext(prev => {
      if (!prev) return null;
      
      const newContext = {
        ...prev,
        ...updatedContext,
        userPreferences: {
          ...prev.userPreferences,
          ...(updatedContext.userPreferences || {})
        },
        sessionData: {
          ...prev.sessionData,
          ...(updatedContext.sessionData || {})
        },
        systemContext: {
          ...prev.systemContext,
          ...(updatedContext.systemContext || {})
        }
      };
      
      // Synchronize with other Brain Hub components
      if (isConnected) {
        syncWith('ai-provider-manager', { aiContext: newContext });
      }
      
      return newContext;
    });
  };

  // Function to update user emotional state
  const updateEmotionalState = (emotionalState: string) => {
    updateAIContext({
      sessionData: {
        emotionalState,
        lastInteractionTimestamp: Date.now(),
        interactionCount: aiContext ? aiContext.sessionData.interactionCount : 0,
        favoriteTopics: aiContext ? aiContext.sessionData.favoriteTopics : [],
        responseQuality: aiContext ? aiContext.sessionData.responseQuality : 'basic'
      }
    });
  };

  // Function to increment interaction count
  const recordInteraction = (topic?: string) => {
    updateAIContext({
      sessionData: {
        interactionCount: aiContext ? aiContext.sessionData.interactionCount + 1 : 1,
        lastInteractionTimestamp: Date.now(),
        favoriteTopics: topic && aiContext ? 
          [...new Set([...aiContext.sessionData.favoriteTopics, topic])] : 
          aiContext?.sessionData.favoriteTopics || [],
        responseQuality: aiContext ? aiContext.sessionData.responseQuality : 'basic',
        emotionalState: aiContext?.sessionData.emotionalState
      }
    });
  };

  // Function to toggle NSFW content
  const toggleNSFWContent = (enabled: boolean) => {
    updateAIContext({
      userPreferences: {
        language: aiContext?.userPreferences.language || 'en',
        region: aiContext?.userPreferences.region || 'global',
        contentFilters: {
          nsfw: enabled,
          violence: aiContext ? aiContext.userPreferences.contentFilters.violence : false,
          political: aiContext ? aiContext.userPreferences.contentFilters.political : false,
          religious: aiContext ? aiContext.userPreferences.contentFilters.religious : false
        },
        modelPreference: aiContext?.userPreferences.modelPreference
      },
      systemContext: {
        modelFamily: enabled ? 'nsfw' : 'mitigation',
        currentProvider: aiContext ? aiContext.systemContext.currentProvider : 'openai',
        fallbackProvider: aiContext ? aiContext.systemContext.fallbackProvider : 'openai',
        modelCapabilities: aiContext ? aiContext.systemContext.modelCapabilities : ['text', 'chat'],
        legalCompliance: aiContext ? aiContext.systemContext.legalCompliance : true,
        geolocation: aiContext?.systemContext.geolocation
      }
    });
  };

  return {
    aiContext,
    preferredModel,
    updateAIContext,
    updateEmotionalState,
    recordInteraction,
    toggleNSFWContent,
    isConnected
  };
};

export default useBrainHubAIContext;
