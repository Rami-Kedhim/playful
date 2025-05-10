
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock } from "lucide-react";
import { BoostStatus } from "@/types/boost";

interface BoostStatusDisplayProps {
  boostStatus: BoostStatus;
  loading: boolean;
  onCancel: () => Promise<boolean>;
  onApply: () => void;
}

const BoostStatusDisplay: React.FC<BoostStatusDisplayProps> = ({
  boostStatus,
  loading,
  onCancel,
  onApply
}) => {
  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel your active boost?")) {
      await onCancel();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Boost Status
          </div>
          {boostStatus.isActive && boostStatus.isExpiring && (
            <div className="bg-yellow-500/20 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Expiring Soon
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : boostStatus.isActive ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Active Package</p>
              <p className="font-medium">{boostStatus.packageName || 'Boost Package'}</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Time Remaining</span>
                <span>{boostStatus.remainingTime}</span>
              </div>
              <Progress value={boostStatus.progress} className="h-2" />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCancel}
            >
              Cancel Boost
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You don't have any active boosts. Apply a boost to increase your profile's visibility.
            </p>
            <Button 
              className="w-full" 
              onClick={onApply}
            >
              Apply Boost
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostStatusDisplay;
