
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, XCircle } from 'lucide-react';
import { BoostStatus } from '@/types/boost';
import { formatDate } from '@/utils/formatters';

interface BoostStatusCardProps {
  boostStatus: BoostStatus;
  onCancel: () => Promise<void>;
  loading: boolean;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
}

const BoostStatusCard: React.FC<BoostStatusCardProps> = ({
  boostStatus,
  onCancel,
  loading,
  dailyBoostUsage,
  dailyBoostLimit
}) => {
  // Calculate remaining time percentage for the progress bar
  const calculateProgress = (): number => {
    if (!boostStatus.isActive) return 0;
    
    const now = new Date();
    const startTime = boostStatus.startedAt ? new Date(boostStatus.startedAt) : now;
    const endTime = boostStatus.expiresAt ? new Date(boostStatus.expiresAt) : now;
    
    const totalDuration = endTime.getTime() - startTime.getTime();
    const elapsed = now.getTime() - startTime.getTime();
    
    if (totalDuration <= 0) return 0;
    
    // Calculate remaining percentage
    const remainingPercent = 100 - (elapsed / totalDuration * 100);
    return Math.max(0, Math.min(100, remainingPercent));
  };

  if (!boostStatus.isActive) {
    return (
      <Card className="bg-muted/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="h-5 w-5" />
            <span>No active boost</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = calculateProgress();

  return (
    <Card className="border-primary/10 bg-primary/5">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">
                {boostStatus.packageName || 'Profile Boost'} Active
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mt-1">
              Expires {boostStatus.expiresAt ? formatDate(boostStatus.expiresAt) : 'soon'}
            </p>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Boost remaining</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCancel}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Boost'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostStatusCard;
