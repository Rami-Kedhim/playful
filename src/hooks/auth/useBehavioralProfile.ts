
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { BehavioralProfile, BehaviorTag, getDefaultBehavioralProfile } from '@/types/behavioral';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook for managing and accessing the user's behavioral profile
 * Part of the HERMES-OXUM + Gouldian system architecture
 */
export const useBehavioralProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<BehavioralProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Load the behavioral profile from storage or create a new one
  const loadBehavioralProfile = useCallback(async () => {
    if (!user?.id) return null;
    
    try {
      setIsLoading(true);
      
      // In a production environment, this would fetch from a database table
      // For now, we'll use local storage as a simple storage mechanism
      const storedProfile = localStorage.getItem(`behavioral_profile_${user.id}`);
      
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        // Update the lastActiveAt date
        parsedProfile.interactionHistory.lastActiveAt = new Date();
        setProfile(parsedProfile);
        return parsedProfile;
      } else {
        // Create a new default profile
        const newProfile = getDefaultBehavioralProfile(user.id);
        setProfile(newProfile);
        localStorage.setItem(`behavioral_profile_${user.id}`, JSON.stringify(newProfile));
        return newProfile;
      }
    } catch (error) {
      console.error('Error loading behavioral profile:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);
  
  // Record a behavioral tag for the user
  const recordBehavior = useCallback((tag: BehaviorTag) => {
    if (!profile || !user?.id) return;
    
    const updatedProfile = { ...profile };
    
    // Add the tag if it doesn't already exist
    if (!updatedProfile.behaviorTags.includes(tag)) {
      updatedProfile.behaviorTags.push(tag);
    }
    
    // Update trust score based on behavior tag
    switch (tag) {
      case 'repeat-no-pay':
      case 'multi-account':
      case 'message-mirroring':
      case 'emotional-baiting':
      case 'voice-farming':
        updatedProfile.trustScore = Math.max(0, updatedProfile.trustScore - 10);
        break;
      case 'low-trust':
        updatedProfile.trustScore = Math.max(0, updatedProfile.trustScore - 15);
        break;
      case 'high-value':
        updatedProfile.trustScore = Math.min(100, updatedProfile.trustScore + 10);
        break;
      case 'regular-spender':
        updatedProfile.trustScore = Math.min(100, updatedProfile.trustScore + 5);
        break;
      default:
        // No change for other tags
        break;
    }
    
    setProfile(updatedProfile);
    localStorage.setItem(`behavioral_profile_${user.id}`, JSON.stringify(updatedProfile));
    
    // In a production environment, this would also be saved to a database
  }, [profile, user?.id]);
  
  // Record an interaction with the system
  const recordInteraction = useCallback((interactionType: 'message' | 'voice' | 'content' | 'payment', value: number = 1) => {
    if (!profile || !user?.id) return;
    
    const updatedProfile = { ...profile };
    
    // Update the interaction history
    switch (interactionType) {
      case 'message':
        updatedProfile.interactionHistory.messagesExchanged += value;
        break;
      case 'voice':
        updatedProfile.interactionHistory.voiceInteractions += value;
        break;
      case 'content':
        updatedProfile.interactionHistory.contentViews += value;
        break;
      case 'payment':
        updatedProfile.interactionHistory.totalSpent += value;
        
        // Update conversion rate
        const totalInteractions = 
          updatedProfile.interactionHistory.messagesExchanged + 
          updatedProfile.interactionHistory.voiceInteractions +
          updatedProfile.interactionHistory.contentViews;
        
        if (totalInteractions > 0) {
          updatedProfile.interactionHistory.conversionRate = 
            (updatedProfile.interactionHistory.totalSpent / totalInteractions) * 100;
        }
        
        // Add behavioral tags based on spending patterns
        if (updatedProfile.interactionHistory.totalSpent > 100) {
          if (!updatedProfile.behaviorTags.includes('high-value')) {
            updatedProfile.behaviorTags.push('high-value');
          }
        } else if (updatedProfile.interactionHistory.totalSpent > 20) {
          if (!updatedProfile.behaviorTags.includes('regular-spender')) {
            updatedProfile.behaviorTags.push('regular-spender');
          }
        }
        
        break;
    }
    
    // Always update the last active timestamp
    updatedProfile.interactionHistory.lastActiveAt = new Date();
    
    setProfile(updatedProfile);
    localStorage.setItem(`behavioral_profile_${user.id}`, JSON.stringify(updatedProfile));
    
    // In a production environment, this would also be saved to a database
  }, [profile, user?.id]);
  
  // Load profile on authentication change
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadBehavioralProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated, user?.id, loadBehavioralProfile]);
  
  return {
    profile,
    isLoading,
    recordBehavior,
    recordInteraction,
    refreshProfile: loadBehavioralProfile
  };
};
