
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BoostActivePackageProps } from '../types';
import { Clock, Zap } from 'lucide-react';

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({ boostStatus }) => {
  if (!boostStatus || !boostStatus.isActive) {
    return null;
  }

  const progress = boostStatus.progress || 0;

  return (
    <Card className="mb-4">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30 flex items-center">
              <Zap className="mr-1 h-3 w-3" />
              Active Boost
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {boostStatus.timeRemaining}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Package</span>
            <span className="font-medium">{boostStatus.packageName || boostStatus.boostPackage?.name || "Standard"}</span>
          </div>
          
          <Progress value={100 - progress} className="h-2" />
          
          <div className="text-xs text-right text-muted-foreground">
            {progress > 0 ? (
              <span>{100 - progress}% remaining</span>
            ) : (
              <span>100% active</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
