
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PerformanceChart from './PerformanceChart';
import { Activity, BarChart3, Database, Layers, RefreshCw, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NeuralAnalyticsDashboardProps {
  className?: string;
  refreshInterval?: number;
}

const NeuralAnalyticsDashboard: React.FC<NeuralAnalyticsDashboardProps> = ({ 
  className, 
  refreshInterval = 30000 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('performance');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Mock metrics data
  const metrics = {
    processingEfficiency: 87,
    accuracyRate: 94,
    systemLoad: 42,
    networkThroughput: 76,
    memoryUsage: 38,
    errorRate: 2.3,
    neuralDensity: 68,
    learningRate: 0.21,
    adaptiveCoefficient: 0.45,
    anomalyScore: 12,
  };
  
  // Create proper data format for charts (array of objects with timestamp and value)
  const processingData = [
    { timestamp: '6d', value: 65 },
    { timestamp: '5d', value: 68 },
    { timestamp: '4d', value: 72 },
    { timestamp: '3d', value: 73 },
    { timestamp: '2d', value: 80 },
    { timestamp: 'Yesterday', value: 85 },
    { timestamp: 'Today', value: 87 }
  ];

  const accuracyData = [
    { timestamp: '6d', value: 89 },
    { timestamp: '5d', value: 91 },
    { timestamp: '4d', value: 90 },
    { timestamp: '3d', value: 92 },
    { timestamp: '2d', value: 93 },
    { timestamp: 'Yesterday', value: 92 },
    { timestamp: 'Today', value: 94 }
  ];

  const memoryUsageData = [
    { timestamp: '6d', value: 42 },
    { timestamp: '5d', value: 45 },
    { timestamp: '4d', value: 39 },
    { timestamp: '3d', value: 41 },
    { timestamp: '2d', value: 36 },
    { timestamp: 'Yesterday', value: 35 },
    { timestamp: 'Today', value: 38 }
  ];

  const neuralActivityData = [
    { timestamp: '6d', value: 62 },
    { timestamp: '5d', value: 71 },
    { timestamp: '4d', value: 68 },
    { timestamp: '3d', value: 75 },
    { timestamp: '2d', value: 71 },
    { timestamp: 'Yesterday', value: 69 },
    { timestamp: 'Today', value: 74 }
  ];

  const errorRateData = [
    { timestamp: '6d', value: 3.1 },
    { timestamp: '5d', value: 2.8 },
    { timestamp: '4d', value: 2.9 },
    { timestamp: '3d', value: 2.7 },
    { timestamp: '2d', value: 2.5 },
    { timestamp: 'Yesterday', value: 2.4 },
    { timestamp: 'Today', value: 2.3 }
  ];

  const anomaliesData = [
    { timestamp: '6d', value: 18 },
    { timestamp: '5d', value: 16 },
    { timestamp: '4d', value: 15 },
    { timestamp: '3d', value: 14 },
    { timestamp: '2d', value: 13 },
    { timestamp: 'Yesterday', value: 14 },
    { timestamp: 'Today', value: 12 }
  ];

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    setLastRefreshed(new Date());
    toast({
      title: "Data Refreshed",
      description: "Neural analytics data has been updated.",
      duration: 3000,
    });
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Neural Analytics Dashboard</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </span>
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="performance" className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Anomalies
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Processing Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.processingEfficiency}%</div>
                  <PerformanceChart
                    data={processingData}
                    dataKey="timestamp"
                    lines={[
                      {
                        dataKey: "value",
                        name: "Efficiency",
                        color: "#8b5cf6",
                        strokeWidth: 2
                      }
                    ]}
                    height={100}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.accuracyRate}%</div>
                  <PerformanceChart
                    data={accuracyData}
                    dataKey="timestamp"
                    lines={[
                      {
                        dataKey: "value",
                        name: "Accuracy",
                        color: "#10b981",
                        strokeWidth: 2
                      }
                    ]}
                    height={100}
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Neural Activity</CardTitle>
                  <CardDescription>Overall neural system activity and utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    data={neuralActivityData}
                    dataKey="timestamp"
                    lines={[
                      {
                        dataKey: "value",
                        name: "Neural Activity",
                        color: "#3b82f6",
                        strokeWidth: 2
                      }
                    ]}
                    height={200}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xs text-muted-foreground mb-1">Neural Density</div>
                  <div className="text-xl font-bold">{metrics.neuralDensity}%</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xs text-muted-foreground mb-1">Learning Rate</div>
                  <div className="text-xl font-bold">{metrics.learningRate}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xs text-muted-foreground mb-1">Adaptive Coefficient</div>
                  <div className="text-xl font-bold">{metrics.adaptiveCoefficient}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xs text-muted-foreground mb-1">Error Rate</div>
                  <div className="text-xl font-bold">{metrics.errorRate}%</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Memory Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.memoryUsage}%</div>
                  <PerformanceChart
                    data={memoryUsageData}
                    dataKey="timestamp"
                    lines={[
                      {
                        dataKey: "value",
                        name: "Memory Usage",
                        color: "#ec4899",
                        strokeWidth: 2
                      }
                    ]}
                    height={200}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">System Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground">System Load</div>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${metrics.systemLoad}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{metrics.systemLoad}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground">Network Throughput</div>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full" 
                          style={{ width: `${metrics.networkThroughput}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{metrics.networkThroughput}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground">Memory Usage</div>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full rounded-full" 
                          style={{ width: `${metrics.memoryUsage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{metrics.memoryUsage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <Layers className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-xs text-muted-foreground">Neural Layers</div>
                    <div className="text-xl font-bold">12</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <Database className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <div className="text-xs text-muted-foreground">Data Nodes</div>
                    <div className="text-xl font-bold">24</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                    <div className="text-xs text-muted-foreground">Active Processes</div>
                    <div className="text-xl font-bold">8</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-xs text-muted-foreground">Queue Depth</div>
                    <div className="text-xl font-bold">3</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Anomalies Tab */}
          <TabsContent value="anomalies" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Anomaly Detection</CardTitle>
                <CardDescription>System anomalies detected over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">Anomaly Score: {metrics.anomalyScore}</div>
                <PerformanceChart
                  data={anomaliesData}
                  dataKey="timestamp"
                  lines={[
                    {
                      dataKey: "value",
                      name: "Anomalies",
                      color: "#ef4444",
                      strokeWidth: 2
                    }
                  ]}
                  height={200}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Error Rate Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metrics.errorRate}%</div>
                <PerformanceChart
                  data={errorRateData}
                  dataKey="timestamp"
                  lines={[
                    {
                      dataKey: "value",
                      name: "Error Rate",
                      color: "#f97316",
                      strokeWidth: 2
                    }
                  ]}
                  height={200}
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-2 bg-red-50 dark:bg-red-900/20 rounded flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Memory spike detected at 14:32</span>
                    </li>
                    <li className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">Response time degradation at 11:15</span>
                    </li>
                    <li className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Unusual access pattern at 09:47</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Anomaly Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-2 bg-green-50 dark:bg-green-900/20 rounded flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Automated memory optimization applied</span>
                    </li>
                    <li className="p-2 bg-green-50 dark:bg-green-900/20 rounded flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Load balancing adjusted for response time</span>
                    </li>
                    <li className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">Access pattern investigation in progress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NeuralAnalyticsDashboard;
