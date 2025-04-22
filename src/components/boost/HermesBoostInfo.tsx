
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HermesBoostStatus } from '@/types/boost';
import { Zap, Users, TrendingUp, Clock } from 'lucide-react';

interface HermesBoostInfoProps {
  hermesStatus: HermesBoostStatus;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  const getVisibilityColor = (visibility: number): string => {
    if (visibility >= 80) return "text-green-500";
    if (visibility >= 50) return "text-amber-500";
    return "text-gray-500";
  };

  const formatLastUpdate = (lastUpdateTime: string): string => {
    if (!lastUpdateTime) return "Not available";
    
    try {
      const updateDate = new Date(lastUpdateTime);
      return updateDate.toLocaleTimeString();
    } catch (e) {
      return "Invalid time";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Boost Analytics</CardTitle>
            <Badge variant="outline" className="ml-2">
              HERMES + OXUM
            </Badge>
          </div>
          <CardDescription>
            Real-time boost visibility analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Position</span>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                <span className="text-xl font-semibold">
                  {hermesStatus.position || "N/A"}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="text-xl font-semibold">
                  {hermesStatus.activeUsers || 0}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Visibility Score</span>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                <span className={`text-xl font-semibold ${getVisibilityColor(hermesStatus.estimatedVisibility)}`}>
                  {hermesStatus.estimatedVisibility || 0}%
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">
                  {formatLastUpdate(hermesStatus.lastUpdateTime)}
                </span>
              </div>
            </div>
          </div>
          
          {hermesStatus.isActive || hermesStatus.active ? (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
              <p className="text-sm text-green-600 dark:text-green-400">
                Your boost is currently active and working at optimal efficiency.
              </p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                No active boost detected. Apply a boost to increase visibility.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Boost Effectiveness</CardTitle>
          <CardDescription>
            How well your boost is performing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Boost Score:</span>
              <span className="font-semibold">{hermesStatus.boostScore || 0}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Effectiveness:</span>
              <span className="font-semibold">{hermesStatus.effectivenessScore || 0}%</span>
            </div>
            
            {hermesStatus.timeRemaining !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm">Time Remaining:</span>
                <span className="font-semibold">
                  {typeof hermesStatus.timeRemaining === 'number' 
                    ? `${Math.floor(hermesStatus.timeRemaining / 60)}h ${hermesStatus.timeRemaining % 60}m`
                    : 'N/A'}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HermesBoostInfo;
