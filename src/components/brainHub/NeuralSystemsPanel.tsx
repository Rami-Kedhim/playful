
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Brain, Database, Play, StopCircle, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { neuralHub } from '@/services/neural/HermesOxumBrainHub';

interface TrainingJob {
  id: string;
  progress: number;
  model: string;
  startedAt: string;
}

const NeuralSystemsPanel = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTrainingJobs = async () => {
    try {
      setIsLoading(true);
      const jobs = await neuralHub.getActiveTrainingJobs();
      setTrainingJobs(jobs as TrainingJob[]);
    } catch (error) {
      console.error('Error loading training jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load training jobs.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTrainingJobs();

    // Refresh every 10 seconds
    const interval = setInterval(loadTrainingJobs, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStopTraining = async (jobId: string) => {
    try {
      await neuralHub.stopTraining(jobId);
      toast({
        title: 'Training Stopped',
        description: `Training job ${jobId} has been stopped.`,
      });
      
      // Remove from local state
      setTrainingJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to stop training.',
        variant: 'destructive',
      });
    }
  };

  const formatDuration = (startDateStr: string) => {
    const startDate = new Date(startDateStr);
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);
    
    return `${diffHrs}h ${diffMins}m`;
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Neural Systems
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="training" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>
          
          <TabsContent value="training" className="space-y-4 mt-4">
            {trainingJobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No active training jobs</p>
              </div>
            ) : (
              trainingJobs.map(job => (
                <div key={job.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-medium">{job.model}</h4>
                      <p className="text-sm text-muted-foreground">
                        Running for {formatDuration(job.startedAt)}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleStopTraining(job.id)}
                    >
                      <StopCircle className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  </div>
                  
                  <Progress value={job.progress} className="h-2" />
                  
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">ID: {job.id}</span>
                    <span className="text-xs">{job.progress}%</span>
                  </div>
                </div>
              ))
            )}
            
            <Button 
              className="w-full" 
              onClick={loadTrainingJobs}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </TabsContent>
          
          <TabsContent value="models" className="space-y-4 mt-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <h4 className="font-medium">Content Moderation v3</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Active - 99.8% accuracy</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3 mr-1" />
                    Test
                  </Button>
                  <Button size="sm" variant="outline">Stats</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <h4 className="font-medium">Persona Generator</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Active - 95.2% accuracy</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3 mr-1" />
                    Test
                  </Button>
                  <Button size="sm" variant="outline">Stats</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 border-amber-500/30">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                  <h4 className="font-medium">Sentiment Analysis</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Degraded - 87.5% accuracy</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Details</Button>
                  <Button size="sm" variant="outline">Retrain</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemsPanel;
