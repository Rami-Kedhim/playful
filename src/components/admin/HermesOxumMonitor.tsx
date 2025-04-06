
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, Zap, Brain, Activity } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { hermesOxumEngine } from '@/services/boost/HermesOxumEngine';

// Mock data
const performanceData = [
  { name: '12AM', hermes: 40, oxum: 24 },
  { name: '4AM', hermes: 30, oxum: 35 },
  { name: '8AM', hermes: 20, oxum: 32 },
  { name: '12PM', hermes: 27, oxum: 38 },
  { name: '4PM', hermes: 90, oxum: 75 },
  { name: '8PM', hermes: 120, oxum: 100 },
];

const boostDistributionData = [
  { name: 'VIP', ai: 40, real: 60 },
  { name: 'Premium', ai: 60, real: 40 },
  { name: 'Standard', ai: 80, real: 20 },
  { name: 'Basic', ai: 100, real: 10 },
];

const HermesOxumMonitor: React.FC = () => {
  const [systemLoad, setSystemLoad] = useState<number>(50);
  const [isFairRotationEnabled, setIsFairRotationEnabled] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleSystemLoadChange = (value: number[]) => {
    const loadValue = value[0];
    setSystemLoad(loadValue);
    
    // Update the actual system load in the engine (scale to 0-1)
    hermesOxumEngine.updateSystemLoad(loadValue / 100);
  };
  
  const handleOptimizeSystem = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 h-6 w-6" />
            Hermes + Oxum AI System
          </h2>
          <p className="text-muted-foreground">
            Unified visibility and recommendation engine monitoring
          </p>
        </div>
        
        <Button onClick={handleOptimizeSystem} disabled={isOptimizing}>
          {isOptimizing ? (
            <>Optimizing...</>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Optimize System
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              System Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{systemLoad}%</span>
                <Badge className={systemLoad > 80 ? "bg-red-500" : systemLoad > 60 ? "bg-amber-500" : "bg-green-500"}>
                  {systemLoad > 80 ? "High" : systemLoad > 60 ? "Moderate" : "Optimal"}
                </Badge>
              </div>
              
              <Slider
                value={[systemLoad]}
                max={100}
                step={1}
                onValueChange={handleSystemLoadChange}
                className="py-4"
              />
              
              <p className="text-xs text-muted-foreground">
                Current system load affects recommendation quality and distribution fairness
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Boost Queue Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">243</div>
              <Badge variant="outline">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              96 AI models, 147 real escorts in queue
            </p>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="fair-rotation" 
                  checked={isFairRotationEnabled} 
                  onCheckedChange={setIsFairRotationEnabled} 
                />
                <Label htmlFor="fair-rotation">Fair rotation enabled</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Time-Based Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">78%</div>
              <Badge className="bg-green-500">Peak Time</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current time-of-day visibility multiplier
            </p>
            <div className="mt-4">
              <Label className="text-xs">Peak hours adjustment</Label>
              <Input type="time" className="mt-1" defaultValue="20:00" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Boost effectiveness is currently 23% higher than last week due to optimized visibility distribution.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Hermes vs Oxum engine efficiency over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hermes" stroke="#8884d8" name="Hermes (Visibility)" />
                  <Line type="monotone" dataKey="oxum" stroke="#82ca9d" name="Oxum (Fairness)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Boost Distribution</CardTitle>
            <CardDescription>
              AI vs Real profile boost allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={boostDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ai" fill="#8884d8" name="AI Models" />
                  <Bar dataKey="real" fill="#82ca9d" name="Real Escorts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HermesOxumMonitor;
