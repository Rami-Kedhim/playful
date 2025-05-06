
import React from 'react';
import HermesSeoNavigation from '@/components/seo/HermesSeoNavigation';
import ContentOptimizer from '@/components/seo/ContentOptimizer';

const ContentOptimizationPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-64 h-full">
        <HermesSeoNavigation />
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Content Optimization</h1>
        <ContentOptimizer />
      </div>
    </div>
  );
};

export default ContentOptimizationPage;
