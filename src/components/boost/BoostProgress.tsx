
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BoostStatus } from '@/types/pulse-boost';

interface BoostProgressProps {
  status: BoostStatus;
}

const BoostProgress: React.FC<BoostProgressProps> = ({ status }) => {
  const calculateProgress = (): number => {
    if (!status.isActive || !status.startedAt || !status.expiresAt) {
      return 0;
    }

    const start = status.startedAt instanceof Date ? status.startedAt : new Date(status.startedAt);
    const end = status.expiresAt instanceof Date ? status.expiresAt : new Date(status.expiresAt);
    const now = new Date();

    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();

    if (totalDuration <= 0) return 0;
    if (elapsed <= 0) return 100;

    // Calculate remaining percentage
    const percentRemaining = Math.max(0, Math.min(100, (1 - elapsed / totalDuration) * 100));

    return percentRemaining;
  };

  const progress = calculateProgress();

  return (
    <div className="w-24">
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1 text-center">
        {progress.toFixed(0)}% remaining
      </p>
    </div>
  );
};

export default BoostProgress;
