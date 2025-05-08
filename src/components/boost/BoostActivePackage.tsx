
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BoostStatus, HermesStatus } from "@/types/boost";
import { Clock, Zap } from "lucide-react";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: HermesStatus;
  formatDuration?: (duration: string) => string;
  onCancel?: () => Promise<boolean>;
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({
  boostStatus,
  hermesData,
  formatDuration = (d) => d,
  onCancel
}) => {
  if (!boostStatus || !boostStatus.isActive) return null;

  // Safely extract package details
  const packageName = boostStatus.packageName || "Unknown";
  const visibilityIncrease = boostStatus.boostPackage?.visibility_increase || 0;
  
  // Calculate progress as a percentage
  const calculateProgress = (): number => {
    // Use either startedAt/expiresAt or startTime/endTime
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    
    if (boostStatus.startedAt) {
      startDate = new Date(boostStatus.startedAt);
    } else if (boostStatus.startTime) {
      startDate = new Date(boostStatus.startTime);
    }
    
    if (boostStatus.expiresAt) {
      endDate = new Date(boostStatus.expiresAt);
    } else if (boostStatus.endTime) {
      endDate = new Date(boostStatus.endTime);
    }
    
    if (!startDate || !endDate) return 0;
    
    const now = Date.now();
    const total = endDate.getTime() - startDate.getTime();
    const elapsed = now - startDate.getTime();
    
    const progress = Math.floor((elapsed / total) * 100);
    return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
  };

  const progress = boostStatus.progress || calculateProgress();
  const remainingFormatted = boostStatus.remainingTime || boostStatus.timeRemaining || "Unknown";

  // Format dates for display
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "Unknown";
    try {
      if (typeof date === 'string') {
        return new Date(date).toLocaleString();
      }
      return date.toLocaleString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  const startDateDisplay = formatDate(boostStatus.startedAt || boostStatus.startTime);
  const endDateDisplay = formatDate(boostStatus.expiresAt || boostStatus.endTime);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xl font-semibold">{packageName}</div>
          <div className="text-sm text-muted-foreground">
            Boosting your profile visibility
          </div>
        </div>
        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
          Active
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 w-full bg-secondary relative rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary absolute left-0 top-0" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Started: {startDateDisplay}</span>
          <span>Expires: {endDateDisplay}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-secondary/20 p-3 rounded-md flex items-center">
          <Clock className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Time Remaining</div>
            <div className="font-semibold">{remainingFormatted}</div>
          </div>
        </div>
        
        <div className="bg-secondary/20 p-3 rounded-md flex items-center">
          <Zap className="h-5 w-5 text-yellow-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Visibility Boost</div>
            <div className="font-semibold">+{visibilityIncrease}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostActivePackage;
