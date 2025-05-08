
import React from 'react';
import Layout from '@/layouts/Layout';

const EscortsPage = () => {
  return (
    <Layout
      title="Escorts"
      description="Browse available escorts in your area"
      showBreadcrumbs
    >
      <div className="text-center py-20 text-muted-foreground">
        <h2 className="text-2xl mb-2">Escorts Directory</h2>
        <p>This page will display the escorts directory.</p>
      </div>
    </Layout>
  );
};

export default EscortsPage;
