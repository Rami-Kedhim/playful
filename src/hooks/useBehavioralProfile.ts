
import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';

export interface BehavioralProfile {
  userId: string;
  behaviorTags: string[];
  interactionHistory: {
    messagesExchanged: number;
    voiceInteractions: number;
    contentViews: number;
    lastActiveAt: Date;
    totalSpent: number;
    conversionRate: number;
    lastLogin: string;
    sessionCount: number;
    averageSessionDuration: number;
    clickPatterns: { category: string; count: number; }[];
  };
  trustScore: number;
  currentSystemSettings: {
    hermesMode: string;
    oxumPriceMultiplier: number;
    toneFilter: string;
    responseDelayMs: number;
    trustScore: number;
  };
}

export const useBehavioralProfile = () => {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<BehavioralProfile>({
    userId: user?.id || 'anonymous',
    behaviorTags: ['normal', 'content-focused'],
    interactionHistory: {
      messagesExchanged: 42,
      voiceInteractions: 5,
      contentViews: 28,
      lastActiveAt: new Date(),
      totalSpent: 25,
      conversionRate: 0.05,
      lastLogin: '2023-12-01',
      sessionCount: 15,
      averageSessionDuration: 12.5,
      clickPatterns: [
        { category: 'content', count: 25 },
        { category: 'profiles', count: 15 },
        { category: 'settings', count: 5 }
      ]
    },
    trustScore: 75,
    currentSystemSettings: {
      hermesMode: 'emotional',
      oxumPriceMultiplier: 1.0,
      toneFilter: 'authentic',
      responseDelayMs: 0,
      trustScore: 75
    }
  });
  
  const updateProfile = useCallback((updatedProfile: Partial<BehavioralProfile>) => {
    setProfile(current => ({
      ...current,
      ...updatedProfile
    }));
  }, []);
  
  const updateBehaviorTags = useCallback((newTags: string[]) => {
    setProfile(current => ({
      ...current,
      behaviorTags: newTags
    }));
  }, []);
  
  const updateSystemSettings = useCallback((settings: Partial<BehavioralProfile['currentSystemSettings']>) => {
    setProfile(current => ({
      ...current,
      currentSystemSettings: {
        ...current.currentSystemSettings,
        ...settings
      }
    }));
  }, []);
  
  return {
    profile,
    updateProfile,
    updateBehaviorTags,
    updateSystemSettings
  };
};
