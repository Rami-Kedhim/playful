
import React from 'react';

interface BoostAnalyticsProps {
  analytics: {
    views?: number;
    impressions?: {
      value: number;
      change?: number;
      today?: number;
      withBoost?: number;
    };
    interactions?: {
      value: number;
      change?: number;
      today?: number;
      withBoost?: number;
    };
    totalBoosts?: number;
    activeBoosts?: number;
    averageBoostScore?: number;
  };
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({ analytics }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Boost Analytics</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted rounded-md p-4">
          <div className="text-sm text-muted-foreground">Impressions</div>
          <div className="text-2xl font-bold mt-1">
            {analytics.impressions?.value || 0}
          </div>
          {analytics.impressions?.change !== undefined && (
            <div className={`text-xs ${analytics.impressions.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {analytics.impressions.change >= 0 ? '+' : ''}{analytics.impressions.change}%
            </div>
          )}
        </div>
        
        <div className="bg-muted rounded-md p-4">
          <div className="text-sm text-muted-foreground">Interactions</div>
          <div className="text-2xl font-bold mt-1">
            {analytics.interactions?.value || 0}
          </div>
          {analytics.interactions?.change !== undefined && (
            <div className={`text-xs ${analytics.interactions.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {analytics.interactions.change >= 0 ? '+' : ''}{analytics.interactions.change}%
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-md p-4">
        <div className="text-sm font-medium">Boost Impact</div>
        <div className="mt-2 text-sm">
          <div className="flex justify-between">
            <span>Active Boosts:</span>
            <span className="font-medium">{analytics.activeBoosts || 0}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Total Boosts:</span>
            <span className="font-medium">{analytics.totalBoosts || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostAnalytics;
