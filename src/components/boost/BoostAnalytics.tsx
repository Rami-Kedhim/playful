
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BoostAnalyticsCard from './BoostAnalyticsCard';
import { AnalyticsData } from '@/types/analytics';

interface BoostAnalyticsProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
  creatorId: string;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({ 
  isActive, 
  getAnalytics,
  creatorId
}) => {
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchAnalytics();
  }, [getAnalytics]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
        Error loading analytics: {error}
      </div>
    );
  }

  // Create a complete AnalyticsData object with default values for missing properties
  const completeAnalyticsData: AnalyticsData = {
    totalBoosts: analyticsData?.totalBoosts || 0,
    activeBoosts: analyticsData?.activeBoosts || 0,
    averageBoostScore: analyticsData?.averageBoostScore || 0,
    views: analyticsData?.views || 0,
    impressions: analyticsData?.impressions || { value: 0, change: 0 },
    interactions: analyticsData?.interactions || { value: 0, change: 0 },
    additionalViews: analyticsData?.additionalViews || 0,
    engagementIncrease: analyticsData?.engagementIncrease || 0,
    rankingPosition: analyticsData?.rankingPosition || 0
  };

  return (
    <div className="space-y-6">
      <BoostAnalyticsCard 
        isActive={isActive}
        analyticsData={completeAnalyticsData}
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground">
            <p>Analytics data shows the impact of profile boosting on your visibility and interactions.</p>
            <p className="mt-2">Boost your profile to see detailed analytics data here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoostAnalytics;
