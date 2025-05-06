
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HermesSeoNavigation from '@/components/seo/HermesSeoNavigation';
import SeoInsightsDashboard from '@/components/seo/SeoInsightsDashboard';

const SeoLandingPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-64 h-full">
        <HermesSeoNavigation />
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">HERMES SEO Dashboard</h1>
        <SeoInsightsDashboard />
      </div>
    </div>
  );
};

export default SeoLandingPage;
