
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Square, AlertTriangle } from 'lucide-react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import TrainingProgressDetails from './TrainingProgressDetails';
import { TrainingProgress } from '@/services/neural/training/trainingManager';
import { useToast } from '@/components/ui/use-toast';

interface NeuralSystemsPanelProps {
  autoRefresh?: boolean;
}

const NeuralSystemsPanel: React.FC<NeuralSystemsPanelProps> = ({
  autoRefresh = true,
}) => {
  const [trainingJobs, setTrainingJobs] = useState<TrainingProgress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTrainingJobs = async () => {
    try {
      setError(null);
      const jobs = neuralHub.getActiveTrainingJobs?.() || [];
      // Make sure we're getting compatible training progress objects
      const compatibleJobs = jobs.map(job => ({
        id: job.id,
        modelId: job.modelId,
        status: job.status,
        startTime: job.startTime,
        currentEpoch: job.currentEpoch || 0,
        epoch: job.epoch || 0,
        totalEpochs: job.totalEpochs || 10,
        progress: job.progress,
        accuracy: job.accuracy || 0,
        loss: job.loss || 1,
        timestamp: job.timestamp || new Date().toISOString(),
        targetAccuracy: job.targetAccuracy || 0.95,
        estimatedCompletionTime: job.estimatedCompletionTime,
        timeRemaining: job.timeRemaining || 0,
        message: "",
        type: job.type || "training",
      }));
      
      setTrainingJobs(compatibleJobs);
    } catch (err) {
      console.error('Failed to fetch training jobs:', err);
      setError('Failed to fetch training jobs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingJobs();
    
    if (autoRefresh) {
      const intervalId = setInterval(fetchTrainingJobs, 10000);
      return () => clearInterval(intervalId);
    }
  }, [autoRefresh]);

  const handleStartTraining = async (modelType: string) => {
    try {
      await neuralHub.startTraining?.(modelType, {
        epochs: 10,
        learningRate: 0.001,
        batchSize: 32
      });
      
      toast({
        title: `${modelType} training started`,
        description: "Training job has been successfully added to the queue."
      });
      
      fetchTrainingJobs();
    } catch (err) {
      toast({
        title: "Failed to start training",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const handleStopTraining = async (jobId: string) => {
    try {
      const success = await neuralHub.stopTraining?.(jobId);
      
      if (success) {
        toast({
          title: "Training stopped",
          description: "Training job has been stopped successfully."
        });
        
        fetchTrainingJobs();
      } else {
        throw new Error("Failed to stop training job");
      }
      
      return success;
    } catch (err) {
      toast({
        title: "Failed to stop training",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neural Training</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-md flex items-center text-red-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleStartTraining('text')}
          >
            <Play className="h-4 w-4 mr-1" />
            Train Text Model
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleStartTraining('image')}
          >
            <Play className="h-4 w-4 mr-1" />
            Train Image Model
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchTrainingJobs}
          >
            Refresh Jobs
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : trainingJobs.length > 0 ? (
          <div className="space-y-4">
            {trainingJobs.map(job => {
              // Converting job to the format expected by TrainingProgressDetails
              const progressData = {
                modelId: job.modelId,
                epoch: job.epoch,
                totalEpochs: job.totalEpochs,
                loss: job.loss,
                accuracy: job.accuracy,
                timestamp: job.timestamp,
                status: job.status === 'training' ? 'running' : job.status === 'completed' ? 'completed' : job.status === 'failed' ? 'failed' : 'waiting',
                estimatedTimeRemaining: job.timeRemaining,
                metrics: {
                  precision: 0.75,
                  recall: 0.82,
                  f1Score: 0.78
                }
              };
              
              return (
                <TrainingProgressDetails
                  key={job.id}
                  progress={progressData}
                  onCancel={() => handleStopTraining(job.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md">
            <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No active training jobs</p>
            <p className="text-xs text-muted-foreground mt-1">Start a new training job using the buttons above</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralSystemsPanel;
