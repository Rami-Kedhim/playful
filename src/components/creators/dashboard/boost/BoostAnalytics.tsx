
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HermesOxumQueueVisualization from '@/components/creators/dashboard/boost/HermesOxumQueueVisualization';
import { useBoostAnalytics } from '@/hooks/boost/useBoostAnalytics';
import { BoostStatus } from '@/types/boost';
import { AnalyticsHeader, AnalyticsHeaderProps } from '../analytics';
import { AnalyticsStats } from '../analytics';
import { AnalyticsCharts } from '../analytics';
import { AnalyticsSummary } from '../analytics';
import { AnalyticsData } from '@/types/analytics';

interface BoostAnalyticsProps {
  profileId?: string;
  boostStatus?: BoostStatus;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({
  profileId,
  boostStatus,
}) => {
  const { analytics, loading, error } = useBoostAnalytics(profileId || "");

  // Custom header props because AnalyticsHeader accepts title/description
  const headerProps: AnalyticsHeaderProps = {
    title: "Boost Analytics",
    description: "Track the performance of your boosts"
  };

  // Convert error to object type if it's a string
  const errorObj = typeof error === 'string' ? { message: error } : error || null;

  // Check if boostStatus exists and if it has isActive property
  const isActiveBoost = boostStatus && (boostStatus.isActive === true);

  // Ensure analytics data has all necessary properties
  const analyticData: AnalyticsData = {
    totalBoosts: analytics?.totalBoosts || 0,
    activeBoosts: analytics?.activeBoosts || 0,
    averageBoostScore: analytics?.averageBoostScore || 0,
    views: analytics?.views,
    impressions: analytics?.impressions,
    interactions: analytics?.interactions,
    additionalViews: analytics?.additionalViews,
    engagementIncrease: analytics?.engagementIncrease,
    rankingPosition: analytics?.rankingPosition
  };

  return (
    <div className="space-y-6">
      <AnalyticsHeader {...headerProps} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Boosts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : errorObj ? (
              <div>Error: {errorObj?.message || 'Unknown error'}</div>
            ) : (
              <div>{analyticData.totalBoosts}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Boosts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : errorObj ? (
              <div>Error: {errorObj?.message || 'Unknown error'}</div>
            ) : (
              <div>{analyticData.activeBoosts}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Boost Score</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : errorObj ? (
              <div>Error: {errorObj?.message || 'Unknown error'}</div>
            ) : (
              <div>{analyticData.averageBoostScore}</div>
            )}
          </CardContent>
        </Card>
        
        <HermesOxumQueueVisualization 
          userId={profileId} 
          activeBoosts={isActiveBoost ? 1 : 0}
        />
      </div>
    </div>
  );
};

export default BoostAnalytics;
