
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BarChart2, Brain, Calendar, Clock, LineChart as LineChartIcon, RefreshCw } from 'lucide-react';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';

const NeuralAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  
  // Mock data for demonstration purposes
  const mockPerformanceData = [
    { timestamp: '00:00', efficiency: 82, accuracy: 91, latency: 12 },
    { timestamp: '02:00', efficiency: 85, accuracy: 92, latency: 11 },
    { timestamp: '04:00', efficiency: 79, accuracy: 90, latency: 14 },
    { timestamp: '06:00', efficiency: 83, accuracy: 89, latency: 13 },
    { timestamp: '08:00', efficiency: 88, accuracy: 93, latency: 10 },
    { timestamp: '10:00', efficiency: 92, accuracy: 95, latency: 9 },
    { timestamp: '12:00', efficiency: 90, accuracy: 94, latency: 8 },
    { timestamp: '14:00', efficiency: 86, accuracy: 93, latency: 9 },
    { timestamp: '16:00', efficiency: 84, accuracy: 92, latency: 10 },
    { timestamp: '18:00', efficiency: 83, accuracy: 91, latency: 11 },
    { timestamp: '20:00', efficiency: 81, accuracy: 90, latency: 12 },
    { timestamp: '22:00', efficiency: 80, accuracy: 89, latency: 13 },
  ];
  
  const mockResourceData = [
    { timestamp: '00:00', cpu: 45, memory: 38, gpu: 30 },
    { timestamp: '02:00', cpu: 48, memory: 40, gpu: 32 },
    { timestamp: '04:00', cpu: 42, memory: 37, gpu: 28 },
    { timestamp: '06:00', cpu: 46, memory: 39, gpu: 31 },
    { timestamp: '08:00', cpu: 52, memory: 43, gpu: 35 },
    { timestamp: '10:00', cpu: 58, memory: 47, gpu: 42 },
    { timestamp: '12:00', cpu: 63, memory: 52, gpu: 48 },
    { timestamp: '14:00', cpu: 60, memory: 50, gpu: 45 },
    { timestamp: '16:00', cpu: 55, memory: 48, gpu: 40 },
    { timestamp: '18:00', cpu: 50, memory: 45, gpu: 38 },
    { timestamp: '20:00', cpu: 47, memory: 42, gpu: 33 },
    { timestamp: '22:00', cpu: 44, memory: 40, gpu: 30 },
  ];
  
  const handleRefresh = () => {
    refreshAnalytics();
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center text-destructive">
            <p>Failed to load analytics data: {error}</p>
            <Button variant="outline" onClick={handleRefresh} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Neural Analytics</h2>
          <p className="text-muted-foreground">
            Monitor performance and resource utilization metrics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="6h">6 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="anomalies" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Anomalies</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#8884d8" 
                      name="Efficiency %" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#82ca9d" 
                      name="Accuracy %" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="latency" 
                      stroke="#ffc658" 
                      name="Latency (ms)" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard 
              title="Neural Accuracy" 
              value="93.2%" 
              change="+2.1%" 
              timespan="vs. last period"
              trend="up"
            />
            <MetricCard 
              title="Processing Efficiency" 
              value="87.5%" 
              change="+4.3%" 
              timespan="vs. last period"
              trend="up"
            />
            <MetricCard 
              title="Average Latency" 
              value="12ms" 
              change="-3.2ms" 
              timespan="vs. last period"
              trend="down"
              downIsGood
            />
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockResourceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="#ff7d00" 
                      name="CPU %" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="memory" 
                      stroke="#0088fe" 
                      name="Memory %" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="gpu" 
                      stroke="#00C49F" 
                      name="GPU %" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard 
              title="CPU Usage" 
              value="52%" 
              change="+8%" 
              timespan="vs. last period"
              trend="up"
              downIsGood
            />
            <MetricCard 
              title="Memory Usage" 
              value="47%" 
              change="+5%" 
              timespan="vs. last period"
              trend="up"
              downIsGood
            />
            <MetricCard 
              title="GPU Usage" 
              value="38%" 
              change="+10%" 
              timespan="vs. last period"
              trend="up"
              downIsGood
            />
          </div>
        </TabsContent>
        
        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">System Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnomalyItem 
                  title="Memory Spike Detected" 
                  time="Today, 14:32"
                  severity="medium"
                  description="Sudden increase in memory usage detected in content analysis module. Autoscaling initiated."
                />
                <AnomalyItem 
                  title="Response Time Lag" 
                  time="Today, 08:17"
                  severity="low"
                  description="Minor increase in neural response time. Self-optimized after 3 minutes."
                />
                <AnomalyItem 
                  title="Model Drift Warning" 
                  time="Yesterday, 22:45"
                  severity="high"
                  description="Accuracy degradation detected in prediction service. Retraining recommended."
                />
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    View All Anomalies
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  timespan: string;
  trend: 'up' | 'down';
  downIsGood?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  timespan,
  trend,
  downIsGood = false
}) => {
  const isPositive = (trend === 'up' && !downIsGood) || (trend === 'down' && downIsGood);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            {timespan}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Anomaly Item Component
interface AnomalyItemProps {
  title: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

const AnomalyItem: React.FC<AnomalyItemProps> = ({ 
  title, 
  time, 
  severity,
  description
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div className={`${getSeverityColor()} h-2 w-2 mt-2 rounded-full flex-shrink-0`} />
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{time}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default NeuralAnalytics;
