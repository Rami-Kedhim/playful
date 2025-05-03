
import React from 'react';
import HermesSeoHome from '@/components/seo/HermesSeoHome';
import { UnifiedLayout } from '@/components/layout';

const SEOPage = () => {
  return (
    <UnifiedLayout 
      title="HERMES SEO Dashboard" 
      description="AI-powered optimization tools to enhance your content visibility"
    >
      <HermesSeoHome />
    </UnifiedLayout>
  );
};

export default SEOPage;
