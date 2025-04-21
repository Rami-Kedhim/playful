
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HermesBoostStatus } from '@/hooks/boost/useHermesOxumBoost';

export interface HermesBoostInfoProps {
  hermesData: HermesBoostStatus | null;
}

const HermesBoostInfo = ({ hermesData }: HermesBoostInfoProps) => {
  if (!hermesData || !hermesData.active) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Hermes Boost Status</CardTitle>
        <CardDescription>Boost processing through Hermes-Oxum system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {hermesData.queuePosition && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Queue Position</span>
              <span>{hermesData.queuePosition}</span>
            </div>
            <Progress value={Math.max(0, 100 - (hermesData.queuePosition * 10))} className="h-1" />
          </div>
        )}
        
        {hermesData.estimatedTimeMinutes && (
          <div className="text-xs">
            Estimated processing time: {hermesData.estimatedTimeMinutes} minute(s)
          </div>
        )}
        
        {hermesData.hermesScore && (
          <div className="text-xs">
            Hermes Score: {hermesData.hermesScore}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
