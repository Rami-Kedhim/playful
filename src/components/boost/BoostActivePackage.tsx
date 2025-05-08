
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, Clock, Timer, Zap } from 'lucide-react';
import { BoostStatus } from '@/types/boost';
import { formatDistanceToNow } from 'date-fns';

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  formatDuration?: (duration: string) => string;
  onCancel?: () => Promise<boolean>;
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({
  boostStatus,
  formatDuration,
  onCancel
}) => {
  // Add default package name if none is provided
  const packageName = boostStatus.packageName || 
                      (boostStatus.boostPackage ? boostStatus.boostPackage.name : 'Active Boost');
  
  // Calculate progress percentage (0-100)
  const progress = boostStatus.progress !== undefined ? boostStatus.progress : 50;
  
  // Format dates
  let startTimeText = 'Unknown';
  let startTimeDate = '';
  if (boostStatus.startTime) {
    startTimeText = formatDistanceToNow(new Date(boostStatus.startTime), { addSuffix: true });
    startTimeDate = new Date(boostStatus.startTime).toLocaleString();
  }
  
  let endTimeText = 'Unknown';
  let endTimeDate = '';
  if (boostStatus.endTime) {
    endTimeText = formatDistanceToNow(new Date(boostStatus.endTime), { addSuffix: true });
    endTimeDate = new Date(boostStatus.endTime).toLocaleString();
  }
  
  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{packageName}</h3>
              <p className="text-xs text-muted-foreground">
                {boostStatus.timeRemaining || boostStatus.remainingTime || 'Time remaining'}
              </p>
            </div>
          </div>
          
          {onCancel && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCancel}
            >
              Cancel Boost
            </Button>
          )}
        </div>
        
        <Progress value={progress} className="h-1" />
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Started</div>
              <div className="font-medium">{startTimeText}</div>
              <div className="text-[10px] text-muted-foreground">{startTimeDate}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Ends</div>
              <div className="font-medium">{endTimeText}</div>
              <div className="text-[10px] text-muted-foreground">{endTimeDate}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/50 p-2 rounded flex items-center gap-2">
          <AlertCircle className="text-blue-500 h-4 w-4 flex-shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Your profile is currently boosted and receiving increased visibility.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
