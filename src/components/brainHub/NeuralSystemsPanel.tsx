
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle, RefreshCw, Activity, Lightbulb, Zap } from 'lucide-react';
import { useNeuralAnalytics } from '@/hooks/useNeuralAnalytics';
import { neuralHub } from '@/services/neural';

const NeuralSystemsPanel = () => {
  const {
    analytics,
    forecast,
    trainingJobs,
    loading,
    error,
    refreshData,
    startModelTraining,
    stopModelTraining
  } = useNeuralAnalytics();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 600);
  };
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading neural systems data...</span>
      </div>
    );
  }
  
  const healthColorMap = {
    high: "text-green-500",
    medium: "text-amber-500",
    low: "text-red-500"
  };
  
  const getHealthColor = (value: number) => {
    if (value >= 0.8) return healthColorMap.high;
    if (value >= 0.6) return healthColorMap.medium;
    return healthColorMap.low;
  };
  
  const getHealthStatus = (value: number) => {
    if (value >= 0.8) return "Good";
    if (value >= 0.6) return "Fair";
    return "Poor";
  };
  
  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Neural Systems</CardTitle>
          <CardDescription>
            Advanced neural network monitoring and analytics
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
          Refresh
        </Button>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-0">
          <TabsContent value="overview" className="p-4 pt-0 space-y-4">
            {/* Health Summary */}
            {analytics && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className={`text-2xl font-bold ${getHealthColor(analytics.summary.overallHealth)}`}>
                          {Math.round(analytics.summary.overallHealth * 100)}%
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getHealthStatus(analytics.summary.overallHealth)}
                        </span>
                      </div>
                      <Progress 
                        value={analytics.summary.overallHealth * 100} 
                        className="h-2 mt-2" 
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-bold text-red-500">
                            {analytics.summary.criticalIssues}
                          </span>
                          <span className="text-xs text-muted-foreground">Critical</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-bold text-amber-500">
                            {analytics.summary.warnings}
                          </span>
                          <span className="text-xs text-muted-foreground">Warnings</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">
                          {analytics.trends.length > 0 && 
                            Math.round(analytics.trends[analytics.trends.length - 1].responseTime)}
                          <span className="text-sm font-normal">ms</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Average response time
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-green-500">
                          {(analytics.predictionAccuracy * 100).toFixed(1)}%
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Last 24 hours
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <Card className="h-full">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">System Load & Stability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analytics.trends}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="timestamp" 
                                tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                              />
                              <YAxis />
                              <Tooltip 
                                formatter={(value, name) => [
                                  name === 'load' ? `${(Number(value) * 100).toFixed(1)}%` : 
                                  name === 'stability' ? `${(Number(value) * 100).toFixed(1)}%` : value,
                                  name === 'load' ? 'System Load' : 
                                  name === 'stability' ? 'Stability' : name
                                ]}
                                labelFormatter={(value) => new Date(value).toLocaleString()}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="load" 
                                stroke="#8884d8" 
                                name="load"
                                activeDot={{ r: 8 }} 
                              />
                              <Line 
                                type="monotone" 
                                dataKey="stability" 
                                stroke="#82ca9d" 
                                name="stability" 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analytics.summary.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start">
                            <Lightbulb className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                        {analytics.summary.recommendations.length === 0 && (
                          <li className="text-sm text-muted-foreground">
                            No recommendations at this time
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="models" className="p-4 pt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {neuralHub.getModels().map(model => (
                  <Card key={model.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-base">{model.name}</CardTitle>
                          <CardDescription>v{model.version}</CardDescription>
                        </div>
                        <Badge 
                          className={
                            model.status === 'active' ? 'bg-green-500' :
                            model.status === 'training' ? 'bg-blue-500' :
                            model.status === 'error' ? 'bg-red-500' :
                            'bg-slate-500'
                          }
                        >
                          {model.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm font-medium">Accuracy</div>
                          <div className="text-2xl">{(model.performance.accuracy * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Latency</div>
                          <div className="text-2xl">{model.performance.latency}<span className="text-sm">ms</span></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Throughput</div>
                          <div className="text-2xl">{model.performance.throughput}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-1">Capabilities</div>
                        <div className="flex flex-wrap gap-1">
                          {model.capabilities.map(cap => (
                            <Badge key={cap} variant="outline">{cap}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 py-2">
                      <div className="flex justify-end w-full gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          disabled={model.status === 'training'}
                          onClick={() => startModelTraining(model.id)}
                        >
                          {model.status === 'training' ? 'Training...' : 'Train'}
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          disabled={model.status !== 'active'}
                        >
                          Run
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="training" className="p-4 pt-0">
            <div className="space-y-4">
              {trainingJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active training jobs
                </div>
              ) : (
                trainingJobs.map(job => (
                  <Card key={job.modelId}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-base">
                            {neuralHub.getModel(job.modelId)?.name || job.modelId}
                          </CardTitle>
                          <CardDescription>Training in progress</CardDescription>
                        </div>
                        <Badge className={
                          job.status === 'preparing' ? 'bg-slate-500' :
                          job.status === 'training' ? 'bg-blue-500' :
                          job.status === 'evaluating' ? 'bg-amber-500' :
                          job.status === 'completed' ? 'bg-green-500' :
                          'bg-red-500'
                        }>
                          {job.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm">{job.progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium">Start Time</div>
                            <div className="text-sm">
                              {job.startTime.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Expected Completion</div>
                            <div className="text-sm">
                              {job.expectedCompletionTime 
                                ? job.expectedCompletionTime.toLocaleString() 
                                : 'Unknown'}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium">Current Accuracy</div>
                          <div className="text-lg font-semibold">
                            {(job.accuracy * 100).toFixed(1)}%
                          </div>
                        </div>
                        
                        {job.message && (
                          <div className="text-sm italic text-muted-foreground">{job.message}</div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 py-2">
                      <div className="flex justify-end w-full gap-2">
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => stopModelTraining(job.modelId)}
                          disabled={job.status === 'completed' || job.status === 'failed'}
                        >
                          Cancel Training
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="forecast" className="p-4 pt-0">
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">7-Day Performance Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="period" 
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'load' ? `${(Number(value) * 100).toFixed(1)}%` : 
                          name === 'stability' ? `${(Number(value) * 100).toFixed(1)}%` : 
                          name === 'errorRate' ? `${(Number(value) * 100).toFixed(3)}%` : 
                          `${value}ms`,
                          name === 'load' ? 'System Load' : 
                          name === 'stability' ? 'Stability' : 
                          name === 'errorRate' ? 'Error Rate' : 
                          'Response Time'
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="load" 
                        name="load"
                        stroke="#8884d8" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stability" 
                        name="stability"
                        stroke="#82ca9d" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="errorRate" 
                        name="errorRate"
                        stroke="#ff7300" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responseTime" 
                        name="responseTime"
                        stroke="#0088aa" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default NeuralSystemsPanel;
