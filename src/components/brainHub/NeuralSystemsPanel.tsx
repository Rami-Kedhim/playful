
import React, { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { NeuralModel, TrainingProgress } from '@/services/neural/types/neuralHub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Clock, Zap, Brain } from 'lucide-react';
import TrainingProgressDetails from './TrainingProgressDetails';

interface NeuralSystemsPanelProps {
  models: NeuralModel[];
  advancedMode: boolean;
}

const NeuralSystemsPanel: React.FC<NeuralSystemsPanelProps> = ({ models, advancedMode }) => {
  const [activeTab, setActiveTab] = useState('models');
  const [activeModels, setActiveModels] = useState<NeuralModel[]>([]);
  const [trainingJobs, setTrainingJobs] = useState<TrainingProgress[]>([]);
  const [selectedTrainingJob, setSelectedTrainingJob] = useState<string | null>(null);
  
  // Set up periodic updates for training progress
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeTab === 'training') {
        updateTrainingJobs();
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [activeTab]);
  
  // Initial load and when switching to training tab
  useEffect(() => {
    if (activeTab === 'training') {
      updateTrainingJobs();
    }
    
    // Filter active models
    setActiveModels(models.filter(model => model.status === 'active'));
  }, [models, activeTab]);
  
  // Update training jobs from neural hub
  const updateTrainingJobs = () => {
    try {
      const jobs = neuralHub.getActiveTrainingJobs();
      setTrainingJobs(jobs);
      
      // If no selected job but we have jobs, select the first one
      if (!selectedTrainingJob && jobs.length > 0) {
        setSelectedTrainingJob(jobs[0].modelId);
      }
      // If selected job no longer exists, reset selection
      else if (selectedTrainingJob && !jobs.find(job => job.modelId === selectedTrainingJob)) {
        setSelectedTrainingJob(jobs.length > 0 ? jobs[0].modelId : null);
      }
    } catch (error) {
      console.error('Failed to fetch training jobs:', error);
    }
  };
  
  // Start training for a model
  const handleStartTraining = (modelId: string) => {
    // Find the model to get current accuracy
    const model = models.find(m => m.id === modelId);
    if (!model) return;
    
    try {
      const baseAccuracy = model.performance.accuracy;
      const success = neuralHub.startTraining(modelId, baseAccuracy);
      
      if (success) {
        // Switch to training tab
        setActiveTab('training');
        updateTrainingJobs();
        setSelectedTrainingJob(modelId);
      }
    } catch (error) {
      console.error('Failed to start training:', error);
    }
  };
  
  // Stop training for a model
  const handleStopTraining = (modelId: string) => {
    try {
      const success = neuralHub.stopTraining(modelId);
      if (success) {
        updateTrainingJobs();
      }
    } catch (error) {
      console.error('Failed to stop training:', error);
    }
  };
  
  // Render status badge for model
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'training':
        return <Badge className="bg-blue-500">Training</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  // Render status for training job
  const renderTrainingStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'running':
      case 'training':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      case 'stopped':
        return <Badge className="bg-amber-500">Stopped</Badge>;
      case 'pending':
      case 'preparing':
        return <Badge variant="secondary">Preparing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Find model name by id
  const getModelName = (modelId: string): string => {
    const model = models.find(m => m.id === modelId);
    return model ? model.name : "Unknown Model";
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="models">Neural Models</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          {advancedMode && <TabsTrigger value="advanced">Advanced</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="models" className="space-y-4">
          {models.map(model => (
            <Card key={model.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <div className="flex items-center mt-1 space-x-2">
                      {renderStatusBadge(model.status)}
                      <span className="text-xs text-muted-foreground">v{model.version}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={model.status === 'training'}
                    onClick={() => handleStartTraining(model.id)}
                  >
                    {model.status === 'training' ? 'Training...' : 'Train Model'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span>{Math.round(model.performance.accuracy * 100)}%</span>
                    </div>
                    <Progress value={model.performance.accuracy * 100} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground">Latency</span>
                      <div className="font-medium">{model.performance.latency} ms</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Resource Usage</span>
                      <div className="font-medium">{Math.round(model.performance.resourceUsage * 100)}%</div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-muted-foreground">Capabilities</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {model.capabilities.map((cap, i) => (
                        <Badge key={i} variant="outline">{cap}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="training" className="space-y-4">
          {trainingJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="mx-auto h-8 w-8 mb-2" />
              <p>No active training jobs</p>
              <p className="text-sm">Select a model and click "Train Model" to start</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trainingJobs.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {trainingJobs.map(job => (
                    <Button 
                      key={job.modelId}
                      variant={selectedTrainingJob === job.modelId ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTrainingJob(job.modelId)}
                    >
                      {getModelName(job.modelId)}
                      {job.status === 'running' && (
                        <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      )}
                    </Button>
                  ))}
                </div>
              )}
              
              {selectedTrainingJob && (
                <div>
                  {trainingJobs
                    .filter(job => job.modelId === selectedTrainingJob)
                    .map(job => (
                      <TrainingProgressDetails 
                        key={job.modelId}
                        trainingJob={job}
                        onStopTraining={handleStopTraining}
                        modelName={getModelName(job.modelId)}
                      />
                    ))}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trainingJobs.map(job => (
                  <Card 
                    key={job.modelId}
                    className={`cursor-pointer hover:border-primary transition-colors ${
                      selectedTrainingJob === job.modelId ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedTrainingJob(job.modelId)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          {getModelName(job.modelId)}
                        </CardTitle>
                        {renderTrainingStatus(job.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-1.5" />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Epoch {job.currentEpoch}/{job.totalEpochs}</span>
                          <span>Acc: {Math.round(job.accuracy * 100)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        {advancedMode && (
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Neural Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center justify-between">
                      <span>Force Optimization</span>
                      <Zap className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex items-center justify-between">
                      <span>Reset Neural Cache</span>
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Advanced controls should only be used by experienced operators.
                    Improper use can result in system instability.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default NeuralSystemsPanel;
