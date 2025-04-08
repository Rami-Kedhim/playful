
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, BarChart2, AlertTriangle, Activity, Terminal, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNeuralSystemMetrics } from "@/hooks/useNeuralSystemMetrics";

const SystemDiagnostics: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'metrics' | 'performance' | 'logs'>('metrics');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { 
    metrics, 
    performance, 
    logs, 
    isLoading, 
    errorMessage, 
    refreshMetrics
  } = useNeuralSystemMetrics();

  const handleRefresh = async () => {
    try {
      await refreshMetrics();
      toast({
        title: "Diagnostics Refreshed",
        description: "System diagnostics data has been updated",
      });
    } catch (err) {
      setError("Failed to refresh diagnostics data");
      toast({
        variant: "destructive",
        title: "Refresh Failed",
        description: "Could not update system diagnostics",
      });
    }
  };

  const handleExportData = () => {
    setIsExporting(true);
    
    try {
      const exportData = {
        metrics,
        performance,
        timestamp: new Date().toISOString(),
        system: "HERMES-OXUM Neural System"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `system-diagnostics-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: "Diagnostics data has been downloaded",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Could not export diagnostics data",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">System Diagnostics</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center">
            <Terminal className="h-6 w-6 mb-2 text-muted-foreground animate-pulse" />
            <p className="text-sm text-muted-foreground">Loading diagnostics data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Terminal className="h-4 w-4 mr-2" />
            System Diagnostics
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh} 
              className="h-7 px-2"
              disabled={isLoading}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportData}
              disabled={isExporting || isLoading}
              className="h-7"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {(error || errorMessage) && (
          <Alert variant="destructive" className="mb-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex justify-between w-full">
              <span>{error || errorMessage}</span>
              <button onClick={handleDismissError} className="text-xs hover:underline">
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs 
          defaultValue="metrics" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'metrics' | 'performance' | 'logs')} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="space-y-3">
              {metrics ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">System Load</span>
                      <Badge variant={metrics.systemLoad > 80 ? "destructive" : metrics.systemLoad > 60 ? "warning" : "outline"}>
                        {metrics.systemLoad}%
                      </Badge>
                    </div>
                    <Progress value={metrics.systemLoad} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Memory Allocation</span>
                      <Badge variant={metrics.memoryAllocation > 85 ? "destructive" : metrics.memoryAllocation > 70 ? "warning" : "outline"}>
                        {metrics.memoryAllocation}%
                      </Badge>
                    </div>
                    <Progress value={metrics.memoryAllocation} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Network Throughput</span>
                      <Badge variant="outline">
                        {metrics.networkThroughput} MB/s
                      </Badge>
                    </div>
                    <Progress value={metrics.networkThroughput / 10 * 100} max={100} className="h-1.5" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="border rounded p-2">
                      <div className="text-xs text-muted-foreground mb-1">Active Models</div>
                      <div className="font-medium text-sm">{metrics.activeModels}</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="text-xs text-muted-foreground mb-1">Request Rate</div>
                      <div className="font-medium text-sm">{metrics.requestRate} req/s</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="text-xs text-muted-foreground mb-1">Avg. Response Time</div>
                      <div className="font-medium text-sm">{metrics.averageResponseTime} ms</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="text-xs text-muted-foreground mb-1">Error Rate</div>
                      <div className="font-medium text-sm">{metrics.errorRate}%</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  No metrics data available
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            {performance ? (
              <div className="space-y-2">
                <div className="border rounded p-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Processing Efficiency</div>
                      <div className="flex items-center">
                        <span className="font-medium">{performance.processingEfficiency}%</span>
                        {performance.processingTrend === 'up' ? (
                          <Activity className="h-3.5 w-3.5 ml-1 text-green-500" />
                        ) : (
                          <Activity className="h-3.5 w-3.5 ml-1 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Accuracy Rate</div>
                      <div className="flex items-center">
                        <span className="font-medium">{performance.accuracyRate}%</span>
                        {performance.accuracyTrend === 'up' ? (
                          <Activity className="h-3.5 w-3.5 ml-1 text-green-500" />
                        ) : (
                          <Activity className="h-3.5 w-3.5 ml-1 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded p-3">
                  <div className="text-xs text-muted-foreground mb-2">Performance History (24h)</div>
                  <div className="h-20 flex items-end space-x-1">
                    {performance.history.map((value, index) => (
                      <div
                        key={index}
                        className={`w-full bg-primary/80 rounded-t-sm`}
                        style={{ 
                          height: `${value}%`,
                          opacity: 0.3 + ((index / performance.history.length) * 0.7)
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded p-3">
                  <div className="text-xs text-muted-foreground mb-3">Optimization Recommendations</div>
                  <ul className="space-y-2 text-xs">
                    {performance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <BarChart2 className="h-3.5 w-3.5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground text-sm">
                No performance data available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="border rounded bg-muted/30">
              <div className="p-2 border-b bg-muted/50 text-xs font-medium">System Logs</div>
              <div className="p-2 max-h-[200px] overflow-y-auto">
                {logs && logs.length > 0 ? (
                  <div className="font-mono text-xs space-y-1.5">
                    {logs.map((log, index) => (
                      <div key={index} className={`flex ${log.level === 'error' ? 'text-red-500' : log.level === 'warning' ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        <span className="w-20 mr-2 text-muted-foreground">{log.timestamp}</span>
                        <span className="w-16 mr-2">[{log.level}]</span>
                        <span>{log.message}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-muted-foreground text-xs">
                    No log entries available
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemDiagnostics;
