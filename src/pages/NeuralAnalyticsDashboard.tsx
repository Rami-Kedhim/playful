
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Brain, LineChart } from 'lucide-react';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';

const NeuralAnalyticsDashboard: React.FC = () => {
  return (
    <MainLayout
      title="Neural Analytics Dashboard"
      description="Advanced neural processing system analytics and monitoring dashboard"
    >
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Neural Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive analytics for neural processing systems
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <NeuralAnalytics />
          
          <Separator className="my-2" />
          
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LineChart className="h-5 w-5" />
                  <span>Custom analytics modules can be added here</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsDashboard;
