
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap, Calendar } from 'lucide-react';

interface BoostActivePackageProps {
  isActive: boolean;
  packageName: string;
  expiresAt: string;
  progress: number;
  timeRemaining: string;
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({
  isActive,
  packageName,
  expiresAt,
  progress,
  timeRemaining
}) => {
  if (!isActive) {
    return (
      <div className="text-center py-8">
        <Zap className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="text-lg font-medium mt-4">No Active Boost</h3>
        <p className="text-muted-foreground mt-2">
          You don't have an active boost. Select a package to enhance your profile visibility.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-4">
          <h3 className="font-medium">{packageName}</h3>
          <p className="text-sm text-muted-foreground">Active Boost</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}% Complete</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Time Remaining</p>
            <p className="font-medium">{timeRemaining}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Expires</p>
            <p className="font-medium">{expiresAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostActivePackage;
