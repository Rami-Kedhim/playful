
import { useState, useCallback } from 'react';

interface BoostAnalytics {
  viewsWithBoost: number;
  viewsWithoutBoost: number;
  profileClicksWithBoost: number;
  profileClicksWithoutBoost: number;
  searchPositionAverage: number;
  boostEffectiveness: number; // percentage increase
}

export const useBoostAnalytics = (profileId: string) => {
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate analytics data
      const mockAnalytics: BoostAnalytics = {
        viewsWithBoost: Math.floor(Math.random() * 200) + 100,
        viewsWithoutBoost: Math.floor(Math.random() * 100) + 20,
        profileClicksWithBoost: Math.floor(Math.random() * 50) + 25,
        profileClicksWithoutBoost: Math.floor(Math.random() * 25) + 5,
        searchPositionAverage: Math.random() * 4 + 1, // 1-5 position
        boostEffectiveness: Math.floor(Math.random() * 30) + 70 // 70-100% effectiveness
      };
      
      setAnalytics(mockAnalytics);
      return mockAnalytics;
    } catch (err: any) {
      console.error('Error fetching boost analytics:', err);
      setError(err.message || 'Failed to fetch boost analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics
  };
};

export default useBoostAnalytics;
