
import React, { useEffect, useState } from 'react';
import { neuralHub } from '@/services/neural';
import { TrainingProgress, NeuralModel } from '@/types/neural/NeuralSystemMetrics';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { TrashIcon, PauseIcon, PlayIcon } from 'lucide-react';

// Main component for managing neural systems
const NeuralSystemsPanel = () => {
  const [activeJobs, setActiveJobs] = useState<TrainingProgress[]>([]);
  const [neuralModels, setNeuralModels] = useState<NeuralModel[]>([]);
  
  // Load initial data
  useEffect(() => {
    loadData();
    // Regular refresh
    const refreshInterval = setInterval(loadData, 30000);
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Function to load data from neural hub
  const loadData = () => {
    try {
      // Get active training jobs
      const jobs = neuralHub.getActiveTrainingJobs().map(job => ({
        id: job.id,
        modelId: job.id.split('-')[0],
        progress: job.progress,
        status: 'training' as 'training' | 'paused' | 'completed' | 'failed',
        startTime: new Date(),
        currentEpoch: Math.floor(job.progress * 100),
        totalEpochs: 100,
        loss: 0.1 + Math.random() * 0.2,
        accuracy: 0.7 + Math.random() * 0.25,
        type: job.type,
        targetAccuracy: 0.95,
        estimatedCompletionTime: new Date(Date.now() + (1 - job.progress) * 3600000)
      }));
      
      setActiveJobs(jobs);
      
      // Get available models
      const models = neuralHub.getModels().map(model => ({
        id: model.id,
        name: model.name,
        type: model.type,
        version: model.version,
        status: 'active' as 'active' | 'inactive' | 'training' | 'error',
        capabilities: [model.type, 'analysis', 'prediction'],
        performance: {
          accuracy: 0.7 + Math.random() * 0.25,
          latency: 150 + Math.random() * 100,
          resourceUsage: 0.3 + Math.random() * 0.4
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      setNeuralModels(models);
    } catch (error) {
      toast({
        description: `Error loading neural systems data: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };
  
  // Function to start a new training job
  const startTraining = async (type: string) => {
    try {
      const result = await neuralHub.startTraining(type);
      
      toast({
        description: `Training job started: ${result.jobId}`
      });
      
      // Refresh data
      loadData();
    } catch (error) {
      toast({
        description: `Error starting training job: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };
  
  // Function to stop a training job
  const stopTraining = async (jobId: string) => {
    try {
      await neuralHub.stopTraining(jobId);
      
      toast({
        description: `Training job ${jobId} stopped`
      });
      
      // Refresh data after stopping
      setActiveJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (error) {
      toast({
        description: `Error stopping training job: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };
  
  // Reset system to default params and settings
  const resetSystem = async () => {
    try {
      const result = await neuralHub.resetSystem();
      
      if (result) {
        toast({
          description: "Neural system reset successfully"
        });
        loadData();
      } else {
        toast({
          description: "Neural system reset failed"
        });
      }
    } catch (error) {
      toast({
        description: `Error resetting system: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Active Training Jobs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Active Training Jobs</h2>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => startTraining('content-matching')}
            >
              Train Content Matching
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => startTraining('user-preferences')}
            >
              Train User Preferences
            </Button>
          </div>
        </div>
        
        {activeJobs.length > 0 ? (
          <div className="space-y-4">
            {activeJobs.map(job => (
              <Card key={job.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{job.type}</span>
                    <Badge 
                      variant={job.status === 'training' ? 'default' : 'outline'} 
                      className="ml-2"
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => stopTraining(job.id)}
                    >
                      {job.status === 'training' ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => stopTraining(job.id)}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {Math.round(job.progress * 100)}%</span>
                    <span>Loss: {job.loss.toFixed(4)}</span>
                    <span>Accuracy: {job.accuracy.toFixed(4)}</span>
                  </div>
                  <Progress value={job.progress * 100} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-4 text-center text-muted-foreground">
            No active training jobs
          </Card>
        )}
      </div>
      
      {/* Available Models */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Models</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {neuralModels.map(model => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>{model.version}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={model.status === 'active' ? 'default' : 'outline'}
                    >
                      {model.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{(model.performance.accuracy * 100).toFixed(1)}%</TableCell>
                  <TableCell>{model.performance.latency.toFixed(1)} ms</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* System Actions */}
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={resetSystem}
        >
          Reset System
        </Button>
      </div>
    </div>
  );
};

export default NeuralSystemsPanel;
