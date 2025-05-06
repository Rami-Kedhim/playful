
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AutomaticSeoManager from './AutomaticSeoManager';
import SeoMetricsOverview from './SeoMetricsOverview';
import SeoRecommendationsList from './SeoRecommendationsList';

const SeoInsightsDashboard: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SeoMetricsOverview />
      <AutomaticSeoManager />
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>HERMES SEO Recommendations</CardTitle>
          <CardDescription>
            AI-powered recommendations to improve your content visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SeoRecommendationsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoInsightsDashboard;
