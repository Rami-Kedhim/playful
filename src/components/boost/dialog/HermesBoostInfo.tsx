
import React from 'react';
import { HermesStatus } from '@/types/boost';
import { Star, TrendingUp, Users, Sparkles } from 'lucide-react';

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary/20 p-3 rounded-md flex flex-col items-center">
          <TrendingUp className="h-4 w-4 mb-1 text-green-500" />
          <span className="text-sm font-semibold">#{hermesStatus.position}</span>
          <span className="text-xs text-muted-foreground">Position</span>
        </div>
        
        <div className="bg-secondary/20 p-3 rounded-md flex flex-col items-center">
          <Users className="h-4 w-4 mb-1 text-blue-500" />
          <span className="text-sm font-semibold">{hermesStatus.activeUsers}</span>
          <span className="text-xs text-muted-foreground">Active Users</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary/20 p-3 rounded-md flex flex-col items-center">
          <Sparkles className="h-4 w-4 mb-1 text-yellow-500" />
          <span className="text-sm font-semibold">
            {hermesStatus.estimatedVisibility}%
          </span>
          <span className="text-xs text-muted-foreground">Visibility</span>
        </div>
        
        <div className="bg-secondary/20 p-3 rounded-md flex flex-col items-center">
          <Star className="h-4 w-4 mb-1 text-amber-500" />
          <span className="text-sm font-semibold">
            {hermesStatus.boostScore || 0}/100
          </span>
          <span className="text-xs text-muted-foreground">Boost Score</span>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        Last updated: {new Date(hermesStatus.lastUpdateTime).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default HermesBoostInfo;
