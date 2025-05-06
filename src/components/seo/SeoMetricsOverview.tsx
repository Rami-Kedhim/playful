
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, LineChart, Zap, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SeoMetricsOverview: React.FC = () => {
  // These would normally come from an API or context
  const seoHealth = 78;
  const visibilityScore = 65;
  const optimizableContent = 12;
  const optimizedContent = 8;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LineChart className="h-5 w-5 mr-2 text-primary" />
          SEO Performance
        </CardTitle>
        <CardDescription>Overall content visibility metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>SEO Health</span>
              <span className="font-medium">{seoHealth}%</span>
            </div>
            <Progress value={seoHealth} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Visibility</span>
              <span className="font-medium">{visibilityScore}%</span>
            </div>
            <Progress value={visibilityScore} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Optimizable</p>
                <p className="text-2xl font-bold">{optimizableContent}</p>
              </div>
              <Search className="text-muted-foreground h-8 w-8" />
            </div>
          </div>
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Optimized</p>
                <p className="text-2xl font-bold">{optimizedContent}</p>
              </div>
              <Zap className="text-primary h-8 w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoMetricsOverview;
