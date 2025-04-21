
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Zap } from "lucide-react";
import { BoostStatus } from "@/types/boost";

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: any; // Add this prop to fix the error
}

const BoostActivePackage: React.FC<BoostActivePackageProps> = ({ 
  boostStatus, 
  hermesData 
}) => {
  if (!boostStatus.isActive) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No active boost</p>
      </div>
    );
  }
  
  const formatTimeRemaining = (timeRemaining?: string) => {
    if (!timeRemaining) return "Unknown";
    return timeRemaining;
  };
  
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="font-medium">
              {boostStatus.boostPackage?.name || "Active Boost"}
            </span>
          </div>
          <div className="text-muted-foreground text-sm flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatTimeRemaining(boostStatus.timeRemaining || boostStatus.remainingTime)}
          </div>
        </div>
        
        <Progress value={boostStatus.progress} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-xs text-muted-foreground mb-1">Boost Progress</div>
            <div className="text-lg font-semibold">{Math.round(boostStatus.progress)}%</div>
          </div>
          
          {hermesData && (
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="text-xs text-muted-foreground mb-1">Visibility Score</div>
              <div className="text-lg font-semibold">{hermesData.estimatedVisibility || 0}%</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
