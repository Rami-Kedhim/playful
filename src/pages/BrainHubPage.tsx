
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Activity, Network, Cpu, Settings } from 'lucide-react';
import { useNeuralRegistry } from '@/hooks/useNeuralRegistry';
import { hermesEngine } from '@/services/boost/hermes/HermesEngine';
import { oxumEngine } from '@/services/boost/oxum/OxumEngine';

const BrainHubPage = () => {
  const { services, loading, error } = useNeuralRegistry();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [systemMetrics, setSystemMetrics] = React.useState({
    cpuLoad: 42,
    memoryUsage: 68,
    networkLatency: 125,
    activeConnections: 254,
    hermesEfficiency: 91,
    oxumPrecision: 87
  });
  
  React.useEffect(() => {
    // In a real implementation, this would fetch actual metrics
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuLoad: Math.floor(Math.random() * 30) + 30,
        memoryUsage: Math.floor(Math.random() * 20) + 60,
        networkLatency: Math.floor(Math.random() * 50) + 100,
        activeConnections: Math.floor(Math.random() * 100) + 200,
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleOptimize = () => {
    // This would trigger actual optimization in a real implementation
    console.log("Optimizing neural systems");
    
    // Update Hermes and Oxum engines
    hermesEngine.updateConfig({
      aggressionFactor: 0.6,
      timeOfDayFactor: 1.2
    });
    
    oxumEngine.updateConfig({
      rotationFactor: 0.9,
      repetitionPenaltyFactor: 1.3
    });
  };

  return (
    <MainLayout title="Brain Hub" description="Neural systems management and optimization">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Brain Hub</h1>
          </div>
          <Button variant="outline" onClick={handleOptimize}>
            <Settings className="h-4 w-4 mr-2" />
            Optimize Neural Systems
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">CPU Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Cpu className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{systemMetrics.cpuLoad}%</div>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${systemMetrics.cpuLoad}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Activity className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{systemMetrics.memoryUsage}%</div>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${systemMetrics.memoryUsage}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Network className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{systemMetrics.networkLatency}ms</div>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${Math.min(systemMetrics.networkLatency / 2, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Brain className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{systemMetrics.activeConnections}</div>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${Math.min(systemMetrics.activeConnections / 5, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="metrics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="metrics">Neural Metrics</TabsTrigger>
            <TabsTrigger value="services">Neural Services</TabsTrigger>
            <TabsTrigger value="training">Training Data</TabsTrigger>
            <TabsTrigger value="settings">Neural Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle>Neural System Performance</CardTitle>
                <CardDescription>Real-time metrics from UberCore neural systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Hermes Flow Dynamics</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Efficiency</label>
                        <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${systemMetrics.hermesEfficiency}%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {systemMetrics.hermesEfficiency}% - High efficiency
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Time Impact Factor</label>
                        <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `78%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          78% - Good temporal alignment
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Flow Prediction Accuracy</label>
                        <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full" 
                            style={{ width: `84%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          84% - Above target
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Oxum Boost System</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Precision</label>
                        <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: `${systemMetrics.oxumPrecision}%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {systemMetrics.oxumPrecision}% - Within optimal range
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Fairness Distribution</label>
                        <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-pink-500 rounded-full" 
                            style={{ width: `92%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          92% - Excellent fairness allocation
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Attractor Stability</label>
                        <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full" 
                            style={{ width: `81%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          81% - Stable attractor mapping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Neural Services</CardTitle>
                <CardDescription>Manage active UberCore neural services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  {loading ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 text-muted-foreground">Loading neural services...</p>
                    </div>
                  ) : error ? (
                    <div className="p-8 text-center text-red-500">
                      <p>Error loading neural services: {error}</p>
                    </div>
                  ) : services.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>No neural services registered</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {services.map((service, index) => (
                        <div key={service.id || index} className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">v{service.version}</p>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              service.status === 'active' ? 'bg-green-500' :
                              service.status === 'inactive' ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}></div>
                            <span className="text-sm">{service.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Data</CardTitle>
                <CardDescription>Neural network training datasets and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground p-8">
                  Training data visualization coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Neural Settings</CardTitle>
                <CardDescription>Configure UberCore neural systems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground p-8">
                  Neural settings configuration coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BrainHubPage;
