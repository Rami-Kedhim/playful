
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HermesBoostStatus } from '@/types/boost';
import { formatDistanceToNow } from 'date-fns';

interface HermesBoostInfoProps {
  hermesStatus: HermesBoostStatus;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  const visibilityPercent = hermesStatus.estimatedVisibility || 0;
  const lastUpdateTime = hermesStatus.lastUpdateTime ? 
    formatDistanceToNow(new Date(hermesStatus.lastUpdateTime), { addSuffix: true }) :
    'unknown';
    
  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-3">
        <h3 className="font-medium">Estimated Visibility</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Current visibility</span>
            <span className="font-medium">{visibilityPercent}%</span>
          </div>
          <Progress value={visibilityPercent} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground">
          Based on current traffic and active users
        </p>
      </Card>
      
      <Card className="p-4">
        <div className="space-y-3">
          <h3 className="font-medium">Position Analytics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Position</div>
              <div className="font-medium">#{hermesStatus.position || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="font-medium">{hermesStatus.activeUsers || 0}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdateTime}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HermesBoostInfo;
