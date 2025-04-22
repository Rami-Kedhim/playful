
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { HermesBoostInfoProps } from '../types';

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleTimeString();
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Current Position</div>
            <div className="text-2xl font-bold">{hermesStatus.position}</div>
            <div className="text-xs text-muted-foreground mt-1">Out of {hermesStatus.activeUsers} active users</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Visibility</div>
            <div className="text-2xl font-bold">{hermesStatus.estimatedVisibility}%</div>
            <Progress
              value={hermesStatus.estimatedVisibility}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
        <Info className="h-3 w-3" /> Last updated: {formatDate(hermesStatus.lastUpdateTime)}
      </div>
    </div>
  );
};

export default HermesBoostInfo;
