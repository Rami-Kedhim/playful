
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, AlertCircle, CheckCircle, Clock, Pause } from 'lucide-react';

// Define the progress type based on what we need in this component
interface TrainingProgress {
  modelId: string;
  epoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
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
  onCancel?: () => void;
}

const TrainingProgressDetails: React.FC<TrainingProgressDetailsProps> = ({ 
  progress,
  onCancel
}) => {
  // Calculate percentage completion
  const percentComplete = (progress.epoch / progress.totalEpochs) * 100;
  
  // Format time remaining
  const formatTimeRemaining = (seconds?: number): string => {
    if (!seconds) return 'Unknown';
    
    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };
  
  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'waiting': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-3 w-3 animate-pulse" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'failed': return <AlertCircle className="h-3 w-3" />;
      case 'waiting': return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };
  
  return (
    <Card className="p-3 bg-secondary/20 rounded-md mt-2 overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(progress.status)} border-0 text-white`}>
              {getStatusIcon(progress.status)}
              <span className="ml-1">{progress.status}</span>
            </Badge>
            <h4 className="font-medium text-sm">{progress.modelId}</h4>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div>
              <span className="text-muted-foreground">Epoch:</span> {progress.epoch}/{progress.totalEpochs}
            </div>
            <div>
              <span className="text-muted-foreground">Loss:</span> {progress.loss.toFixed(4)}
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy:</span> {(progress.accuracy * 100).toFixed(2)}%
            </div>
            {progress.metrics.precision !== undefined && (
              <div>
                <span className="text-muted-foreground">Precision:</span> {(progress.metrics.precision * 100).toFixed(2)}%
              </div>
            )}
          </div>
        </div>
        
        {progress.status === 'running' && onCancel && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCancel}
            className="h-7 px-2"
          >
            <Pause className="h-3 w-3 mr-1" /> 
            Stop
          </Button>
        )}
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{percentComplete.toFixed(1)}%</span>
        </div>
        <Progress value={percentComplete} className="h-1" />
      </div>
      
      {progress.estimatedTimeRemaining !== undefined && (
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Est. remaining: {formatTimeRemaining(progress.estimatedTimeRemaining)}</span>
        </div>
      )}
      
      {progress.error && (
        <div className="mt-2 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 inline mr-1" />
          {progress.error}
        </div>
      )}
    </Card>
  );
};

export default TrainingProgressDetails;
