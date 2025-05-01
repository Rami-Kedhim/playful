
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Timer, AlertTriangle, StopCircle } from 'lucide-react';
import { TrainingProgress } from '@/services/neural/types/neuralHub';

interface TrainingProgressDetailsProps {
  progress: TrainingProgress;
  onCancel?: () => void;
}

const TrainingProgressDetails: React.FC<TrainingProgressDetailsProps> = ({ progress, onCancel }) => {
  const formatTimeRemaining = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'training':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      case 'paused':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden border">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-sm font-medium flex items-center">
              {progress.type} Training
              <span className={`ml-2 ${getStatusColor(progress.status)}`}>
                ({progress.status})
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Model ID: {progress.modelId}
            </p>
          </div>
          
          {onCancel && progress.status === 'training' && (
            <Button size="sm" variant="ghost" onClick={onCancel} className="h-8 px-2">
              <StopCircle className="h-4 w-4 mr-1" />
              Stop
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progress ({progress.currentEpoch}/{progress.totalEpochs} epochs)</span>
            <span>{progress.progress.toFixed(1)}%</span>
          </div>
          
          <Progress value={progress.progress} className="h-1.5" />
          
          <div className="flex justify-between text-xs mt-1">
            <div className="flex items-center">
              <Timer className="h-3 w-3 mr-1" />
              <span>
                Remaining: {formatTimeRemaining(progress.timeRemaining)}
              </span>
            </div>
            
            <div>
              Accuracy: {(progress.accuracy * 100).toFixed(1)}%
            </div>
          </div>
          
          {progress.error && (
            <div className="flex items-center mt-1 text-xs text-red-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>{progress.error}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingProgressDetails;
