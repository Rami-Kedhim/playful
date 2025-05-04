
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/MainLayout';

const HermesPage: React.FC = () => {
  return (
    <MainLayout
      title="Hermes Analytics"
      description="View insights and analytics from the Hermes system"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Journey Insights</h2>
            <p>Hermes analytics dashboard would be displayed here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Flow Visualization</h2>
            <p>Interactive flow visualization would be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HermesPage;
