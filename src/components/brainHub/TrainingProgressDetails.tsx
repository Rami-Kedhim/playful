
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, Activity, Info } from 'lucide-react';
import { TrainingProgress } from '@/services/neural/types/neuralHub';

interface TrainingProgressDetailsProps {
  progress: TrainingProgress;
  onCancel?: () => void;
}

const TrainingProgressDetails: React.FC<TrainingProgressDetailsProps> = ({ progress, onCancel }) => {
  // Format remaining time
  const formatTimeRemaining = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} hours ${minutes} minutes`;
    }
  };
  
  // Determine status badge
  const getStatusBadge = () => {
    switch (progress.status) {
      case 'training':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Activity className="h-3 w-3 mr-1" />
            Training
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case 'queued':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Queued
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Info className="h-3 w-3 mr-1" />
            {progress.status}
          </Badge>
        );
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{progress.type} Training</CardTitle>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground">
          Model ID: <span className="font-mono text-xs">{progress.modelId}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress.progress)}%</span>
          </div>
          <Progress value={progress.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Current Epoch</p>
            <p className="font-medium">
              {progress.currentEpoch}/{progress.totalEpochs}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time Remaining</p>
            <p className="font-medium">{formatTimeRemaining(progress.timeRemaining)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="font-medium">{(progress.accuracy * 100).toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Target Accuracy</p>
            <p className="font-medium">{progress.targetAccuracy}%</p>
          </div>
        </div>
        
        {/* Status message display */}
        {progress.message && (
          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <p className="font-medium">Status Message:</p>
            <p>{progress.message}</p>
          </div>
        )}
        
        {/* Error message display */}
        {progress.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            <p className="font-medium">Error:</p>
            <p>{progress.error}</p>
          </div>
        )}
        
        {/* Actions */}
        {progress.status === 'training' && onCancel && (
          <div className="flex justify-end">
            <button
              onClick={onCancel}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Cancel Training
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingProgressDetails;
