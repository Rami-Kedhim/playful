
import React from 'react';
import HermesSeoNavigation from '@/components/seo/HermesSeoNavigation';
import SeoHistory from '@/components/seo/SeoHistory';

const SeoHistoryPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-64 h-full">
        <HermesSeoNavigation />
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">SEO History</h1>
        <SeoHistory />
      </div>
    </div>
  );
};

export default SeoHistoryPage;
