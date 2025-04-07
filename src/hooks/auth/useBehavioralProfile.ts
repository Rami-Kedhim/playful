
import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export interface BehavioralProfile {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  trustScore: number;
  engagementLevel: 'low' | 'moderate' | 'high';
  contentPreferences: string[];
  behaviorTags: string[];
  interactionHistory: {
    lastLogin: string;
    sessionCount: number;
    averageSessionDuration: number;
    clickPatterns: {
      category: string;
      count: number;
    }[];
  };
}

export const useBehavioralProfile = () => {
  const { user, isAuthenticated } = useAuth();
  
  const [profile, setProfile] = useState<BehavioralProfile>({
    id: 'mock-profile',
    userId: user?.id || 'unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trustScore: 65,
    engagementLevel: 'moderate',
    contentPreferences: ['images', 'videos', 'text'],
    behaviorTags: ['early-adopter', 'tech-savvy', 'regular-user'],
    interactionHistory: {
      lastLogin: new Date().toISOString(),
      sessionCount: 12,
      averageSessionDuration: 423,
      clickPatterns: [
        { category: 'profiles', count: 45 },
        { category: 'messages', count: 23 },
        { category: 'settings', count: 8 }
      ]
    }
  });
  
  const updateProfile = useCallback((updates: Partial<BehavioralProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  }, []);
  
  const resetProfile = useCallback(() => {
    if (!user) return;
    
    setProfile({
      id: 'mock-profile',
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trustScore: 50,
      engagementLevel: 'low',
      contentPreferences: [],
      behaviorTags: [],
      interactionHistory: {
        lastLogin: new Date().toISOString(),
        sessionCount: 1,
        averageSessionDuration: 0,
        clickPatterns: []
      }
    });
  }, [user]);
  
  return {
    profile,
    updateProfile,
    resetProfile
  };
};

export default useBehavioralProfile;
