
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NeuralModel } from '@/types/neural/NeuralSystemMetrics';
import { Brain, Activity, Cpu, Server } from 'lucide-react';
import PerformanceChart from '@/components/neural/PerformanceChart';

const NeuralAnalyticsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('performance');
  
  // Mock neural performance data
  const cpuData = [28, 32, 45, 60, 52, 38];
  const memoryData = [42, 45, 50, 58, 63, 60];
  const requestData = [150, 220, 310, 400, 520, 480];
  
  // Labels for the timeline (last 6 hours)
  const hourLabels = [...Array(6)].map((_, i) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (5 - i));
    return `${hour.getHours()}:00`;
  });
  
  // Mock active neural models
  const activeModels: NeuralModel[] = [
    {
      id: 'model-1',
      name: 'Persona Matcher',
      version: '1.2.3',
      type: 'escort',
      size: 180,
      precision: 0.93,
      specialization: ['matching', 'recommendations'],
      capabilities: ['pattern recognition', 'preference learning'],
      status: 'active',
      performance: {
        accuracy: 0.91,
        latency: 120,
        throughput: 350,
        errorRate: 0.09,
        confidence: 0.88
      }
    },
    {
      id: 'model-2',
      name: 'Content Analyzer',
      version: '2.1.0',
      type: 'creator',
      size: 220,
      precision: 0.96,
      specialization: 'content analysis',
      capabilities: ['nsfw detection', 'content tagging', 'quality assessment'],
      status: 'active',
      performance: {
        accuracy: 0.94,
        latency: 180,
        throughput: 220,
        errorRate: 0.06,
        confidence: 0.92
      }
    }
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          Neural Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="models">Active Models</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <Cpu className="h-4 w-4 mr-1 text-muted-foreground" />
                CPU Usage (%)
              </h4>
              <PerformanceChart 
                data={cpuData} 
                labels={hourLabels} 
                color="#8b5cf6" 
                height={60}
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <Server className="h-4 w-4 mr-1 text-muted-foreground" />
                Memory Usage (%)
              </h4>
              <PerformanceChart 
                data={memoryData} 
                labels={hourLabels} 
                color="#ec4899" 
                height={60}
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <Activity className="h-4 w-4 mr-1 text-muted-foreground" />
                Requests per Minute
              </h4>
              <PerformanceChart 
                data={requestData} 
                labels={hourLabels} 
                color="#10b981" 
                height={60}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="models">
            <div className="space-y-3">
              {activeModels.map(model => (
                <div key={model.id} className="p-3 border border-border rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{model.name}</h4>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full">
                      {model.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    v{model.version} • {Array.isArray(model.specialization) ? model.specialization.join(', ') : model.specialization}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>Accuracy: {model.performance?.accuracy ? `${(model.performance.accuracy * 100).toFixed(1)}%` : 'N/A'}</div>
                    <div>Latency: {model.performance?.latency ? `${model.performance.latency}ms` : 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalyticsPanel;
