
import React, { useEffect, useState } from 'react';
import { neuralHub } from '@/services/neural';
import { TrainingProgress, NeuralModel } from '@/services/neural/types/neuralHub';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { TrashIcon, PauseIcon, PlayIcon } from 'lucide-react';

const NeuralSystemsPanel = () => {
  const [activeJobs, setActiveJobs] = useState<TrainingProgress[]>([]);
  const [neuralModels, setNeuralModels] = useState<NeuralModel[]>([]);
  
  useEffect(() => {
    loadData();
    const refreshInterval = setInterval(loadData, 30000);
    return () => clearInterval(refreshInterval);
  }, []);
  
  const loadData = () => {
    try {
      const jobs = neuralHub.getActiveTrainingJobs().map(job => ({
        id: job.id || '',
        modelId: job.id?.split('-')[0] || '',
        progress: job.progress,
        status: job.status || 'training',
        startTime: new Date(),
        currentEpoch: Math.floor(job.progress * 100),
        totalEpochs: 100,
        epoch: Math.floor(job.progress * 100),
        loss: 0.1 + Math.random() * 0.2,
        accuracy: 0.7 + Math.random() * 0.25,
        timeRemaining: Math.floor((1 - job.progress) * 3600),
        type: job.type || 'unknown',
        targetAccuracy: 0.95,
        estimatedCompletionTime: new Date(Date.now() + (1 - job.progress) * 3600000)
      })) as TrainingProgress[];
      
      setActiveJobs(jobs);
      
      // Mock neural models data
      setNeuralModels(neuralHub.getModels().map((model: any) => ({
        id: model.id,
        name: model.name,
        type: model.type || 'unknown',
        version: model.version,
        specialization: model.type || 'general',
        size: Math.floor(Math.random() * 100) + 10,
        precision: Math.random() * 0.2 + 0.8,
        performance: {
          accuracy: model.performance.accuracy,
          latency: model.performance.latency,
          resourceUsage: Math.random()
        },
        capabilities: model.capabilities || [],
        status: model.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      })));
    } catch (error) {
      console.error("Error loading neural systems data:", error);
    }
  };
  
  const handleStopTraining = async (jobId: string) => {
    try {
      await neuralHub.stopTraining(jobId);
      loadData();
      toast({
        title: "Training stopped",
        description: `Training job ${jobId} has been stopped successfully.`
      });
    } catch (error) {
      console.error("Error stopping training job:", error);
      toast({
        title: "Error stopping training",
        description: "There was a problem stopping the training job.",
        variant: "destructive"
      });
    }
  };
  
  const handleStartTraining = async (type: string) => {
    try {
      const result = await neuralHub.startTraining(type);
      if (result && (result.status === 'started' || result.status === 'success')) {
        loadData();
        toast({
          title: "Training started",
          description: `New training job started with ID: ${result.jobId}`
        });
      }
    } catch (error) {
      console.error("Error starting training:", error);
      toast({
        title: "Error starting training",
        description: "There was a problem starting the training job.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Active Training Jobs</h3>
          {activeJobs.length > 0 ? (
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">{job.type}</span>
                      <Badge
                        variant={job.status === 'training' ? 'default' : 'outline'}
                        className="ml-2"
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStopTraining(job.id)}
                    >
                      <PauseIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Progress value={job.progress * 100} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {job.currentEpoch}/{job.totalEpochs} epochs
                    </span>
                    <span>{Math.round(job.progress * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              <p>No active training jobs</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleStartTraining('model-training')}
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Start Training
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">System Performance</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">CPU Utilization</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Progress value={67} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <Progress value={42} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Network Throughput</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Avg. Response Time</p>
                <p className="text-lg font-medium">128ms</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requests/min</p>
                <p className="text-lg font-medium">432</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Deployed Models</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {neuralModels.map((model) => (
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
                  <TableCell>
                    {(model.performance.accuracy * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>{model.performance.latency}ms</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default NeuralSystemsPanel;
