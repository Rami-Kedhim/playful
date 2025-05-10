
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData } from '@/types/pulse-boost';
import { ArrowUp, ArrowDown, TrendingUp, Users, Eye, MousePointerClick } from 'lucide-react';

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard: React.FC<BoostAnalyticsCardProps> = ({
  isActive,
  getAnalytics
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getAnalytics();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [getAnalytics]);

  const formatChange = (change?: number) => {
    if (change === undefined) return null;
    
    const isPositive = change > 0;
    const Icon = isPositive ? ArrowUp : ArrowDown;
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
    
    return (
      <div className={`flex items-center ${colorClass}`}>
        <Icon className="h-3 w-3 mr-1" />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  const renderMetricCard = (
    title: string, 
    value: number | undefined, 
    change: number | undefined, 
    icon: React.ReactNode
  ) => {
    return (
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">
              {value !== undefined ? value.toLocaleString() : '-'}
            </h3>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div className="mt-2 text-xs">
            {formatChange(change)}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : !analytics ? (
          <div className="text-center text-muted-foreground p-4">
            No analytics data available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics?.views !== undefined && renderMetricCard(
              'Profile Views', 
              analytics.views, 
              analytics.impressions?.change,
              <Eye className="h-5 w-5 text-primary" />
            )}
            
            {analytics?.impressions?.value !== undefined && renderMetricCard(
              'Impressions', 
              analytics.impressions.value, 
              analytics.impressions.change,
              <Users className="h-5 w-5 text-primary" />
            )}
            
            {analytics?.interactions?.value !== undefined && renderMetricCard(
              'Interactions', 
              analytics.interactions.value, 
              analytics.interactions.change,
              <MousePointerClick className="h-5 w-5 text-primary" />
            )}
            
            {analytics?.additionalViews !== undefined && renderMetricCard(
              'Additional Views', 
              analytics.additionalViews, 
              undefined,
              <TrendingUp className="h-5 w-5 text-primary" />
            )}
          </div>
        )}
        
        {isActive && analytics && (
          <div className="mt-4 p-3 bg-primary/5 rounded-md text-sm">
            <p className="text-muted-foreground">
              Your active boost is providing increased visibility. Compare your performance with and without boost to see the impact.
            </p>
          </div>
        )}
        
        {!isActive && (
          <div className="mt-4 p-3 bg-secondary/20 rounded-md text-sm">
            <p className="text-muted-foreground">
              You don't have an active boost. Activate a boost to increase your profile visibility and engagement.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
