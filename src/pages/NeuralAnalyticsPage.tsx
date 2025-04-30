
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';
import { ArrowUpRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const NeuralAnalyticsPage: React.FC = () => {
  return (
    <MainLayout
      title="Neural Analytics"
      description="Advanced neural system analytics and monitoring"
    >
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Neural System Analytics</h1>
              <p className="text-muted-foreground">
                Comprehensive metrics and insights for neural processing systems
              </p>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <span>View Documentation</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />

        <NeuralAnalytics />
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsPage;
