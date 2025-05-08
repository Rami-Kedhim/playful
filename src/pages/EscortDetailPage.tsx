
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';

const EscortDetailPage = () => {
  const { id } = useParams();
  
  return (
    <Layout
      title="Escort Profile"
      showBreadcrumbs
    >
      <div className="text-center py-20 text-muted-foreground">
        <h2 className="text-2xl mb-2">Escort Profile</h2>
        <p>Profile details for escort ID: {id}</p>
      </div>
    </Layout>
  );
};

export default EscortDetailPage;
