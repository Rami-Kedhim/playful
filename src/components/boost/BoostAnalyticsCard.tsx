
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, Eye, MousePointer } from 'lucide-react';
import { BoostAnalyticsItem } from '@/types/boost';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard: React.FC<BoostAnalyticsCardProps> = ({ isActive, getAnalytics }) => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [isActive]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch boost analytics', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  };

  const formatChange = (change?: number): string => {
    if (change === undefined) return '';
    return change > 0 ? `+${change}%` : `${change}%`;
  };

  const formatMetricValue = (item?: BoostAnalyticsItem): string => {
    if (!item) return '0';
    return item.value.toString();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Boost Analytics</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary/20 p-3 rounded-md">
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Views</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-semibold">
                {analytics?.views || 0}
              </div>
              {analytics?.views && analytics.views.change !== undefined && (
                <div className={`text-xs ${analytics.views.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatChange(analytics.views.change)}
                </div>
              )}
            </div>
            {isActive && analytics?.views && analytics.views.withBoost !== undefined && (
              <div className="text-xs text-green-500 mt-1">
                +{analytics.views.withBoost} with boost
              </div>
            )}
          </div>

          <div className="bg-secondary/20 p-3 rounded-md">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Impressions</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-semibold">
                {analytics?.impressions?.today || 0}
              </div>
              {analytics?.impressions && (
                <div className={`text-xs ${(analytics.impressions.change || 0) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatChange(analytics.impressions.change)}
                </div>
              )}
            </div>
            {isActive && analytics?.impressions && analytics.impressions.withBoost && (
              <div className="text-xs text-green-500 mt-1">
                +{analytics.impressions.withBoost} with boost
              </div>
            )}
          </div>

          <div className="bg-secondary/20 p-3 rounded-md">
            <div className="flex items-center space-x-2 mb-1">
              <MousePointer className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Interactions</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-semibold">
                {analytics?.interactions?.today || 0}
              </div>
              {analytics?.interactions && (
                <div className={`text-xs ${(analytics.interactions.change || 0) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatChange(analytics.interactions.change)}
                </div>
              )}
            </div>
            {isActive && analytics?.interactions && analytics.interactions.withBoost && (
              <div className="text-xs text-green-500 mt-1">
                +{analytics.interactions.withBoost} with boost
              </div>
            )}
          </div>
        </div>

        {/* Additional metrics */}
        {analytics && analytics.additionalViews !== undefined && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Your profile has received </span>
              <span className="font-bold text-primary">{analytics.additionalViews} additional views</span>
              <span className="font-medium"> since you started using PULSE Boost.</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
