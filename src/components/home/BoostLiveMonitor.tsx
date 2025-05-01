
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Users, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface BoostLiveMonitorProps {
  stats: {
    activeBoosts: number;
    topBoostScore: number;
    averageVisibility: number;
    peakHours: string[];
    recentChanges: number[];
  } | null;
  isLoading: boolean;
}

const BoostLiveMonitor: React.FC<BoostLiveMonitorProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex-1">
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  
  if (!stats) return null;

  // Determine if overall trend is positive or negative
  const recentTrend = stats.recentChanges.reduce((sum, val) => sum + val, 0);
  const trendType = recentTrend > 0 ? 'positive' : recentTrend < 0 ? 'negative' : 'neutral';

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-background">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-400" />
          <CardTitle>Pulse Boost Live Monitor</CardTitle>
        </div>
        <CardDescription>Real-time platform visibility dynamics powered by Oxum</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col p-4 rounded-md bg-card/50">
            <div className="text-sm text-muted-foreground mb-2">Active Boosts</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stats.activeBoosts}</span>
              <Badge className={trendType === 'positive' ? 'bg-green-600' : 'bg-red-600'}>
                {recentTrend > 0 ? '+' : ''}{recentTrend}
              </Badge>
            </div>
            <div className="flex mt-2 gap-1 items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>Profiles currently boosted</span>
            </div>
          </div>
          
          <div className="flex flex-col p-4 rounded-md bg-card/50">
            <div className="text-sm text-muted-foreground mb-2">Top Boost Score</div>
            <div className="text-3xl font-bold">{stats.topBoostScore}</div>
            <div className="flex mt-2 gap-1 items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>Leading visibility rating</span>
            </div>
          </div>
          
          <div className="flex flex-col p-4 rounded-md bg-card/50">
            <div className="text-sm text-muted-foreground mb-2">Average Visibility</div>
            <div className="text-3xl font-bold">{stats.averageVisibility}%</div>
            <div className="flex mt-2 gap-1 items-center text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>Platform-wide average</span>
            </div>
          </div>
          
          <div className="flex flex-col p-4 rounded-md bg-card/50">
            <div className="text-sm text-muted-foreground mb-2">Peak Hours</div>
            <div className="text-3xl font-bold">{stats.peakHours[0]}</div>
            <div className="flex mt-2 gap-1 items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Best time for visibility</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 h-16 flex items-end gap-1">
          {stats.recentChanges.map((change, i) => {
            const height = Math.abs(change) * 5;
            const isPositive = change > 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end">
                <div 
                  className={`${isPositive ? 'bg-green-500/50' : 'bg-red-500/50'} rounded-t-sm w-full`} 
                  style={{ height: `${height}px`, minHeight: '4px' }}
                />
                <div className="text-xs text-muted-foreground mt-1">{i + 1}h</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostLiveMonitor;
