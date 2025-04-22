
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react'; // Change InfoCircle to Info
import { HermesBoostInfoProps } from '../types';

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ 
  hermesStatus,
  status,
  hermesData
}) => {
  // Use any provided data source, starting with hermesStatus
  const data = hermesStatus || status || hermesData;
  
  if (!data) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Hermes® Boost Info</span>
          </div>
          <div className="text-sm">
            Last updated: <span className="font-medium">just now</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Position</div>
            <div className="text-xl font-semibold">#{data.position}</div>
            <Progress value={30} className="h-1" />
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Active Users</div>
            <div className="text-xl font-semibold">{data.activeUsers}</div>
            <Progress value={65} className="h-1" />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Est. Visibility</span>
            <span>{data.estimatedVisibility}%</span>
          </div>
          <Progress value={data.estimatedVisibility} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
