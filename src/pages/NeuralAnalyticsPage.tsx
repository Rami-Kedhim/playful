
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const NeuralAnalyticsPage = () => {
  return (
    <MainLayout
      title="Neural Analytics"
      description="Advanced analytics powered by our neural network"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Neural Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Coming soon - View detailed analytics powered by our neural network
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default NeuralAnalyticsPage;
