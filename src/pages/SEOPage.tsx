
import React from 'react';
import { UnifiedLayout } from '@/components/layout';
import HermesSeoHome from '@/components/seo/HermesSeoHome';

const SEOPage = () => {
  return (
    <UnifiedLayout 
      title="HERMES SEO Dashboard" 
      description="AI-powered optimization tools to enhance your content visibility"
      showBreadcrumbs={true}
    >
      <HermesSeoHome />
    </UnifiedLayout>
  );
};

export default SEOPage;
