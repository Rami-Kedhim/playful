
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Activity, AlertTriangle, CheckCircle, Cpu, DownloadCloud } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNeuralSystemMetrics } from '@/hooks/useNeuralSystemMetrics';
import { Progress } from '@/components/ui/progress';

const SystemDiagnostics: React.FC = () => {
  const { logs, performance, refreshMetrics, errorMessage, isLoading } = useNeuralSystemMetrics();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('logs');
  const [downloading, setDownloading] = useState(false);
  
  // Refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMetrics();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [refreshMetrics]);
  
  const handleExportDiagnostics = () => {
    setDownloading(true);
    
    // Simulate downloading diagnostics data
    setTimeout(() => {
      setDownloading(false);
      toast({
        title: 'Diagnostics Exported',
        description: 'System diagnostics data has been downloaded',
      });
    }, 1500);
  };
  
  const getLogLevelBadge = (level: 'info' | 'warning' | 'error') => {
    switch (level) {
      case 'error':
        return <Badge variant="destructive">{level}</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600">{level}</Badge>;
      case 'info':
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };
  
  const getRecommendationBadge = (recommendation: string) => {
    if (recommendation.includes('CPU') || recommendation.includes('memory')) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (recommendation.includes('rate') || recommendation.includes('optimization')) {
      return <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600">Important</Badge>;
    } else {
      return <Badge variant="outline">Info</Badge>;
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-md flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              System Diagnostics
            </CardTitle>
            <CardDescription>
              Real-time system health and diagnostics
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportDiagnostics}
            disabled={downloading}
          >
            {downloading ? (
              <>Exporting...</>
            ) : (
              <>
                <DownloadCloud className="h-4 w-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errorMessage}
              <Button variant="outline" size="sm" className="mt-2 w-full" onClick={refreshMetrics}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logs">
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className="border p-2 rounded-md text-sm flex justify-between items-start"
                >
                  <div>
                    <div className="font-mono">{log.message}</div>
                    <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                  </div>
                  {getLogLevelBadge(log.level)}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            {performance && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Processing Efficiency</div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{performance.processingEfficiency}%</span>
                      <span className="text-muted-foreground">
                        {performance.processingTrend === 'up' ? '↑' : '↓'} Trend
                      </span>
                    </div>
                    <Progress value={performance.processingEfficiency} />
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Accuracy Rate</div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{performance.accuracyRate}%</span>
                      <span className="text-muted-foreground">
                        {performance.accuracyTrend === 'up' ? '↑' : '↓'} Trend
                      </span>
                    </div>
                    <Progress value={performance.accuracyRate} />
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Performance History</div>
                  <div className="h-[140px] bg-muted rounded-md flex items-end justify-between p-2">
                    {performance.history.map((value, index) => (
                      <div 
                        key={index}
                        className="bg-primary w-2 rounded-t-sm"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-center mt-1 text-muted-foreground">Last 24 hours</div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations">
            {performance?.recommendations && (
              <div className="space-y-2">
                {performance.recommendations.map((recommendation, index) => (
                  <Alert key={index} variant="default" className="py-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2" />
                        {recommendation}
                      </div>
                      {getRecommendationBadge(recommendation)}
                    </div>
                  </Alert>
                ))}
                
                {performance.recommendations.length === 0 && (
                  <div className="flex items-center justify-center h-[100px] flex-col">
                    <CheckCircle className="h-8 w-8 mb-2 text-green-500" />
                    <p>All systems operating within parameters</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center">
            <Activity className="h-3 w-3 mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <Button variant="ghost" size="sm" className="h-6 px-2" onClick={refreshMetrics}>
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemDiagnostics;
