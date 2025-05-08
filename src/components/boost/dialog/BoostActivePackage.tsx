
import React from 'react';
import { BoostStatus, HermesStatus } from '@/types/boost';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap } from 'lucide-react';

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData: HermesStatus;
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({
  boostStatus,
  hermesData
}) => {
  if (!boostStatus.isActive) {
    return null;
  }
  
  const progress = boostStatus.progress || 0;
  const remainingTime = boostStatus.remainingTime || '00:00:00';
  const packageName = boostStatus.packageName || 'Active Boost';
  const estimatedVisibility = hermesData?.estimatedVisibility || 0;
  const position = hermesData?.position || 0;
  
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1 text-yellow-500" />
              {packageName}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your profile is currently being boosted
            </p>
          </div>
          
          <Badge variant="outline" className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {remainingTime} remaining
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Visibility</p>
            <p className="font-medium">{estimatedVisibility}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Position</p>
            <p className="font-medium">{position > 0 ? `#${position}` : 'Top'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
