
import React from 'react';
import Layout from '@/components/layout/Layout';

const Messages = () => {
  return (
    <Layout title="Messages" description="Your conversations">
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <p className="text-muted-foreground">
          Your messages will appear here.
        </p>
      </div>
    </Layout>
  );
};

export default Messages;
