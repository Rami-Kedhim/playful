
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Activity, Settings, BarChart4, Zap, Shield, AlertTriangle } from 'lucide-react';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';
import NeuralSystemControls from '@/components/neural/NeuralSystemControls';
import NeuralRecommendations from '@/components/neural/NeuralRecommendations';
import NeuralAutomationPanel from '@/components/neural/NeuralAutomationPanel';
import NeuralSettingsPanel from '@/components/neural/NeuralSettingsPanel';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AutoRefreshControl from '@/components/analytics/AutoRefreshControl';

const NeuralMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  
  return (
    <MainLayout
      title="Neural Monitoring System"
      description="Advanced monitoring and control of neural processing systems"
    >
      <div className="px-4 py-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Neural Monitoring System</h1>
              <p className="text-sm text-muted-foreground">Advanced analytics and management for neural processing</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
              System Online
            </Badge>
            
            {activeTab === 'dashboard' && (
              <AutoRefreshControl 
                interval={refreshInterval} 
                onIntervalChange={setRefreshInterval} 
              />
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Automation</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="hidden lg:flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NeuralSystemControls />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Recommendations
                    </CardTitle>
                    <CardDescription>Smart suggestions for system optimization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <NeuralRecommendations />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart4 className="h-5 w-5 text-primary" />
                      System Performance
                    </CardTitle>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                  <CardDescription>Real-time performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <NeuralAnalytics refreshInterval={refreshInterval} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    System Alerts
                  </CardTitle>
                  <CardDescription>Recent warnings and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 text-sm">Memory usage above threshold</p>
                        <p className="text-xs text-amber-700 mt-1">Memory utilization reached 78% at 09:45 AM</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start gap-3">
                      <Activity className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800 text-sm">System maintenance completed</p>
                        <p className="text-xs text-blue-700 mt-1">Routine maintenance successfully completed at 03:00 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="automation" className="min-h-[600px]">
              <NeuralAutomationPanel />
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Neural System Analytics</CardTitle>
                    <CardDescription>Comprehensive analysis of neural processing performance</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <NeuralAnalytics refreshInterval={refreshInterval} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <NeuralSettingsPanel />
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security Dashboard
                  </CardTitle>
                  <CardDescription>System security status and controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <Shield className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Security Module</h3>
                    <p className="text-muted-foreground text-center mb-6">
                      Enhanced security features are available with the Security Module extension
                    </p>
                    <Button>Install Security Module</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
