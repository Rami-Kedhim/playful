
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
    insights: baseInsights,
  } = useHermesInsights();

  const [livecamInsights, setLivecamInsights] = useState<LivecamInsight>({ isLoading: false });

  const recordLivecamView = useCallback(
    async (streamerId: string, category?: string) => {
      if (!userId) {
        console.warn('Cannot report to HERMES: missing userId');
        return;
      }

      try {
        setLivecamInsights(prev => ({ ...prev, isLoading: true }));

        // reportUserAction expects string action and optional category and data
        await reportUserAction('viewed_livecam', category || 'general', {
          location: streamerId,
        });

        setLivecamInsights({
          recommendedProfileId: baseInsights.recommendedProfileId,
          popularCategory: baseInsights.popularCategory,
          trendingTag: baseInsights.trendingTag,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error getting livecam insights:', error);
        setLivecamInsights(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to get livecam insights',
        }));
      }
    },
    [userId, reportUserAction, baseInsights],
  );

  const recordLivecamSession = useCallback(
    async (streamerId: string, duration: number, category?: string) => {
      await reportUserAction('livecam_session', category || 'general', {
        location: streamerId,
        sessionTime: duration,
      });
    },
    [reportUserAction],
  );

  const recordLivecamTip = useCallback(
    async (streamerId: string, amount: number, message?: string) => {
      await reportUserAction('livecam_tip', 'tip', {
        location: streamerId,
        amount,
        message,
      });
    },
    [reportUserAction],
  );

  return {
    livecamInsights,
    recordLivecamView,
    recordLivecamSession,
    recordLivecamTip,
  };
}

export default useHermesLivecamInsights;
