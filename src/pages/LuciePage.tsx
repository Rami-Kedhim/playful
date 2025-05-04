
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/MainLayout';

const LuciePage: React.FC = () => {
  return (
    <MainLayout
      title="Lucie AI System"
      description="Interact with the Lucie AI system and view analytics"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
            <p>Lucie AI assistant interface would be displayed here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Usage Analytics</h2>
            <p>AI usage statistics would be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LuciePage;
