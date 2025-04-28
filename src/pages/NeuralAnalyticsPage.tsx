
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralAnalytics from '@/components/neural/NeuralAnalytics';

const NeuralAnalyticsPage: React.FC = () => {
  return (
    <MainLayout
      title="Neural Analytics"
      description="Advanced neural system analytics and monitoring"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Neural System Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive metrics and insights for neural processing systems
            </p>
          </div>
        </div>

        <NeuralAnalytics />
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsPage;
