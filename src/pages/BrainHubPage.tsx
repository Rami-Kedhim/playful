
import React from 'react';
import { UnifiedLayout } from '@/layouts';

const BrainHubPage = () => {
  return (
    <UnifiedLayout
      title="Brain Hub"
      description="Central hub for neural network management"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Brain Hub</h2>
          <p className="text-muted-foreground">
            Coming soon - Access advanced neural network management tools
          </p>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default BrainHubPage;
