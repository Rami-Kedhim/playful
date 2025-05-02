
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NeuralMonitoringPage: React.FC = () => {
  return (
    <MainLayout
      title="Neural Monitoring"
      description="Real-time monitoring of neural systems"
    >
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Neural Monitoring</h1>
              <p className="text-muted-foreground">
                Real-time health and performance monitoring for neural processing systems
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertTitle>Monitoring System</AlertTitle>
          <AlertDescription>
            The Neural Monitoring page is coming soon. Currently you can use the Analytics page to view system performance.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Activity className="h-5 w-5" />
                  <span>Real-time monitoring modules will appear here</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
