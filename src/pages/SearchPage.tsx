
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const SearchPage = () => {
  return (
    <MainLayout title="Search" description="Find what you're looking for">
      <div className="bg-card rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Search Page</h1>
        <p>Search functionality will be implemented here.</p>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
