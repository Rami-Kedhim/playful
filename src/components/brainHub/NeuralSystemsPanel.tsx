
import React, { useState, useEffect } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { NeuralModel, TrainingProgress } from '@/services/neural/types/neuralHub';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  CheckCircle, 
  Gauge, 
  Clock, 
  Activity,
  Zap, 
  Settings,
  BarChart,
  Brain,
  Loader2
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

interface NeuralSystemsPanelProps {
  models: NeuralModel[];
  advancedMode: boolean;
}

const NeuralSystemsPanel: React.FC<NeuralSystemsPanelProps> = ({ models, advancedMode }) => {
  const [selectedModel, setSelectedModel] = useState<NeuralModel | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingJobs, setTrainingJobs] = useState<TrainingProgress[]>([]);
  
  useEffect(() => {
    // Fetch training jobs periodically
    const fetchTrainingJobs = () => {
      const jobs = neuralHub.getActiveTrainingJobs();
      setTrainingJobs(jobs);
      
      // Check if any model is training
      setIsTraining(jobs.some(job => 
        ['pending', 'running', 'preparing', 'training', 'evaluating'].includes(job.status)
      ));
    };
    
    fetchTrainingJobs(); // Initial fetch
    
    // Set up interval for polling
    const intervalId = setInterval(fetchTrainingJobs, 2000);
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  const handleViewDetails = (model: NeuralModel) => {
    setSelectedModel(model);
    setIsDetailsOpen(true);
  };
  
  const handleStartTraining = (model: NeuralModel) => {
    neuralHub.startTraining(model.id, {
      optimizerType: 'adam',
      learningRate: 0.001,
      batchSize: 32,
      epochs: 20
    });
  };
  
  const handleStopTraining = (modelId: string) => {
    neuralHub.stopTraining(modelId);
  };
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'training':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Training</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getTrainingProgress = (modelId: string): TrainingProgress | undefined => {
    return trainingJobs.find(job => job.modelId === modelId);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => {
          const trainingProgress = getTrainingProgress(model.id);
          const isModelTraining = trainingProgress && 
            ['pending', 'running', 'preparing', 'training', 'evaluating'].includes(trainingProgress.status);
          
          return (
            <Card key={model.id} className="overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  {renderStatusBadge(model.status)}
                </div>
                <CardDescription className="line-clamp-2">
                  {model.capabilities.join(', ')}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-4 w-4 text-slate-500" />
                    <span>Accuracy:</span>
                  </div>
                  <div className="text-right font-medium">
                    {Math.round(model.performance.accuracy * 100)}%
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span>Latency:</span>
                  </div>
                  <div className="text-right font-medium">
                    {model.performance.latency}ms
                  </div>
                  
                  {advancedMode && (
                    <>
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4 text-slate-500" />
                        <span>Resources:</span>
                      </div>
                      <div className="text-right font-medium">
                        {Math.round(model.performance.resourceUsage * 100)}%
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-slate-500" />
                        <span>Throughput:</span>
                      </div>
                      <div className="text-right font-medium">
                        {model.performance.throughput}/s
                      </div>
                    </>
                  )}
                </div>
                
                {isModelTraining && trainingProgress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Training Progress:</span>
                      <span>{trainingProgress.progress}%</span>
                    </div>
                    <Progress value={trainingProgress.progress} />
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(model)}
                >
                  View Details
                </Button>
                
                {model.status === 'training' || isModelTraining ? (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleStopTraining(model.id)}
                  >
                    Stop Training
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => handleStartTraining(model)}
                  >
                    Start Training
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {/* Training Status Overview */}
      {isTraining && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Active Training Jobs</CardTitle>
            <CardDescription>
              Monitor the progress of all active neural model training jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[180px]">
              <div className="space-y-4">
                {trainingJobs
                  .filter(job => ['pending', 'running', 'preparing', 'training', 'evaluating'].includes(job.status))
                  .map((job) => {
                    const model = models.find(m => m.id === job.modelId);
                    return (
                      <div key={job.modelId} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="font-medium">{model?.name || job.modelId}</div>
                          <div className="text-sm">
                            {job.status === 'pending' && 'Pending...'}
                            {job.status === 'preparing' && 'Preparing environment...'}
                            {job.status === 'training' && 'Training...'}
                            {job.status === 'evaluating' && 'Evaluating...'}
                            {job.status === 'completed' && 'Completed'}
                            {job.status === 'failed' && 'Failed'}
                          </div>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {job.message ? job.message : `Progress: ${job.progress}% - Current accuracy: ${(job.accuracy * 100).toFixed(2)}%`}
                        </div>
                        <Separator className="my-2" />
                      </div>
                    );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {/* Model Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedModel && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {selectedModel.name}
                {renderStatusBadge(selectedModel.status)}
              </DialogTitle>
              <DialogDescription>
                {`Version ${selectedModel.version}`}
              </DialogDescription>
            </DialogHeader>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="capabilities">
                <AccordionTrigger>Capabilities</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedModel.capabilities.map((capability, i) => (
                      <li key={i} className="text-sm">{capability}</li>
                    ))}
                  </ul>
                  
                  {selectedModel.specialization && (
                    <>
                      <div className="font-semibold mt-4 mb-2">Specializations</div>
                      <ul className="list-disc pl-4 space-y-1">
                        {selectedModel.specialization.map((spec, i) => (
                          <li key={i} className="text-sm">{spec}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="performance">
                <AccordionTrigger>Performance Metrics</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">Accuracy</div>
                      <div className="text-2xl font-bold">
                        {Math.round(selectedModel.performance.accuracy * 100)}%
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">Latency</div>
                      <div className="text-2xl font-bold">
                        {selectedModel.performance.latency} ms
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">Resource Usage</div>
                      <div className="text-2xl font-bold">
                        {Math.round(selectedModel.performance.resourceUsage * 100)}%
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">Throughput</div>
                      <div className="text-2xl font-bold">
                        {selectedModel.performance.throughput} ops/s
                      </div>
                    </div>
                    
                    {advancedMode && selectedModel.performance.precision !== undefined && (
                      <>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">Precision</div>
                          <div className="text-2xl font-bold">
                            {Math.round(selectedModel.performance.precision * 100)}%
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">Recall</div>
                          <div className="text-2xl font-bold">
                            {selectedModel.performance.recall ? 
                              Math.round(selectedModel.performance.recall * 100) : '–'}%
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">F1 Score</div>
                          <div className="text-2xl font-bold">
                            {selectedModel.performance.f1Score ? 
                              Math.round(selectedModel.performance.f1Score * 100) : '–'}%
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    Last evaluation: {selectedModel.performance.lastEvaluation ? 
                      new Date(selectedModel.performance.lastEvaluation).toLocaleString() : 
                      'Unknown'}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {advancedMode && (
                <AccordionItem value="metadata">
                  <AccordionTrigger>Metadata</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="font-semibold">ID:</div>
                      <div>{selectedModel.id}</div>
                      
                      <div className="font-semibold">Created:</div>
                      <div>{new Date(selectedModel.createdAt).toLocaleString()}</div>
                      
                      <div className="font-semibold">Updated:</div>
                      <div>{new Date(selectedModel.updatedAt).toLocaleString()}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
            
            <DialogFooter className="mt-4">
              {selectedModel.status === 'training' || 
               getTrainingProgress(selectedModel.id)?.status === 'training' ? (
                <Button 
                  variant="destructive" 
                  onClick={() => handleStopTraining(selectedModel.id)}
                >
                  Stop Training
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  onClick={() => {
                    handleStartTraining(selectedModel);
                    setIsDetailsOpen(false);
                  }}
                >
                  Start Training
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default NeuralSystemsPanel;
