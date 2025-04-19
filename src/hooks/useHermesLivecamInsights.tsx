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
  } = useHermesInsights();
  
  const [livecamInsights, setLivecamInsights] = useState<LivecamInsight>({
    isLoading: false
  });
  
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
      
      const response = await reportUserAction('viewed_livecam', {
        location: streamerId,
        category: category || 'general'
      });
      
      if (response && typeof response === 'object') {
        setLivecamInsights({
          recommendedProfileId: (response as any).recommendedProfile,
          popularCategory: (response as any).popularCategory,
          trendingTag: (response as any).trendingTag,
          isLoading: false
        });
      } else {
        setLivecamInsights(prev => ({ ...prev, isLoading: false }));
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
  
  const recordLivecamSession = useCallback(async (
    streamerId: string,
    duration: number,
    category?: string
  ) => {
    await reportUserAction('livecam_session', {
      location: streamerId,
      category: category || 'general',
      sessionTime: duration
    });
  }, [reportUserAction]);
  
  const recordLivecamTip = useCallback(async (
    streamerId: string,
    amount: number,
    message?: string
  ) => {
    await reportUserAction('livecam_tip', {
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
