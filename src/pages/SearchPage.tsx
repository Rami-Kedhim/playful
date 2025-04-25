
import React from 'react';
import Layout from '@/components/layout/Layout';

const SearchPage = () => {
  return (
    <Layout
      title="Search"
      description="Find what you're looking for"
    >
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Search</h2>
        <p className="text-muted-foreground">
          Search functionality coming soon.
        </p>
      </div>
    </Layout>
  );
};

export default SearchPage;
