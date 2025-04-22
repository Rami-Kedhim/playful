
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Users, Eye } from 'lucide-react';
import { BoostActivePackageProps } from '../types';

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({ boostStatus, hermesData }) => {
  // Safely handle date parsing
  const formatTimeRemaining = () => {
    try {
      if (typeof boostStatus.endTime === 'string') {
        const endDate = new Date(boostStatus.endTime);
        return formatDistanceToNow(endDate, { addSuffix: true });
      }
      return 'Unknown';
    } catch (e) {
      return 'Unknown';
    }
  };

  // Calculate hours remaining (approximate)
  const hoursRemaining = boostStatus.remainingTime 
    ? Math.round(boostStatus.remainingTime / 3600 * 10) / 10 
    : 0;

  // Use fallback for progress if not available
  const progress = typeof boostStatus.progress === 'number' ? boostStatus.progress : 50;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{boostStatus.packageName || 'Active Boost'}</h4>
          <p className="text-sm text-muted-foreground">
            Expires {formatTimeRemaining()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{hoursRemaining.toFixed(1)} hours left</div>
          <div className="text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </div>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
          <Users className="h-5 w-5 mb-1 text-primary" />
          <span className="text-xs text-muted-foreground">Position</span>
          <span className="font-medium">{hermesData?.position || 'N/A'}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
          <Eye className="h-5 w-5 mb-1 text-primary" />
          <span className="text-xs text-muted-foreground">Visibility</span>
          <span className="font-medium">{hermesData?.estimatedVisibility || 0}%</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
          <Clock className="h-5 w-5 mb-1 text-primary" />
          <span className="text-xs text-muted-foreground">Time Left</span>
          <span className="font-medium">{hoursRemaining.toFixed(1)}h</span>
        </div>
      </div>
    </div>
  );
};

export default BoostActivePackage;
