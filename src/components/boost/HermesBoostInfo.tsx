
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { AlignLeft, ArrowUpCircle, Info, BarChart3 } from 'lucide-react';
import { HermesBoostStatus } from '@/types/boost';

export interface HermesBoostInfoProps {
  hermesStatus: HermesBoostStatus;
  isActive?: boolean;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ 
  hermesStatus,
  isActive = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center">
          <BarChart3 className="h-4 w-4 mr-2 text-blue-500" /> 
          Boost Performance Metrics
        </h3>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm">
              <Info className="h-3.5 w-3.5 mr-1" /> 
              What is this?
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Hermes Boost System</h4>
              <p className="text-xs text-muted-foreground">
                The Hermes algorithm optimizes how your profile visibility is distributed across the platform,
                balancing fair exposure with maximum impact.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Position</span>
              <span className="font-medium">#{hermesStatus?.position || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="font-medium">{hermesStatus?.activeUsers || 0}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Visibility</span>
              <span className="font-medium">{hermesStatus?.estimatedVisibility || 0}%</span>
            </div>
            <Progress value={hermesStatus?.estimatedVisibility || 0} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <AlignLeft className="h-3.5 w-3.5" />
          <span>
            Last updated: {hermesStatus?.lastUpdateTime ? new Date(hermesStatus.lastUpdateTime).toLocaleTimeString() : 'N/A'}
          </span>
        </div>
      </div>
      
      {!isActive && (
        <div className="bg-muted p-4 rounded-md text-sm text-center">
          <ArrowUpCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">
            Activate a boost to see real-time analytics here
          </p>
        </div>
      )}
    </div>
  );
};

export default HermesBoostInfo;
