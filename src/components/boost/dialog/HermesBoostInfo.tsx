
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Users, TrendingUp } from 'lucide-react';
import { HermesBoostStatus } from '@/types/boost';
import { HermesBoostInfoProps } from '../types';

const HermesBoostInfo = ({ hermesStatus, isActive = false }: HermesBoostInfoProps) => {
  if (!hermesStatus) return null;
  
  const { position, activeUsers, estimatedVisibility, boostScore = 0, effectivenessScore = 0 } = hermesStatus;
  
  return (
    <Card className="bg-muted/30 border-none mt-4">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium flex items-center">
            <Zap className="h-4 w-4 mr-1 text-amber-500" />
            Hermes Boost Analytics
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Visibility Score
              </span>
              <span className="font-medium">{estimatedVisibility}%</span>
            </div>
            <Progress value={estimatedVisibility} className="h-1" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center">
              <Users className="h-3 w-3 mr-1" />
              Current Position
            </span>
            <span className="font-medium">{position} of {activeUsers}</span>
          </div>

          {boostScore > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Boost Power</span>
              <span className="font-medium">{boostScore.toFixed(1)}</span>
            </div>
          )}

          {effectivenessScore > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Effectiveness</span>
              <span className="font-medium">{effectivenessScore.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
