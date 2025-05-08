
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp } from 'lucide-react';

interface BoostAnalyticsProps {
  analytics: {
    additionalViews?: number;
    engagementIncrease?: number;
    rankingPosition?: number;
  };
  loading?: boolean;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({ analytics, loading = false }) => {
  const { additionalViews, engagementIncrease, rankingPosition } = analytics;
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            Loading analytics...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-md flex flex-col items-center">
            <TrendingUp className="h-8 w-8 mb-2 text-primary" />
            <div className="text-2xl font-bold">{additionalViews || 0}</div>
            <div className="text-sm text-muted-foreground">Additional Views</div>
          </div>
          
          <div className="p-4 bg-primary/10 rounded-md flex flex-col items-center">
            <BarChart className="h-8 w-8 mb-2 text-primary" />
            <div className="text-2xl font-bold">{engagementIncrease ? `${engagementIncrease}%` : '0%'}</div>
            <div className="text-sm text-muted-foreground">Engagement Increase</div>
          </div>
          
          <div className="p-4 bg-primary/10 rounded-md flex flex-col items-center">
            <div className="h-8 w-8 mb-2 text-primary font-bold text-xl flex items-center justify-center">#</div>
            <div className="text-2xl font-bold">{rankingPosition || 'N/A'}</div>
            <div className="text-sm text-muted-foreground">Ranking Position</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostAnalytics;
