import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HermesOxumQueueVisualization from '@/components/creators/dashboard/boost/HermesOxumQueueVisualization';
import { useBoostAnalytics } from '@/hooks/boost/useBoostAnalytics';
import { BoostStatus } from '@/types/pulse-boost';
import { AnalyticsHeader } from '../analytics';
import { AnalyticsStats } from '../analytics';
import { AnalyticsCharts } from '../analytics';
import { AnalyticsSummary } from '../analytics';

interface BoostAnalyticsProps {
  profileId?: string;
  boostStatus?: BoostStatus;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({
  profileId,
  boostStatus,
}) => {
  const { analytics, loading, error } = useBoostAnalytics(profileId || "");

  return (
    <div className="space-y-6">
      <AnalyticsHeader title="Boost Analytics" description="Track the performance of your boosts" />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Boosts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div>{analytics?.totalBoosts || 0}</div>
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
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div>{analytics?.activeBoosts || 0}</div>
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
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div>{analytics?.averageBoostScore || 0}</div>
            )}
          </CardContent>
        </Card>
        
        <HermesOxumQueueVisualization 
          userId={profileId} 
          activeBoosts={boostStatus?.isActive ? 1 : 0}
        />
      </div>
      
    </div>
  );
};

export default BoostAnalytics;
