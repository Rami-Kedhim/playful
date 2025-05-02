
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, Activity, BarChart3 } from 'lucide-react';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';

interface NeuralAnalyticsProps {
  refreshInterval?: number;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ refreshInterval = 30000 }) => {
  const { analyticsData, detailedMetrics, loading, error, refreshAnalytics } = useNeuralAnalytics();
  
  // Automatic refresh based on refreshInterval
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshAnalytics();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval, refreshAnalytics]);
  
  if (loading && !analyticsData) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (error && !analyticsData) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center text-destructive">
            <p>Failed to load neural analytics data.</p>
            <Button 
              variant="outline" 
              onClick={refreshAnalytics}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!analyticsData) return null;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Response Time"
          value={analyticsData.systemMetrics.responseTimeMs}
          change={analyticsData.operationalMetrics.responseTimeChange}
          unit="ms"
        />
        <MetricCard 
          title="Accuracy"
          value={analyticsData.modelPerformance.accuracy * 100}
          change={analyticsData.operationalMetrics.accuracyChange}
          unit="%"
        />
        <MetricCard 
          title="Error Rate"
          value={analyticsData.systemMetrics.errorRate}
          change={analyticsData.operationalMetrics.errorRateChange * -1} // Invert for better display
          unit="%"
          inverted // Lower is better for error rate
        />
        <MetricCard 
          title="Operations"
          value={analyticsData.operationalMetrics.totalOperations}
          change={analyticsData.operationalMetrics.operationsChange}
          unit=""
        />
      </div>
      
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Neural System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <p>Performance chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>Neural Performance Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>Forecast chart will be displayed here</p>
                  <p className="text-sm mt-2">Displaying predictions for the next 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies">
          {detailedMetrics?.anomalies && detailedMetrics.anomalies.length > 0 ? (
            <div className="space-y-4">
              {detailedMetrics.anomalies.map((anomaly, index) => (
                <Card key={index} className={anomaly.resolved ? "border-muted" : "border-warning"}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">
                        Anomaly in {anomaly.metric}
                      </CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-md ${anomaly.resolved ? "bg-muted text-muted-foreground" : "bg-warning/20 text-warning"}`}>
                        {anomaly.resolved ? "Resolved" : `${anomaly.severity} severity`}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(anomaly.timestamp).toLocaleString()}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Expected</p>
                        <p className="text-lg font-medium">{anomaly.expected}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Actual</p>
                        <p className="text-lg font-medium">{anomaly.actual}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <p>No anomalies detected in the system</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
  inverted?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, unit, inverted = false }) => {
  const isPositive = inverted ? change < 0 : change > 0;
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;
  const absChange = Math.abs(change);
  const displayChange = absChange < 0.1 ? absChange.toFixed(2) : absChange < 1 ? absChange.toFixed(1) : Math.round(absChange);
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">
              {displayValue}{unit}
            </p>
            <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <span className="text-xs">
                {isPositive ? '+' : '-'}{displayChange}%
              </span>
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 ml-0.5" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalytics;
