
import React from 'react';
import { UnifiedLayout } from '@/layouts';

const MessagesPage = () => {
  return (
    <UnifiedLayout 
      title="Messages"
      description="Your conversations"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Your message center</h2>
          <p className="text-muted-foreground">
            No messages yet. Start connecting to view your conversations here.
          </p>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default MessagesPage;
