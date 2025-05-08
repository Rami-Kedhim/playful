
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

        // Correct reportUserAction usage; call with two arguments respectively
        await reportUserAction('viewed_livecam', streamerId);

        const recommendedInsight = baseInsights?.find(ins => ins.type === 'recommendedProfileId');
        const popularCategoryInsight = baseInsights?.find(ins => ins.type === 'popularCategory');
        const trendingTagInsight = baseInsights?.find(ins => ins.type === 'trendingTag');

        setLivecamInsights({
          recommendedProfileId: recommendedInsight?.value as string,
          popularCategory: popularCategoryInsight?.value as string,
          trendingTag: trendingTagInsight?.value as string,
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
      if (reportUserAction) {
        await reportUserAction('livecam_session', streamerId);
      }
    },
    [reportUserAction],
  );

  const recordLivecamTip = useCallback(
    async (streamerId: string, amount: number, message?: string) => {
      if (reportUserAction) {
        await reportUserAction('livecam_tip', streamerId);
      }
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
