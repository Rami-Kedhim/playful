
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HermesStatus } from '@/types/pulse-boost';
import { AlertCircle, BarChart2, Users } from 'lucide-react';

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
  isActive?: boolean;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({
  hermesStatus,
  isActive = false
}) => {
  // Format the last update time
  const lastUpdate = new Date(hermesStatus.lastUpdateTime || Date.now()).toLocaleString();
  const boostScore = hermesStatus.boostScore || 0;
  const effectivenessScore = hermesStatus.effectivenessScore || 0;
  
  return (
    <Card className="border border-muted">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
            Hermes Boost Analytics
          </h3>
          <p className="text-xs text-muted-foreground">
            Real-time visibility metrics powered by Hermes AI
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs">Boost Score</span>
              <span className="text-xs font-medium">{boostScore}</span>
            </div>
            <Progress value={boostScore} className="h-1" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs">Effectiveness</span>
              <span className="text-xs font-medium">{effectivenessScore}%</span>
            </div>
            <Progress value={effectivenessScore} className="h-1" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs">Position</div>
              <div className="font-medium text-sm">{isActive ? hermesStatus.position : 'N/A'}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs">Active Users</div>
              <div className="font-medium text-sm">{hermesStatus.activeUsers || 0}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 p-2 rounded text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Estimated Visibility</span>
            <span className="font-medium">{hermesStatus.estimatedVisibility || 0}%</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Last update</span>
            <span>{lastUpdate}</span>
          </div>
        </div>
        
        <div className="text-xs italic text-muted-foreground">
          The Hermes system uses advanced algorithms to optimize profile visibility and engagement.
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
