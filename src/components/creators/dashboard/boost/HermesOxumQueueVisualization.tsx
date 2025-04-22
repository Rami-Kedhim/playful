import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BoostPackage, HermesBoostStatus } from "@/types/boost";

interface HermesOxumQueueVisualizationProps {
  hermesStatus: HermesBoostStatus;
  activeBoostPackage?: BoostPackage;
  showDetails?: boolean;
}

const HermesOxumQueueVisualization = ({
  hermesStatus,
  activeBoostPackage,
  showDetails = false
}: HermesOxumQueueVisualizationProps) => {
  // Extract values from hermesStatus
  const position = hermesStatus?.position || 0;
  const activeUsers = hermesStatus?.activeUsers || 0;
  const estimatedVisibility = hermesStatus?.estimatedVisibility || 0;
  
  // Determine if boost is active
  const isBoostActive = hermesStatus?.isActive || hermesStatus?.active || false;
  
  // Calculate queue percentage
  const queuePercentage = activeUsers > 0 ? Math.min((position / activeUsers) * 100, 100) : 0;

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Visibility Queue Position</h3>
          <p className="text-sm text-muted-foreground">
            {isBoostActive ? 
              'Your profile is boosted!' : 
              'Boost your profile to increase visibility'
            }
          </p>
        </div>
        
        {isBoostActive && hermesStatus?.timeRemaining && (
          <div className="bg-amber-100 dark:bg-amber-900 py-1 px-2 rounded text-xs">
            {hermesStatus.timeRemaining} remaining
          </div>
        )}
      </div>
      
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${queuePercentage}%` }}
        ></div>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Position: {position}</span>
        <span>Total Users: {activeUsers}</span>
      </div>
      
      {showDetails && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span>Estimated Visibility:</span>
            <span>{estimatedVisibility}%</span>
          </div>
          
          {activeBoostPackage && (
            <div className="flex items-center justify-between">
              <span>Active Boost:</span>
              <span>{activeBoostPackage.name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HermesOxumQueueVisualization;
