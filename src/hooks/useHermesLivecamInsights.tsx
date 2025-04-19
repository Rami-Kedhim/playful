
// Fix type usage here by importing HermesInsight type and properly accessing insights array elements
import { useState, useCallback } from 'react';
import { useHermesInsights } from './useHermesInsights';
import type { HermesInsight } from '@/types/seo';

export interface LivecamInsight {
  recommendedProfileId?: string;
  popularCategory?: string;
  trendingTag?: string;
  isLoading: boolean;
  error?: string;
}

export function useHermesLivecamInsights(userId?: string) {
  const { reportUserAction, insights: baseInsightsRaw } = useHermesInsights();

  // Assume insights is HermesInsight[] array
  const baseInsights = baseInsightsRaw as HermesInsight[];

  const [livecamInsights, setLivecamInsights] = useState<LivecamInsight>({ isLoading: false });

  const recordLivecamView = useCallback(
    async (streamerId: string, category?: string) => {
      if (!userId) {
        console.warn('Cannot report to HERMES: missing userId');
        return;
      }
      try {
        setLivecamInsights(prev => ({ ...prev, isLoading: true }));

        // reportUserAction expects 2 args: action string and data object
        await reportUserAction('viewed_livecam', {
          category: category || 'general',
          location: streamerId,
        });

        // Extract values from insights array based on type key
        const recommendedInsight = baseInsights.find(ins => ins.type === 'recommendedProfileId');
        const popularCategoryInsight = baseInsights.find(ins => ins.type === 'popularCategory');
        const trendingTagInsight = baseInsights.find(ins => ins.type === 'trendingTag');

        setLivecamInsights({
          recommendedProfileId: recommendedInsight?.value as string | undefined,
          popularCategory: popularCategoryInsight?.value as string | undefined,
          trendingTag: trendingTagInsight?.value as string | undefined,
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
      await reportUserAction('livecam_session', {
        category: category || 'general',
        location: streamerId,
        sessionTime: duration,
      });
    },
    [reportUserAction],
  );

  const recordLivecamTip = useCallback(
    async (streamerId: string, amount: number, message?: string) => {
      await reportUserAction('livecam_tip', {
        category: 'tip',
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
