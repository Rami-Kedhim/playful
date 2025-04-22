
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoCircle, TrendingUp, Users, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { HermesBoostInfoProps } from '../types';

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  if (!hermesStatus) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Hermes Boost Status</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  These metrics show how your profile is performing in the Hermes system.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground flex items-center">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                Visibility Score
              </span>
              <span className="font-medium">{hermesStatus.estimatedVisibility}%</span>
            </div>
            <Progress value={hermesStatus.estimatedVisibility || 0} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              Active Profiles
            </span>
            <span>{hermesStatus.activeUsers}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Queue Position
            </span>
            <span>{hermesStatus.position}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              Last Updated
            </span>
            <span>{formatDate(hermesStatus.lastUpdateTime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
