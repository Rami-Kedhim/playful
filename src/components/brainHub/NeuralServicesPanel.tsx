
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, Settings } from 'lucide-react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { TrainingProgress } from '@/services/neural/types/neuralHub';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import useNeuralRegistry from '@/hooks/useNeuralRegistry';

interface NeuralServicesPanelProps {
  systemId?: string;
}

const NeuralServicesPanel: React.FC<NeuralServicesPanelProps> = ({ systemId }) => {
  const { services, loading, error, optimizeResources } = useNeuralRegistry();
  const [activeJobs, setActiveJobs] = useState<TrainingProgress[]>([]);
  
  useEffect(() => {
    const fetchJobs = () => {
      try {
        const jobs = neuralHub.getActiveTrainingJobs();
        setActiveJobs(jobs);
      } catch (err) {
        console.error('Failed to fetch training jobs:', err);
      }
    };
    
    fetchJobs();
    const intervalId = setInterval(fetchJobs, 30000);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neural Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Active Services</h3>
              <Button variant="outline" size="sm" onClick={optimizeResources}>
                <Settings className="h-4 w-4 mr-2" /> Optimize Resources
              </Button>
            </div>
            
            <div className="space-y-4">
              {services.map(service => (
                <div key={service.moduleId} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant={service.config.enabled ? 'default' : 'secondary'}>
                        {service.config.enabled ? 'Active' : 'Inactive'}
                      </Badge>
                      <h4 className="font-medium">{service.name}</h4>
                    </div>
                    <Switch checked={service.config.enabled} />
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">{service.moduleType}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Usage</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
              
              {services.length === 0 && (
                <div className="text-center p-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground">No neural services available</p>
                </div>
              )}
            </div>
            
            {activeJobs.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Active Training Jobs</h3>
                {activeJobs.map(job => (
                  <div key={job.id} className="p-3 bg-secondary/20 rounded-md mt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-sm">{job.type} Training</h4>
                        <p className="text-xs text-muted-foreground">Progress: {job.progress.toFixed(1)}%</p>
                      </div>
                      <Activity className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                    <Progress value={job.progress} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralServicesPanel;
