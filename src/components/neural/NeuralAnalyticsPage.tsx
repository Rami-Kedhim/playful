
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Activity, Brain } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const NeuralAnalyticsPage: React.FC = () => {
  return (
    <MainLayout
      title="Neural Analytics"
      description="Advanced neural system analytics and monitoring dashboard"
    >
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Neural Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time metrics and insights for neural processing systems
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/neural-monitoring">
                <Activity className="h-4 w-4 mr-2" />
                <span>Monitoring</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <span>Documentation</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <NeuralAnalytics refreshInterval={30} />
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsPage;
