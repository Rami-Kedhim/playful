
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BoostAnalyticsCard from './BoostAnalyticsCard';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';

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

  useEffect(() => {
    setHistoryLoading(false);
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
        Error loading analytics: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BoostAnalyticsCard 
        isActive={isActive} 
        getAnalytics={getAnalytics}
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
