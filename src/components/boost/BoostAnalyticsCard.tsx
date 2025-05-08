
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, TrendingUp, Users, Eye, BarChart, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AnalyticsData } from '@/types/analytics';

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard = ({ isActive, getAnalytics }: BoostAnalyticsCardProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const analytics = await getAnalytics();
        setData(analytics);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [getAnalytics]);
  
  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (!data) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No analytics data available</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Boost Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isActive ? (
          <>
            {data.rankingPosition && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Ranking Position</span>
                </div>
                <div className="text-xl font-semibold">{data.rankingPosition}</div>
              </div>
            )}
            
            {data.impressions && typeof data.impressions !== 'number' && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Impressions</span>
                  <span className="font-semibold">
                    {data.impressions.today.toLocaleString()}
                    {typeof data.impressions.change === 'number' && data.impressions.change > 0 && (
                      <span className="text-green-500 ml-1">+{data.impressions.change}%</span>
                    )}
                  </span>
                </div>
                
                {typeof data.impressions.withBoost === 'number' && (
                  <div>
                    <Progress value={data.impressions.withBoost} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>With Boost: {data.impressions.withBoost}%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {data.interactions && typeof data.interactions !== 'number' && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Interactions</span>
                  <span className="font-semibold">
                    {data.interactions.today.toLocaleString()}
                    {typeof data.interactions.change === 'number' && data.interactions.change > 0 && (
                      <span className="text-green-500 ml-1">+{data.interactions.change}%</span>
                    )}
                  </span>
                </div>
                
                {typeof data.interactions.withBoost === 'number' && (
                  <div>
                    <Progress value={data.interactions.withBoost} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>With Boost: {data.interactions.withBoost}%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Additional Views</span>
                  <span className="font-semibold text-lg">{data.additionalViews?.toLocaleString() || 0}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Engagement Increase</span>
                  <span className="font-semibold text-lg">{data.engagementIncrease || 0}%</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Users className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground">
              Boost your profile to see detailed analytics
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
