
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Users, Star } from 'lucide-react';
import { HermesBoostStatus } from '@/types/boost';

interface HermesBoostInfoProps {
  hermesStatus: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ 
  hermesStatus
}) => {
  const position = hermesStatus?.position || 0;
  const activeUsers = hermesStatus?.activeUsers || 0;
  const estimatedVisibility = hermesStatus?.estimatedVisibility || 0;
  
  // Calculate metrics
  const positionPercentile = activeUsers ? Math.max(0, 100 - (position / activeUsers) * 100) : 0;
  const visibilityClass = estimatedVisibility > 75 ? 'text-green-500' : 
                          estimatedVisibility > 50 ? 'text-yellow-500' : 'text-red-500';
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          <h3 className="font-medium">Visibility Analytics</h3>
        </div>
        <Badge variant="outline">Hermès Algorithm</Badge>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">Position Ranking</span>
            <span className="font-medium">{position} of {activeUsers}</span>
          </div>
          <Progress 
            value={positionPercentile} 
            className="h-2"
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">Estimated Visibility</span>
            <span className={`font-medium ${visibilityClass}`}>{estimatedVisibility}%</span>
          </div>
          <Progress 
            value={estimatedVisibility} 
            className="h-2"
          />
        </div>
        
        <div className="rounded-md bg-muted p-3 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>
              Your profile is in the <strong>top {Math.round(positionPercentile)}%</strong> of active profiles
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Card className="bg-muted/40">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <Users className="h-4 w-4 mb-1 text-blue-500" />
            <span className="text-xs text-muted-foreground">Active Users</span>
            <span className="font-bold text-lg">{activeUsers}</span>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <Star className="h-4 w-4 mb-1 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Visibility</span>
            <span className="font-bold text-lg">{estimatedVisibility}%</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HermesBoostInfo;
