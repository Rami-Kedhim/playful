
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Clock, Calendar, TrendingUp } from 'lucide-react';
import { BoostStatus, HermesBoostStatus } from '@/types/boost';

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: HermesBoostStatus;
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({
  boostStatus,
  hermesData
}) => {
  // Calculate progress if not provided
  const progress = boostStatus.progress !== undefined ? boostStatus.progress : 65;
  
  // Format expiration date
  let expiryDate = 'Unknown';
  if (boostStatus.endTime) {
    try {
      const date = new Date(boostStatus.endTime);
      expiryDate = date.toLocaleString();
    } catch (e) {
      expiryDate = boostStatus.endTime;
    }
  } else if (boostStatus.expiresAt) {
    try {
      const date = new Date(boostStatus.expiresAt);
      expiryDate = date.toLocaleString();
    } catch (e) {
      expiryDate = boostStatus.expiresAt;
    }
  }
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="font-medium">Active Boost</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {boostStatus.packageName || 'Standard Package'}
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center p-2 bg-muted rounded">
                <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-sm font-medium">{boostStatus.timeRemaining || '16h 32m'}</span>
                <span className="text-xs text-muted-foreground">Remaining</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted rounded">
                <Calendar className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-sm font-medium">{expiryDate}</span>
                <span className="text-xs text-muted-foreground">Expires</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {hermesData && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">Boost Performance</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">{hermesData.position}</span>
                <span className="text-xs text-muted-foreground">Rank</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">{hermesData.estimatedVisibility}%</span>
                <span className="text-xs text-muted-foreground">Visibility</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted rounded">
                <span className="text-sm font-medium">{hermesData.activeUsers}</span>
                <span className="text-xs text-muted-foreground">Competitors</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BoostActivePackage;
