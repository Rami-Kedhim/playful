
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BoostStatus } from "@/types/boost";
import { Clock, Zap } from "lucide-react";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: {
    position: any;
    activeUsers: any;
    estimatedVisibility: any;
    lastUpdateTime: any;
  };
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({ 
  boostStatus,
  hermesData
}) => {
  const formatTimeRemaining = (timeString: string): string => {
    // Handle the case where timeRemaining might be in various formats
    if (!timeString) return 'Calculating...';
    
    // If it's already a formatted string, return as is
    if (typeof timeString === 'string' && !timeString.includes(':')) {
      return timeString;
    }
    
    // Parse hours:minutes format
    const [hours, minutes] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Calculating...';
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Calculate progress for the progress bar
  const calculateProgress = (): number => {
    const progress = boostStatus.progress !== undefined ? Number(boostStatus.progress) : 0;
    return isNaN(progress) ? 0 : Math.min(100, Math.max(0, progress));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{boostStatus.packageName || 'Active Boost'}</h3>
          <p className="text-sm text-muted-foreground">
            Boosting your profile visibility
          </p>
        </div>
        <Badge className="bg-green-500">Active</Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{calculateProgress()}%</span>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Time Remaining:</span>
        <span className="font-medium">
          {formatTimeRemaining(boostStatus.remainingTime || boostStatus.timeRemaining || '')}
        </span>
      </div>

      {hermesData && (
        <div className="pt-2">
          <div className="flex items-center gap-1 text-sm mb-1">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Hermetic Boost Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-secondary/30 p-2 rounded-md">
              <span className="text-muted-foreground">Position</span>
              <div className="font-medium">#{hermesData.position}</div>
            </div>
            <div className="bg-secondary/30 p-2 rounded-md">
              <span className="text-muted-foreground">Visibility</span>
              <div className="font-medium">{hermesData.estimatedVisibility}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoostActivePackage;
