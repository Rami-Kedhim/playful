
import { useState, useEffect } from 'react';
import { AnalyticsData, BoostAnalytics } from '@/types/pulse-boost';
import { boostService } from '@/services/boostService';

export const useBoostAnalytics = (profileId: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | BoostAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const data = await boostService.getBoostAnalytics(profileId);
        setAnalytics(data);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchAnalytics();
    }
  }, [profileId]);

  return { analytics, loading, error };
};

export default useBoostAnalytics;
