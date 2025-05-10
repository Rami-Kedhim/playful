
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnalyticsData } from '@/types/analytics';

interface BoostAnalyticsCardProps {
  isActive: boolean;
  analyticsData: AnalyticsData;
}

const BoostAnalyticsCard: React.FC<BoostAnalyticsCardProps> = ({
  isActive,
  analyticsData
}) => {
  // Format numbers for display
  const formatNumber = (num?: number): string => {
    if (num === undefined) return '0';
    return num.toLocaleString();
  };

  // Format percentage change
  const formatChange = (change?: number): string => {
    if (change === undefined) return '0%';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change}%`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Profile Views</h3>
            <p className="text-2xl font-bold">{formatNumber(analyticsData?.views)}</p>
            {analyticsData?.impressions?.change !== undefined && (
              <p className={`text-xs ${analyticsData.impressions.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatChange(analyticsData.impressions.change)} from last period
              </p>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Impressions</h3>
            <p className="text-2xl font-bold">{formatNumber(analyticsData?.impressions?.value)}</p>
            {analyticsData?.impressions?.change !== undefined && (
              <p className={`text-xs ${analyticsData.impressions.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatChange(analyticsData.impressions.change)} from last period
              </p>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Interactions</h3>
            <p className="text-2xl font-bold">{formatNumber(analyticsData?.interactions?.value)}</p>
            {analyticsData?.interactions?.change !== undefined && (
              <p className={`text-xs ${analyticsData.interactions.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatChange(analyticsData.interactions.change)} from last period
              </p>
            )}
          </div>
        </div>
        
        {isActive && analyticsData?.additionalViews !== undefined && (
          <div className="mt-6 p-4 bg-primary/10 rounded border border-primary/20">
            <h3 className="font-medium">Boost Impact</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your profile has received approximately {formatNumber(analyticsData.additionalViews)} additional views due to active boosting.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
