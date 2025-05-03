
import React from 'react';
import { MainLayout } from '@/layouts';

const NeuralMonitoringPage = () => {
  return (
    <MainLayout
      title="Neural Monitoring"
      description="Real-time monitoring of neural network performance"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Neural Monitoring System</h2>
          <p className="text-muted-foreground">
            Coming soon - Monitor neural network performance in real-time
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default NeuralMonitoringPage;
