
import { useState } from 'react';
import { BoostAnalytics } from '@/types/core-systems';

export const useBoostAnalytics = (initialData?: Partial<BoostAnalytics>) => {
  const [analytics, setAnalytics] = useState<BoostAnalytics>({
    views: initialData?.views || 0,
    additionalViews: initialData?.additionalViews || 0,
    engagementIncrease: initialData?.engagementIncrease || 0,
    rankingPosition: initialData?.rankingPosition || 0,
    conversionRate: initialData?.conversionRate || 0,
    messageRate: initialData?.messageRate || 0,
    bookingRate: initialData?.bookingRate || 0,
    change: initialData?.change || 0,
    withBoost: initialData?.withBoost || 0,
    withoutBoost: initialData?.withoutBoost || 0,
    boostEfficiency: initialData?.boostEfficiency || 0,
    remainingTime: initialData?.remainingTime || '',
  });

  const updateAnalytics = (data: Partial<BoostAnalytics>) => {
    setAnalytics(prev => ({ ...prev, ...data }));
  };

  // Mock function to simulate refreshing analytics data
  const refreshAnalytics = async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update with random data
    setAnalytics({
      views: Math.floor(Math.random() * 1000),
      additionalViews: Math.floor(Math.random() * 500),
      engagementIncrease: Math.random() * 0.5,
      rankingPosition: Math.floor(Math.random() * 10) + 1,
      conversionRate: Math.random() * 0.25,
      messageRate: Math.random() * 0.15,
      bookingRate: Math.random() * 0.1,
      change: Math.random() * 0.3,
      withBoost: Math.floor(Math.random() * 1000),
      withoutBoost: Math.floor(Math.random() * 500),
      boostEfficiency: Math.random() * 0.9,
      remainingTime: '12:34:56',
    });
  };

  return {
    analytics,
    updateAnalytics,
    refreshAnalytics
  };
};

// Re-export the BoostAnalytics type for components to use
export type { BoostAnalytics };

export default useBoostAnalytics;
