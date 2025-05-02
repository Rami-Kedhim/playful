
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BrainHubDashboard from '@/components/brainHub/BrainHubDashboard';
import BrainHubAnalytics from '@/components/brainHub/BrainHubAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const BrainHubPage: React.FC = () => {
  const { health } = useBrainHubHealth();
  
  return (
    <MainLayout
      title="Brain Hub"
      description="Neural intelligence system management"
    >
      <div className="space-y-6">
        <BrainHubDashboard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${
                      health.status === 'healthy' || health.status === 'online' ? 'bg-green-500' :
                      health.status === 'warning' ? 'bg-amber-500' :
                      health.status === 'maintenance' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`}></span>
                    <span className="font-medium capitalize">{health.status}</span>
                    {health.message && (
                      <span className="text-sm text-muted-foreground">{health.message}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">CPU Usage</p>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${health.metrics.cpuUsage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1">{health.metrics.cpuUsage}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Memory Usage</p>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500" 
                            style={{ width: `${health.metrics.memoryUsage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1">{health.metrics.memoryUsage}%</p>
                      </div>
                    </div>
                  </div>
                  
                  {(health.warnings.length > 0 || health.errors.length > 0) && (
                    <Alert className={health.errors.length > 0 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}>
                      <AlertTitle>System issues detected</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {health.errors.map((error, i) => (
                            <li key={`error-${i}`} className="text-red-700">{error}</li>
                          ))}
                          {health.warnings.map((warning, i) => (
                            <li key={`warning-${i}`} className="text-amber-700">{warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <BrainHubAnalytics />
        </div>
      </div>
    </MainLayout>
  );
};

export default BrainHubPage;
