
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';
import { BarChart, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HermesSeoMetricsProps {
  optimizationResult: SeoOptimizationResult | null;
}

const HermesSeoMetrics: React.FC<HermesSeoMetricsProps> = ({ optimizationResult }) => {
  if (!optimizationResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-muted-foreground" />
            SEO Metrics
          </CardTitle>
          <CardDescription>
            No optimization data available. Run an SEO optimization to see metrics.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Calculate improvements percentage
  const improvementCount = Object.values(optimizationResult.seoImprovements || {}).filter(Boolean).length;
  const totalPossibleImprovements = Object.keys(optimizationResult.seoImprovements || {}).length || 1;
  const improvementPercentage = (improvementCount / totalPossibleImprovements) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-primary" />
          HERMES SEO Metrics
        </CardTitle>
        <CardDescription>
          AI-powered analysis of your content's search visibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Visibility Score</span>
            <Badge variant={optimizationResult.visibilityScore > 80 ? "default" : "secondary"}>
              {optimizationResult.visibilityScore}%
            </Badge>
          </div>
          <Progress 
            value={optimizationResult.visibilityScore} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-sm font-medium">Title</span>
              {optimizationResult.seoImprovements?.title ? (
                <CheckCircle2 className="h-4 w-4 ml-1 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 ml-1 text-amber-500" />
              )}
            </div>
            <Progress 
              value={optimizationResult.seoImprovements?.title ? 100 : 60} 
              className="h-1"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-sm font-medium">Description</span>
              {optimizationResult.seoImprovements?.description ? (
                <CheckCircle2 className="h-4 w-4 ml-1 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 ml-1 text-amber-500" />
              )}
            </div>
            <Progress 
              value={optimizationResult.seoImprovements?.description ? 100 : 60} 
              className="h-1"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-sm font-medium">Keywords</span>
              {optimizationResult.seoImprovements?.keywords ? (
                <CheckCircle2 className="h-4 w-4 ml-1 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 ml-1 text-amber-500" />
              )}
            </div>
            <Progress 
              value={optimizationResult.seoImprovements?.keywords ? 100 : 60} 
              className="h-1"
            />
          </div>
        </div>

        {optimizationResult.priorityKeywords && (
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-1">Priority Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {optimizationResult.priorityKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HermesSeoMetrics;
