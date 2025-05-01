
import React from 'react';
import { HermesStatus } from '@/types/boost';
import { Users, TrendingUp, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  const { position, activeUsers, estimatedVisibility, lastUpdateTime } = hermesStatus;
  
  // Calculate visibility level indicator (0-100)
  const visibilityLevel = Math.min(100, Math.max(0, estimatedVisibility));
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-muted-foreground" />
                Current Visibility
              </span>
              <span className="font-medium">{visibilityLevel}%</span>
            </div>
            <Progress value={visibilityLevel} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                Active Users
              </div>
              <p className="font-medium">{activeUsers}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground">
                <BarChart className="h-4 w-4 mr-1" />
                Queue Position
              </div>
              <p className="font-medium">{position > 0 ? `#${position}` : 'Not in queue'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-xs text-center text-muted-foreground">
        Last updated: {new Date(lastUpdateTime).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default HermesBoostInfo;
