
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NeuralMetricsDisplay from '@/components/neural/NeuralMetricsDisplay';
import NeuralAnalyticsDashboard from '@/components/neural/NeuralAnalyticsDashboard';
import SystemHealthPanel from '@/components/brainHub/SystemHealthPanel';

const NeuralMonitoringPage: React.FC = () => {
  return (
    <MainLayout
      title="Neural Monitoring"
      description="Monitor and analyze neural system performance"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NeuralMetricsDisplay />
          <SystemHealthPanel />
        </div>
        
        <NeuralAnalyticsDashboard className="mt-6" />
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
