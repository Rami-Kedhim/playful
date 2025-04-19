import { useState, useCallback } from 'react';
import { useHermesInsights } from './useHermesInsights';

export interface LivecamInsight {
  recommendedProfileId?: string;
  popularCategory?: string;
  trendingTag?: string;
  isLoading: boolean;
  error?: string;
}

export function useHermesLivecamInsights(userId?: string) {
  const { 
    reportUserAction, 
    insights: baseInsights 
  } = useHermesInsights(userId);
  
  const [livecamInsights, setLivecamInsights] = useState<LivecamInsight>({
    isLoading: false
  });
  
  /**
   * Record livecam view in HERMES
   */
  const recordLivecamView = useCallback(async (
    streamerId: string, 
    category?: string
  ) => {
    if (!userId) {
      console.warn('Cannot report to HERMES: missing userId');
      return;
    }
    
    try {
      setLivecamInsights(prev => ({ ...prev, isLoading: true }));
      
      // Get response from HERMES
      const response = await reportUserAction('viewed_livecam', 'livecam', {
        location: streamerId,
        category: category || 'general'
      });
      
      if (response) {
        // Update insights from response with proper type checking
        setLivecamInsights({
          recommendedProfileId: response.recommendedProfile,
          // Type-check and provide fallbacks for potentially missing properties
          popularCategory: response.popularCategory,
          trendingTag: response.trendingTag,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Error getting livecam insights:', error);
      setLivecamInsights(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to get livecam insights' 
      }));
    }
  }, [userId, reportUserAction]);
  
  /**
   * Record livecam session duration
   */
  const recordLivecamSession = useCallback(async (
    streamerId: string,
    duration: number,
    category?: string
  ) => {
    await reportUserAction('livecam_session', 'livecam', {
      location: streamerId,
      category: category || 'general',
      sessionTime: duration
    });
  }, [reportUserAction]);
  
  /**
   * Record tip sent in livecam
   */
  const recordLivecamTip = useCallback(async (
    streamerId: string,
    amount: number,
    message?: string
  ) => {
    await reportUserAction('livecam_tip', 'livecam', {
      location: streamerId,
      category: 'tip',
      amount,
      message
    });
  }, [reportUserAction]);

  return {
    livecamInsights,
    recordLivecamView,
    recordLivecamSession,
    recordLivecamTip
  };
}

export default useHermesLivecamInsights;
