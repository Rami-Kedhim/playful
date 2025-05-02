
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, BarChart } from 'lucide-react';

interface TrainingProgress {
  modelId: string;
  epoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number; // Added the missing accuracy property
  timestamp: string;
  status: 'running' | 'completed' | 'failed' | 'waiting';
  estimatedTimeRemaining?: number;
  metrics: {
    precision?: number;
    recall?: number;
    f1Score?: number;
  };
  error?: string;
}

interface TrainingProgressDetailsProps {
  progress: TrainingProgress;
}

const TrainingProgressDetails: React.FC<TrainingProgressDetailsProps> = ({ progress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'waiting':
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4" />;
      case 'waiting':
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const progressPercentage = (progress.epoch / progress.totalEpochs) * 100;

  const formatTime = (seconds?: number) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            Training Progress: Model {progress.modelId}
          </CardTitle>
          <Badge className={`${getStatusColor(progress.status)} flex items-center gap-1`}>
            {getStatusIcon(progress.status)}
            <span className="capitalize">{progress.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Epoch {progress.epoch} of {progress.totalEpochs}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Loss</div>
              <div className="font-medium">{progress.loss.toFixed(4)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Accuracy</div>
              <div className="font-medium">{progress.accuracy.toFixed(2)}%</div>
            </div>
            
            {progress.metrics.precision && (
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Precision</div>
                <div className="font-medium">{progress.metrics.precision.toFixed(4)}</div>
              </div>
            )}
            
            {progress.metrics.recall && (
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Recall</div>
                <div className="font-medium">{progress.metrics.recall.toFixed(4)}</div>
              </div>
            )}
            
            {progress.metrics.f1Score && (
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">F1 Score</div>
                <div className="font-medium">{progress.metrics.f1Score.toFixed(4)}</div>
              </div>
            )}
          </div>
          
          {progress.estimatedTimeRemaining && progress.status === 'running' && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Estimated time remaining: {formatTime(progress.estimatedTimeRemaining)}</span>
            </div>
          )}
          
          {progress.error && progress.status === 'failed' && (
            <div className="p-2 bg-red-50 border border-red-100 rounded-md text-sm text-red-700">
              <strong>Error:</strong> {progress.error}
            </div>
          )}
          
          <div className="flex justify-end">
            <button className="flex items-center text-xs text-blue-500 hover:underline">
              <BarChart className="h-3 w-3 mr-1" />
              View detailed metrics
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingProgressDetails;
