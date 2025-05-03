
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Messages = () => {
  return (
    <Layout title="Messages" description="Your conversations with escorts and creators">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Messages</h2>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> New Message
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No messages yet</h3>
          <p className="text-muted-foreground mb-6">
            Start a conversation with an escort or creator to see messages here
          </p>
          <Button asChild>
            <a href="/escorts">Browse Escorts</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
