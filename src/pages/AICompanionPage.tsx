
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const AICompanionPage = () => {
  return (
    <MainLayout
      title="AI Companions"
      description="Explore virtual companions with advanced AI personalities"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">AI Companions</h2>
          <p className="text-muted-foreground">
            Coming soon - Explore our cutting-edge AI companions with unique personalities
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AICompanionPage;
