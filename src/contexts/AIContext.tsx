
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { AIAnalyticsService } from '@/services/ai/aiAnalyticsService';

// Define types for our AI context
interface AICompanion {
  id: string;
  name: string;
  avatarUrl?: string;
  personalityType?: string;
  description?: string;
}

interface AIInteraction {
  companionId: string;
  lastInteractionAt: Date;
  messageCount: number;
}

interface AIContextType {
  currentCompanion: AICompanion | null;
  recentInteractions: AIInteraction[];
  userPreferences: {
    voiceEnabled: boolean;
    preferredPersonality?: string;
  };
  setCurrentCompanion: (companion: AICompanion | null) => void;
  toggleVoicePreference: () => void;
  setPreferredPersonality: (personality: string) => void;
  trackInteraction: (companionId: string) => void;
  clearCurrentCompanion: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentCompanion, setCurrentCompanion] = useState<AICompanion | null>(null);
  const [recentInteractions, setRecentInteractions] = useState<AIInteraction[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    voiceEnabled: true,
    preferredPersonality: undefined as string | undefined
  });

  // Load user preferences on mount or when user changes
  useEffect(() => {
    if (user?.id) {
      // Load user AI preferences from localStorage (could be replaced with API call)
      const savedPreferences = localStorage.getItem(`ai_preferences_${user.id}`);
      if (savedPreferences) {
        setUserPreferences(JSON.parse(savedPreferences));
      }
      
      // Load recent interactions
      const savedInteractions = localStorage.getItem(`ai_interactions_${user.id}`);
      if (savedInteractions) {
        setRecentInteractions(JSON.parse(savedInteractions));
      }
    }
  }, [user?.id]);

  // Save preferences when they change
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`ai_preferences_${user.id}`, JSON.stringify(userPreferences));
    }
  }, [userPreferences, user?.id]);

  // Save interactions when they change
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`ai_interactions_${user.id}`, JSON.stringify(recentInteractions));
    }
  }, [recentInteractions, user?.id]);

  const toggleVoicePreference = () => {
    setUserPreferences(prev => ({ 
      ...prev, 
      voiceEnabled: !prev.voiceEnabled 
    }));
  };

  const setPreferredPersonality = (personality: string) => {
    setUserPreferences(prev => ({ 
      ...prev, 
      preferredPersonality: personality 
    }));
  };

  const trackInteraction = (companionId: string) => {
    // Track this interaction
    AIAnalyticsService.trackEvent(
      user?.id || 'anonymous', 
      'ai_companion_interaction',
      { companionId }
    );

    setRecentInteractions(prev => {
      const now = new Date();
      const existingIndex = prev.findIndex(i => i.companionId === companionId);
      
      if (existingIndex >= 0) {
        // Update existing interaction
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          lastInteractionAt: now,
          messageCount: updated[existingIndex].messageCount + 1
        };
        return updated;
      } else {
        // Add new interaction
        return [...prev, {
          companionId,
          lastInteractionAt: now,
          messageCount: 1
        }];
      }
    });
  };

  const clearCurrentCompanion = () => {
    setCurrentCompanion(null);
  };

  return (
    <AIContext.Provider
      value={{
        currentCompanion,
        recentInteractions,
        userPreferences,
        setCurrentCompanion,
        toggleVoicePreference,
        setPreferredPersonality,
        trackInteraction,
        clearCurrentCompanion
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
