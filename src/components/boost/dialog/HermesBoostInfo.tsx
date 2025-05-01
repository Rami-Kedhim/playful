
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, PieChart } from "lucide-react";
import { HermesStatus } from "@/types/boost";

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
  isActive?: boolean;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({
  hermesStatus,
  isActive = false
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-secondary/20 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Visibility Analysis</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Based on current platform activity and your profile stats
        </p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Current Position</span>
              <span className="font-medium">{hermesStatus.position} of {hermesStatus.activeUsers}</span>
            </div>
            <Progress 
              value={Math.max(0, 100 - (hermesStatus.position / hermesStatus.activeUsers * 100))} 
              className="h-1"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Estimated Visibility</span>
              <span className="font-medium">{hermesStatus.estimatedVisibility}%</span>
            </div>
            <Progress value={hermesStatus.estimatedVisibility} className="h-1" />
          </div>
          
          {isActive && hermesStatus.boostScore !== undefined && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Boost Effectiveness</span>
                <span className="font-medium">{hermesStatus.effectivenessScore}%</span>
              </div>
              <Progress value={hermesStatus.effectivenessScore || 0} className="h-1" />
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-secondary/20 p-3 rounded-md">
          <Users className="h-4 w-4 mb-2 text-blue-500" />
          <div className="text-xs font-medium">{hermesStatus.activeUsers}</div>
          <div className="text-xs text-muted-foreground">Active Users</div>
        </div>
        
        <div className="bg-secondary/20 p-3 rounded-md">
          <PieChart className="h-4 w-4 mb-2 text-purple-500" />
          <div className="text-xs font-medium">{hermesStatus.boostScore || 0}</div>
          <div className="text-xs text-muted-foreground">Boost Score</div>
        </div>
        
        <div className="bg-secondary/20 p-3 rounded-md">
          <TrendingUp className="h-4 w-4 mb-2 text-green-500" />
          <div className="text-xs font-medium">{hermesStatus.position}</div>
          <div className="text-xs text-muted-foreground">Current Rank</div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Last updated: {new Date(hermesStatus.lastUpdateTime).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default HermesBoostInfo;
