
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, ChartBar, Zap, TrendingUp } from 'lucide-react';
import { BoostStatus, HermesData } from '@/types/boost';

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: HermesData;
  formatDuration?: (duration: string) => string;
  onCancel?: () => Promise<boolean>;
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({
  boostStatus,
  hermesData,
  formatDuration,
  onCancel
}) => {
  if (!boostStatus?.isActive) {
    return null;
  }

  const boostPackage = boostStatus.boostPackage;
  const progress = boostStatus.progress || 0;
  
  // Format dates
  const expiresAt = boostStatus.expiresAt 
    ? typeof boostStatus.expiresAt === 'string' 
      ? new Date(boostStatus.expiresAt)
      : boostStatus.expiresAt
    : null;
    
  const expiresAtDisplay = expiresAt ? expiresAt.toLocaleString() : 'Unknown';
  
  // Get package details
  const packageName = boostStatus.packageName || (boostPackage ? boostPackage.name : 'Active Boost');

  return (
    <Card>
      <CardContent className="pt-6 pb-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold">Active Boost</h3>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {packageName}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Boost Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4 mr-2" />
              <span>Remaining</span>
            </div>
            <div className="font-semibold">{boostStatus.timeRemaining || '24h 0m'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <ChartBar className="h-4 w-4 mr-2" />
              <span>Boost Power</span>
            </div>
            <div className="font-semibold">{boostPackage?.boost_power || 1}x</div>
          </div>
          
          {hermesData && (
            <>
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>Visibility</span>
                </div>
                <div className="font-semibold">+{boostPackage?.visibility_increase || 30}%</div>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Zap className="h-4 w-4 mr-2" />
                  <span>Position</span>
                </div>
                <div className="font-semibold">#{hermesData.position || '?'}</div>
              </div>
            </>
          )}
        </div>
        
        {onCancel && (
          <Button 
            onClick={onCancel} 
            variant="outline" 
            className="w-full mt-2"
          >
            Cancel Boost
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
