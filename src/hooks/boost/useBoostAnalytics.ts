
import { useState, useEffect } from 'react';
import { BoostAnalytics } from '@/types/boost';

export interface AnalyticsData extends BoostAnalytics {}

export const useBoostAnalytics = (profileId: string) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!profileId) return;
      
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockData: BoostAnalytics = {
          impressions: {
            today: 324,
            yesterday: 217,
            weeklyAverage: 245,
            withBoost: 324,
            withoutBoost: 120,
            increase: 170
          },
          interactions: {
            today: 87,
            yesterday: 42,
            weeklyAverage: 53,
            withBoost: 87,
            withoutBoost: 29,
            increase: 200
          },
          rank: {
            current: 14,
            previous: 73,
            change: 59
          },
          trending: true,
          additionalViews: 204,
          engagementIncrease: 107,
          rankingPosition: 14,
          clicks: {
            today: 42,
            yesterday: 21,
            weeklyAverage: 25,
            withBoost: 42,
            withoutBoost: 15,
            increase: 180
          }
        };
        
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch boost analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [profileId]);
  
  return { data, loading };
};

export default useBoostAnalytics;
