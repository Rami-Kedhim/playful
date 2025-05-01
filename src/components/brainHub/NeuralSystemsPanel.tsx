
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Play, StopCircle } from 'lucide-react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import TrainingProgressDetails from './TrainingProgressDetails';
import { TrainingProgress, NeuralModel } from '@/services/neural/types/neuralHub';

interface NeuralSystemsPanelProps {
  systemId?: string;
}

const NeuralSystemsPanel: React.FC<NeuralSystemsPanelProps> = ({ systemId }) => {
  const [trainingJobs, setTrainingJobs] = useState<TrainingProgress[]>([]);
  const [models, setModels] = useState<NeuralModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingTraining, setStartingTraining] = useState(false);
  
  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);
  
  // Refresh data every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);
  
  // Fetch all data
  const fetchData = () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch active training jobs - synchronously now
      const activeJobs = neuralHub.getActiveTrainingJobs();
      setTrainingJobs(activeJobs);
      
      // Fetch available models - synchronously now
      const availableModels = neuralHub.getModels();
      setModels(availableModels);
      
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch neural systems data');
      setIsLoading(false);
    }
  };
  
  // Stop a training job
  const handleStopTraining = async (jobId: string) => {
    try {
      const success = await neuralHub.stopTraining(jobId);
      
      if (success) {
        // Remove the job from state if successful
        setTrainingJobs(prev => prev.filter(job => job.id !== jobId));
      } else {
        setError('Failed to stop training job');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to stop training job');
    }
  };
  
  // Start a new training job
  const handleStartTraining = async (type: string) => {
    try {
      setStartingTraining(true);
      setError(null);
      
      const result = await neuralHub.startTraining(type, { epochs: 100 });
      
      if (result && result.status === 'training') {
        // Refresh data to show new job
        fetchData();
      } else {
        setError(`Failed to start ${type} training: ${result.status}`);
      }
      
      setStartingTraining(false);
    } catch (err: any) {
      setError(err.message || `Failed to start ${type} training`);
      setStartingTraining(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neural Systems</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <h3 className="text-lg font-medium mb-4">Active Training Jobs</h3>
        <div className="space-y-4">
          {trainingJobs.length === 0 ? (
            <p className="text-muted-foreground">No active training jobs</p>
          ) : (
            trainingJobs.map(job => (
              <TrainingProgressDetails
                key={job.id}
                progress={job}
                onCancel={() => handleStopTraining(job.id)}
              />
            ))
          )}
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Training Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => handleStartTraining('text-generation')}
              disabled={startingTraining}
              className="flex items-center"
            >
              <Play className="mr-2 h-4 w-4" />
              Text Model
            </Button>
            <Button
              size="sm"
              onClick={() => handleStartTraining('image-analysis')}
              disabled={startingTraining}
              variant="outline"
              className="flex items-center"
            >
              <Play className="mr-2 h-4 w-4" />
              Vision Model
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Available Models ({models.length})</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {models.map(model => (
              <div key={model.id} className="border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{model.name}</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {model.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{model.type} | v{model.version}</p>
                <p className="text-xs mt-1">
                  Accuracy: {(model.performance.accuracy * 100).toFixed(1)}% | 
                  Latency: {model.performance.latency}ms
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemsPanel;
