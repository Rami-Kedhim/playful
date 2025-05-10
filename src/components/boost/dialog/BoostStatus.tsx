
import React from 'react';
import { BoostStatus as BoostStatusType } from '@/types/pulse-boost';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Clock } from 'lucide-react';

interface BoostStatusProps {
  boostStatus: BoostStatusType | null;
}

const BoostStatus: React.FC<BoostStatusProps> = ({ boostStatus }) => {
  if (!boostStatus || !boostStatus.isActive) {
    return (
      <Card>
        <CardContent className="py-4">
          <p className="text-muted-foreground text-center">No active boost</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate progress if not provided
  const progress = boostStatus.progress || 0;

  return (
    <Card>
      <CardContent className="py-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">{boostStatus.packageName || 'Active Boost'}</h3>
          </div>
          <Badge variant="outline" className="bg-primary/10">Active</Badge>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" /> Remaining time
            </span>
            <span className="font-medium">
              {boostStatus.remainingTime || boostStatus.timeRemaining}
            </span>
          </div>
          <Progress value={100 - progress} className="h-2" />
        </div>

        {boostStatus.expiresAt && (
          <p className="text-xs text-muted-foreground">
            Expires: {new Date(boostStatus.expiresAt).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostStatus;
