
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HermesOxumQueueVisualization from '@/components/creators/dashboard/boost/HermesOxumQueueVisualization';
import { useBoostAnalytics } from '@/hooks/boost/useBoostAnalytics';
import { BoostStatus } from '@/types/pulse-boost';

interface BoostAnalyticsProps {
  profileId?: string;
  boostStatus?: BoostStatus;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({
  profileId,
  boostStatus,
}) => {
  const { analytics, loading, error } = useBoostAnalytics(profileId || "");

  // Convert error to object type if it's a string
  const errorObj = typeof error === 'string' ? { message: error } : error || null;

  // Check if boostStatus exists and if it has isActive property
  const isActiveBoost = boostStatus && (boostStatus.isActive === true);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Boost Analytics</h2>
      </div>
      
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
              <div className="text-2xl font-bold">{analytics?.totalBoosts || 0}</div>
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
              <div className="text-2xl font-bold">{analytics?.activeBoosts || 0}</div>
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
              <div className="text-2xl font-bold">{analytics?.averageBoostScore || 0}</div>
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
