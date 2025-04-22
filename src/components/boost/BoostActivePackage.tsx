
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Zap, X } from 'lucide-react';
import { BoostStatus } from '@/types/boost';
import { BoostActivePackageProps } from './types';

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({ 
  boostStatus, 
  formatDuration,
  onCancel
}) => {
  if (!boostStatus || !boostStatus.isActive) return null;
  
  const {
    progress = 0,
    remainingTime,
    packageName,
    startTime,
    endTime,
    boostPackage
  } = boostStatus;

  return (
    <Card className="overflow-hidden border border-primary/20">
      <div className="bg-primary/10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="h-4 w-4 mr-2 text-primary" />
          <span className="font-medium">Active Boost</span>
        </div>
        <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">
          {packageName || boostPackage?.name || 'Standard Boost'}
        </span>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
              <span className="text-muted-foreground mr-1">Time Remaining:</span>
              <span className="font-medium">{formatDuration ? formatDuration(remainingTime) : remainingTime}</span>
            </div>
            
            {onCancel && (
              <Button 
                onClick={onCancel} 
                variant="destructive" 
                size="sm" 
                className="h-8"
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Cancel Boost
              </Button>
            )}
          </div>
          
          {boostPackage && (
            <div className="bg-muted/30 p-3 rounded-md text-sm mt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Boost Power:</span>
                <span>{boostPackage.boost_power}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-muted-foreground">Visibility Increase:</span>
                <span>+{boostPackage.visibility_increase}%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
