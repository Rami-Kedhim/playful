
import React from 'react';
import { UnifiedLayout } from '@/layouts';

const EscortsPage = () => {
  return (
    <UnifiedLayout
      title="Escorts"
      description="Find verified escorts in your area"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Escort Listings</h2>
          <p className="text-muted-foreground">
            Coming soon - Browse and connect with verified escorts
          </p>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default EscortsPage;
