
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatBoostDuration } from "@/utils/boostCalculator";
import { BoostStatus, BoostAnalytics } from "@/types/boost";
import { Zap, Clock, BarChart3, Loader2, Info } from "lucide-react";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  boostAnalytics: AnalyticsData | null;
  onCancel: () => Promise<boolean>;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
}

const BoostActivePackage = ({ 
  boostStatus, 
  boostAnalytics,
  onCancel,
  dailyBoostUsage = 1,
  dailyBoostLimit = 4  
}: BoostActivePackageProps) => {
  const [cancelling, setCancelling] = useState(false);
  const [timeLeft, setTimeLeft] = useState(boostStatus.remainingTime || "");
  const [progress, setProgress] = useState(boostStatus.progress || 0);
  
  useEffect(() => {
    if (!boostStatus.isActive) return;
    
    // Update the time remaining every minute
    const timer = setInterval(() => {
      if (boostStatus.expiresAt) {
        const now = new Date();
        const expiry = new Date(boostStatus.expiresAt);
        const diffMs = expiry.getTime() - now.getTime();
        
        if (diffMs <= 0) {
          setTimeLeft("Expired");
          clearInterval(timer);
          return;
        }
        
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        let timeString = "";
        if (days > 0) timeString += `${days}d `;
        if (hours > 0 || days > 0) timeString += `${hours}h `;
        timeString += `${minutes}m`;
        
        setTimeLeft(timeString);
        
        // Calculate progress percentage
        if (boostStatus.boostPackage) {
          const durationParts = boostStatus.boostPackage.duration.split(':');
          const totalHours = parseInt(durationParts[0]);
          const totalDuration = totalHours * 60 * 60 * 1000; // Convert to milliseconds
          
          const startTime = expiry.getTime() - totalDuration;
          const elapsed = now.getTime() - startTime;
          const progressPercent = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
          
          setProgress(progressPercent);
        }
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [boostStatus]);
  
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel your active boost? This action cannot be undone.")) {
      return;
    }
    
    setCancelling(true);
    await onCancel();
    setCancelling(false);
  };

  if (!boostStatus.isActive) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          You don't have any active boosts.
        </p>
        
        {/* Oxum Daily Usage Display */}
        <div className="mt-4 p-4 border border-muted rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              Daily Boost Usage
            </span>
            <span className="text-sm font-medium">
              {dailyBoostUsage} of {dailyBoostLimit} used
            </span>
          </div>
          <Progress value={(dailyBoostUsage / dailyBoostLimit) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Ethically limited to {dailyBoostLimit} boosts (12 hours) per day
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-4 border border-amber-200 dark:border-amber-800">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium flex items-center">
            <Zap className="h-4 w-4 text-amber-500 mr-2" />
            {boostStatus.boostPackage?.name || "3-Hour Boost"}
          </h3>
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-1 text-amber-500" />
            {timeLeft} remaining
          </div>
        </div>
        
        <Progress value={progress} className="h-2 mb-3" />
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Package:</span>{" "}
            <span className="font-medium">{boostStatus.boostPackage?.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Duration:</span>{" "}
            <span className="font-medium">
              {boostStatus.boostPackage ? formatBoostDuration(boostStatus.boostPackage.duration) : "-"}
            </span>
          </div>
        </div>
        
        {/* Oxum Daily Usage Display */}
        <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center text-sm">
              <Info className="h-3.5 w-3.5 mr-1 text-amber-500" />
              Daily Boost Usage
            </div>
            <span className="text-sm font-medium">{dailyBoostUsage}/{dailyBoostLimit}</span>
          </div>
          <Progress value={(dailyBoostUsage / dailyBoostLimit) * 100} className="h-1.5" />
        </div>
        
        {boostAnalytics && (
          <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <BarChart3 className="h-3.5 w-3.5 mr-1 text-amber-500" />
                Boost Effectiveness
              </div>
              <span className="font-medium">{boostAnalytics.effectiveness}%</span>
            </div>
          </div>
        )}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleCancel} 
        disabled={cancelling}
      >
        {cancelling ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cancelling...
          </>
        ) : (
          "Cancel Boost"
        )}
      </Button>
    </div>
  );
};

export default BoostActivePackage;
