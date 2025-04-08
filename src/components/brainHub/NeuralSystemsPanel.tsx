
import React, { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { NeuralModel, TrainingProgress } from '@/services/neural/types/neuralHub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface NeuralSystemsPanelProps {
  models: NeuralModel[];
  advancedMode: boolean;
}

const NeuralSystemsPanel: React.FC<NeuralSystemsPanelProps> = ({ models, advancedMode }) => {
  const [activeTab, setActiveTab] = useState('models');
  const [activeModels, setActiveModels] = useState<NeuralModel[]>([]);
  const [trainingJobs, setTrainingJobs] = useState<TrainingProgress[]>([]);
  
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
      case 'pending':
      case 'preparing':
        return <Badge variant="secondary">Preparing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
            trainingJobs.map(job => (
              <Card key={job.modelId}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">
                        {models.find(m => m.id === job.modelId)?.name || 'Unknown Model'}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        {renderTrainingStatus(job.status)}
                      </div>
                    </div>
                    
                    {['running', 'training', 'preparing'].includes(job.status) && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStopTraining(job.modelId)}
                      >
                        Stop Training
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Current Accuracy</span>
                        <div className="font-medium">{Math.round(job.accuracy * 100)}%</div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Started</span>
                        <div className="font-medium">
                          {new Date(job.startTime).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    {job.message && (
                      <div className="text-sm border-l-4 border-blue-500 pl-3 py-1">
                        {job.message}
                      </div>
                    )}
                    
                    {job.error && (
                      <div className="flex items-start text-sm text-red-500 bg-red-50 p-2 rounded">
                        <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>{job.error}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
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
