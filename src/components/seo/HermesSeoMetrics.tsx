import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, AlertCircle, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SeoOptimizationResult {
  enhancedTitle?: string;
  enhancedDescription?: string;
  priorityKeywords?: string[];
  recommendedTags?: string[];
  visibilityScore: number;
  seoImprovements?: {
    title: boolean;
    description: boolean;
    keywords: boolean;
  };
}

interface HermesSeoMetricsProps {
  optimizationResult: SeoOptimizationResult | null;
}

const HermesSeoMetrics: React.FC<HermesSeoMetricsProps> = ({ optimizationResult }) => {
  // If no data is available, show placeholder
  if (!optimizationResult) {
    return (
      <div className="text-center py-6">
        <Brain className="h-12 w-12 mx-auto text-muted-foreground/30" />
        <h3 className="mt-4 text-lg font-medium">No SEO data available</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Optimize your content with HERMES to see detailed metrics here.
        </p>
      </div>
    );
  }
  
  // Helper function to get appropriate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  // Helper function to get appropriate text color based on score
  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Calculate visibility level based on score
  const getVisibilityLevel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    if (score >= 50) return 'Below Average';
    return 'Poor';
  };
  
  return (
    <div className="space-y-6">
      {/* Main visibility score */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="flex items-center justify-center w-40 h-40 rounded-full border-8 border-muted">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreTextColor(optimizationResult.visibilityScore)}`}>
                {optimizationResult.visibilityScore}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {getVisibilityLevel(optimizationResult.visibilityScore)}
              </div>
            </div>
          </div>
          <svg className="absolute top-0 left-0" width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke="transparent"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke={getScoreColor(optimizationResult.visibilityScore)}
              strokeWidth="8"
              strokeDasharray={`${optimizationResult.visibilityScore * 4.76} 500`}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>
        </div>
      </div>
      
      {/* Improvement metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Title</span>
            <span className="font-medium">
              {optimizationResult.seoImprovements?.title ? 'Improved' : 'No change'}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div 
              className={`h-2 rounded-full ${optimizationResult.seoImprovements?.title ? 'bg-green-500' : 'bg-muted-foreground/30'}`} 
              style={{ width: optimizationResult.seoImprovements?.title ? '100%' : '30%' }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Description</span>
            <span className="font-medium">
              {optimizationResult.seoImprovements?.description ? 'Improved' : 'No change'}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div 
              className={`h-2 rounded-full ${optimizationResult.seoImprovements?.description ? 'bg-green-500' : 'bg-muted-foreground/30'}`}
              style={{ width: optimizationResult.seoImprovements?.description ? '100%' : '30%' }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Keywords</span>
            <span className="font-medium">
              {optimizationResult.seoImprovements?.keywords ? 'Improved' : 'No change'}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div 
              className={`h-2 rounded-full ${optimizationResult.seoImprovements?.keywords ? 'bg-green-500' : 'bg-muted-foreground/30'}`}
              style={{ width: optimizationResult.seoImprovements?.keywords ? '100%' : '30%' }}
            />
          </div>
        </div>
      </div>
      
      {/* Recommended tags */}
      {optimizationResult.recommendedTags && optimizationResult.recommendedTags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Recommended Tags</h3>
          <div className="flex flex-wrap gap-2">
            {optimizationResult.recommendedTags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HermesSeoMetrics;
