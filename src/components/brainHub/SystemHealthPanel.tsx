import React, { useState, useEffect } from 'react';
import { SystemHealthMetrics } from '@/services/neural/types/neuralHub';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  Cpu, 
  BarChart, 
  Clock, 
  AlertTriangle, 
  Shield, 
  Users, 
  DollarSign
} from 'lucide-react';

interface SystemHealthPanelProps {
  metrics: SystemHealthMetrics;
  advancedMode: boolean;
}

const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({ metrics, advancedMode }) => {
  const [metricsHistory, setMetricsHistory] = useState<SystemHealthMetrics[]>([]);
  
  useEffect(() => {
    // Add current metrics to history
    setMetricsHistory(prev => {
      const updated = [...prev, metrics];
      // Keep last 20 metrics
      if (updated.length > 20) {
        return updated.slice(-20);
      }
      return updated;
    });
  }, [metrics]);
  
  const getStatusIndicator = (value: number, thresholds: [number, number, number]) => {
    const [good, warning, critical] = thresholds;
    
    if (value < good) {
      return { color: "green", status: "Good" };
    } else if (value < warning) {
      return { color: "yellow", status: "Warning" };
    } else if (value < critical) {
      return { color: "orange", status: "Elevated" };
    } else {
      return { color: "red", status: "Critical" };
    }
  };
  
  const loadStatus = getStatusIndicator(metrics.load, [0.6, 0.8, 0.9]);
  const memoryStatus = getStatusIndicator(metrics.memoryUtilization, [0.7, 0.85, 0.95]);
  const errorStatus = getStatusIndicator(metrics.errorRate, [0.01, 0.05, 0.1]);
  
  const getSystemStatusBadge = () => {
    if (
      loadStatus.color === "red" ||
      memoryStatus.color === "red" ||
      errorStatus.color === "red" ||
      metrics.stability < 0.7
    ) {
      return <Badge className="bg-red-500">Critical</Badge>;
    } else if (
      loadStatus.color === "orange" ||
      memoryStatus.color === "orange" ||
      errorStatus.color === "orange" ||
      metrics.stability < 0.8
    ) {
      return <Badge className="bg-orange-500">Elevated</Badge>;
    } else if (
      loadStatus.color === "yellow" ||
      memoryStatus.color === "yellow" ||
      metrics.stability < 0.9
    ) {
      return <Badge className="bg-yellow-500">Warning</Badge>;
    } else {
      return <Badge className="bg-green-500">Normal</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Real-time System Health</h3>
        <div className="flex items-center gap-2">
          <span>System Status:</span>
          {getSystemStatusBadge()}
        </div>
      </div>
      
      {(metrics.load > 0.8 || metrics.errorRate > 0.05) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>System Alert</AlertTitle>
          <AlertDescription>
            {metrics.load > 0.8 && 'High system load detected. '}
            {metrics.errorRate > 0.05 && 'Elevated error rate detected.'}
            {' '}Consider scaling resources or investigating possible issues.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              System Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.load * 100)}%</div>
            <Progress value={metrics.load * 100} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              Status: <span className={`text-${loadStatus.color}-500 font-medium`}>{loadStatus.status}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Memory Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.memoryUtilization * 100)}%</div>
            <Progress value={metrics.memoryUtilization * 100} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              Status: <span className={`text-${memoryStatus.color}-500 font-medium`}>{memoryStatus.status}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.responseTime)} ms</div>
            <Progress value={Math.min(100, (metrics.responseTime / 200) * 100)} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              Benchmark: {metrics.responseTime < 50 ? "Excellent" : metrics.responseTime < 100 ? "Good" : "Elevated"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Error Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics.errorRate * 100).toFixed(2)}%</div>
            <Progress value={Math.min(100, metrics.errorRate * 1000)} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              Status: <span className={`text-${errorStatus.color}-500 font-medium`}>{errorStatus.status}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {advancedMode && (
        <>
          <h3 className="text-lg font-medium mt-8">Advanced Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  System Stability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(metrics.stability * 100)}%</div>
                <Progress value={metrics.stability * 100} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(metrics.userEngagement * 100)}%</div>
                <Progress value={metrics.userEngagement * 100} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Operations/Second
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(metrics.operationsPerSecond)}</div>
                <Progress 
                  value={Math.min(100, (metrics.operationsPerSecond / 2000) * 100)} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Economic Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(metrics.economicBalance * 100)}%</div>
                <Progress value={metrics.economicBalance * 100} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          
          <div className="text-xs text-muted-foreground text-right mt-4">
            Last updated: {new Date(metrics.lastUpdated).toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
};

export default SystemHealthPanel;
