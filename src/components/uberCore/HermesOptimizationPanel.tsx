
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart, Legend 
} from 'recharts';
import { 
  Brain, 
  Activity, 
  Zap,
  BarChart2,
  Sigma,
  Users,
  Flame,
  HelpCircle,
  RefreshCcw,
  ChevronRight,
  ThumbsUp
} from 'lucide-react';

import { hermesEngine } from '@/services/boost/hermes/HermesEngine';
import { oxumLearningService } from '@/services/neural/modules/OxumLearningService';

interface OptimizationMetric {
  name: string;
  value: number;
  delta: number;
  target: number;
}

interface PredictionData {
  time: string;
  observed: number;
  predicted: number;
  optimized: number;
}

const HermesOptimizationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('engagement');
  const [metrics, setMetrics] = useState<Record<string, OptimizationMetric[]>>({
    engagement: [],
    conversion: [],
    retention: []
  });
  const [predictionData, setPredictionData] = useState<PredictionData[]>([]);
  const [systemLoad, setSystemLoad] = useState(65);
  const [optimizationActive, setOptimizationActive] = useState(true);
  const [lastOptimized, setLastOptimized] = useState<Date | null>(new Date());
  const { toast } = useToast();

  // Initialize metrics
  useEffect(() => {
    // This would fetch real metrics from the services in a real implementation
    setMetrics({
      engagement: [
        { name: 'View Duration', value: 82, delta: 4.2, target: 90 },
        { name: 'Profile Clicks', value: 67, delta: 12.5, target: 75 },
        { name: 'Message Rate', value: 41, delta: 8.7, target: 50 },
        { name: 'Content Interaction', value: 59, delta: -2.3, target: 65 }
      ],
      conversion: [
        { name: 'Booking Rate', value: 23, delta: 5.1, target: 30 },
        { name: 'Premium Upgrades', value: 15, delta: 3.8, target: 22 },
        { name: 'Credit Purchases', value: 37, delta: 9.4, target: 40 },
        { name: 'Content Purchases', value: 28, delta: 6.2, target: 35 }
      ],
      retention: [
        { name: 'Daily Active Users', value: 74, delta: 2.8, target: 85 },
        { name: 'Session Frequency', value: 63, delta: 4.5, target: 70 },
        { name: '7-Day Return Rate', value: 42, delta: 7.9, target: 55 },
        { name: '30-Day Retention', value: 58, delta: 3.1, target: 60 }
      ]
    });

    // Generate simulated prediction data
    generatePredictionData();
  }, []);

  // Generate simulated prediction data for the charts
  const generatePredictionData = () => {
    const data: PredictionData[] = [];
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      const timeStr = `${time.getHours()}:00`;
      
      const baseValue = 50 + Math.sin(i / 3) * 20;
      const noise = Math.random() * 10 - 5;
      const observed = Math.max(0, Math.min(100, baseValue + noise));
      
      const predictedNoise = Math.random() * 6 - 3;
      const predicted = Math.max(0, Math.min(100, observed + predictedNoise));
      
      const optimizationBoost = i > 12 ? 5 + Math.random() * 8 : 0;
      const optimized = Math.max(0, Math.min(100, predicted + optimizationBoost));
      
      data.push({
        time: timeStr,
        observed: Math.round(observed),
        predicted: Math.round(predicted),
        optimized: Math.round(optimized)
      });
    }
    
    setPredictionData(data);
  };

  const handleOptimizationToggle = () => {
    const newState = !optimizationActive;
    setOptimizationActive(newState);
    
    toast({
      title: newState ? "Optimization Activated" : "Optimization Deactivated",
      description: newState 
        ? "HERMES + Oxum optimization is now actively improving system performance"
        : "HERMES + Oxum optimization has been paused",
      variant: newState ? "success" : "warning",
    });
    
    if (newState) {
      setLastOptimized(new Date());
    }
  };

  const handleRefreshMetrics = () => {
    // This would refresh metrics from the actual services in a real implementation
    toast({
      title: "Metrics Refreshed",
      description: "Optimization metrics have been updated from the latest data",
    });
    
    // Regenerate prediction data
    generatePredictionData();
    
    // Simulate updated metrics
    setMetrics(prevMetrics => {
      const updatedMetrics: Record<string, OptimizationMetric[]> = {};
      
      for (const [category, metricsList] of Object.entries(prevMetrics)) {
        updatedMetrics[category] = metricsList.map(metric => {
          const deltaChange = (Math.random() * 4) - 1; // Between -1 and 3
          const newValue = Math.max(0, Math.min(100, metric.value + deltaChange));
          
          return {
            ...metric,
            value: Math.round(newValue * 10) / 10,
            delta: Math.round((metric.delta + (Math.random() - 0.3)) * 10) / 10
          };
        });
      }
      
      return updatedMetrics;
    });
  };

  // Format timestamp for display
  const formatTime = (date: Date | null): string => {
    if (!date) return 'Never';
    
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Sigma className="h-5 w-5 mr-2 text-primary" />
              HERMES + Oxum Optimization
            </CardTitle>
            <CardDescription>
              Advanced AI optimization and predictive resource allocation
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={optimizationActive ? "success" : "warning"}
              className="flex items-center gap-1 py-1"
            >
              {optimizationActive ? <Flame className="h-3 w-3" /> : <HelpCircle className="h-3 w-3" />}
              {optimizationActive ? "Active" : "Paused"}
            </Badge>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefreshMetrics}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button
              size="sm"
              variant={optimizationActive ? "destructive" : "default"}
              onClick={handleOptimizationToggle}
            >
              {optimizationActive ? "Disable" : "Enable"} Optimization
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <Card>
            <CardContent className="p-3 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground">System Load</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-2xl font-bold">{systemLoad}%</span>
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <Progress className="h-1 mt-2" value={systemLoad} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground">HERMES Efficiency</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-2xl font-bold">91%</span>
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <Progress className="h-1 mt-2" value={91} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground">Oxum Precision</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-2xl font-bold">87%</span>
                <BarChart2 className="h-4 w-4 text-primary" />
              </div>
              <Progress className="h-1 mt-2" value={87} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground">Last Optimization</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-lg font-medium">{formatTime(lastOptimized)}</span>
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {optimizationActive ? "Continuously optimizing" : "Optimization paused"}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardHeader>
      
      <CardContent>
        {optimizationActive && (
          <Alert variant="success" className="mb-4">
            <ThumbsUp className="h-4 w-4" />
            <AlertDescription>
              HERMES + Oxum optimization is active. Current efficiency gain: <strong>+24.7%</strong> over baseline.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="engagement" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Engagement Optimization
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Predictive Analysis
            </TabsTrigger>
            <TabsTrigger value="equations" className="flex items-center">
              <Sigma className="h-4 w-4 mr-2" />
              Mathematical Models
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(metrics).map(([category, metricsList]) => (
                <Card key={category}>
                  <CardHeader className="py-3 border-b">
                    <CardTitle className="text-sm capitalize">
                      {category} Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {metricsList.map((metric, index) => (
                      <div 
                        key={metric.name} 
                        className={`px-4 py-3 ${index < metricsList.length - 1 ? 'border-b' : ''}`}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{metric.name}</span>
                          <span className="text-sm font-medium flex items-center">
                            {metric.value}%
                            <span className={`ml-2 text-xs ${metric.delta > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {metric.delta > 0 ? `+${metric.delta}%` : `${metric.delta}%`}
                            </span>
                          </span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-primary rounded-full"
                            style={{ width: `${metric.value}%` }}
                          />
                          <div 
                            className="absolute top-0 right-0 h-full border-l-2 border-dashed border-primary/50"
                            style={{ left: `${metric.target}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          Target: {metric.target}%
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">24-Hour Engagement Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={predictionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="observed" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                        name="Observed"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="predicted" 
                        stackId="2"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        fillOpacity={0.3}
                        name="Predicted"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="optimized" 
                        stackId="3"
                        stroke="#ffc658" 
                        fill="#ffc658" 
                        fillOpacity={0.3}
                        name="With Optimization"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="predictions" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Engagement Prediction</CardTitle>
                  <CardDescription>
                    Projected user engagement based on HERMES modeling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={predictionData.slice(-12)} // Show only last 12 hours
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="observed" 
                          stroke="#8884d8" 
                          name="Observed" 
                          dot={true}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#82ca9d" 
                          name="Predicted" 
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Optimization Impact</CardTitle>
                  <CardDescription>
                    Improvement from HERMES + Oxum optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={predictionData.slice(-12)} // Show only last 12 hours
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#82ca9d" 
                          name="Without Optimization" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="optimized" 
                          stroke="#ff7300" 
                          name="With Optimization"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="py-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm">Prediction Accuracy</CardTitle>
                  <CardDescription>
                    HERMES model prediction vs actual outcomes
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-2">87.3% Accurate</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center">
                      <ChevronRight className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">User Engagement Rate</div>
                        <div className="text-sm text-muted-foreground">12-hour prediction window</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">92.4% Accurate</div>
                      <div className="text-xs text-muted-foreground">±2.3% margin</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center">
                      <ChevronRight className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">Conversion Optimization</div>
                        <div className="text-sm text-muted-foreground">8-hour prediction window</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">85.7% Accurate</div>
                      <div className="text-xs text-muted-foreground">±3.1% margin</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center">
                      <ChevronRight className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">Resource Allocation</div>
                        <div className="text-sm text-muted-foreground">4-hour prediction window</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">89.1% Accurate</div>
                      <div className="text-xs text-muted-foreground">±1.7% margin</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center">
                      <ChevronRight className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">Revenue Projection</div>
                        <div className="text-sm text-muted-foreground">24-hour prediction window</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">83.2% Accurate</div>
                      <div className="text-xs text-muted-foreground">±4.5% margin</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="equations" className="space-y-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">HERMES Mathematical Models</CardTitle>
                <CardDescription>
                  Core differential equations driving the optimization system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <div className="font-medium mb-2">Core Engagement Equation</div>
                    <div className="font-mono text-sm p-2 bg-background rounded border">
                      Engagement(t) = ∫ [Boost(t) * Content(t) * IA(t)] dt
                    </div>
                    <div className="text-sm mt-2">
                      This integral represents the cumulative engagement over time as a function of boost effectiveness,
                      content quality, and AI interaction quality.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <div className="font-medium mb-2">Optimization Differential</div>
                    <div className="font-mono text-sm p-2 bg-background rounded border">
                      dE/dt = α(Conversion) - β(ExitRate)
                    </div>
                    <div className="text-sm mt-2">
                      The rate of change in engagement is proportional to conversion rate minus the exit rate,
                      with α and β as weighting factors derived from historical data.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <div className="font-medium mb-2">Stability Function</div>
                    <div className="font-mono text-sm p-2 bg-background rounded border">
                      min ∫|d²E/dt²|
                    </div>
                    <div className="text-sm mt-2">
                      HERMES minimizes the second derivative of engagement to ensure stable growth
                      rather than unpredictable spikes and drops.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <div className="font-medium mb-2">Boost Allocation Formula</div>
                    <div className="font-mono text-sm p-2 bg-background rounded border">
                      Boost(profile, t) = λ * P(conversion|profile, context) / cost
                    </div>
                    <div className="text-sm mt-2">
                      Optimal boost allocation is proportional to the probability of conversion given the profile and context,
                      divided by the cost, with λ as a normalization factor.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Dynamic System Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">α (Conversion Weight)</span>
                      <span className="text-sm font-medium">0.72</span>
                    </div>
                    <Progress value={72} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">β (Exit Rate Weight)</span>
                      <span className="text-sm font-medium">0.43</span>
                    </div>
                    <Progress value={43} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">λ (Boost Normalization)</span>
                      <span className="text-sm font-medium">1.28</span>
                    </div>
                    <Progress value={64} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">γ (Learning Rate)</span>
                      <span className="text-sm font-medium">0.15</span>
                    </div>
                    <Progress value={15} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">δ (Decay Constant)</span>
                      <span className="text-sm font-medium">0.08</span>
                    </div>
                    <Progress value={8} className="h-1" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Oxum Learning Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Context Weight</span>
                      <span className="text-sm font-medium">0.85</span>
                    </div>
                    <Progress value={85} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Temporal Sensitivity</span>
                      <span className="text-sm font-medium">0.62</span>
                    </div>
                    <Progress value={62} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Geographic Influence</span>
                      <span className="text-sm font-medium">0.57</span>
                    </div>
                    <Progress value={57} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Cultural Adaptation</span>
                      <span className="text-sm font-medium">0.73</span>
                    </div>
                    <Progress value={73} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Trend Detection</span>
                      <span className="text-sm font-medium">0.91</span>
                    </div>
                    <Progress value={91} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HermesOptimizationPanel;
