
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Copy, AlertCircle } from 'lucide-react';
import { SeoOptimizationResult } from '@/types/seo';
import { Skeleton } from '@/components/ui/skeleton';

interface SeoResultsDisplayProps {
  result: SeoOptimizationResult | null;
  analyzing: boolean;
}

const SeoResultsDisplay: React.FC<SeoResultsDisplayProps> = ({ result, analyzing }) => {
  // Function to handle copying optimized content
  const handleCopyContent = () => {
    if (result?.optimizedContent) {
      navigator.clipboard.writeText(result.optimizedContent);
      // Ideally show a toast notification here
    }
  };

  // Loading state
  if (analyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // No results yet state
  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">No Analysis Yet</p>
          <p className="text-sm text-muted-foreground">
            Enter your content and click "Optimize Content" to get SEO recommendations
          </p>
        </CardContent>
      </Card>
    );
  }

  // Results display
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>SEO Analysis Results</span>
          <Badge variant={getSeoScoreBadgeVariant(result.seoScore)}>
            Score: {result.seoScore}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>SEO Score</span>
              <span className="font-medium">{result.seoScore}/100</span>
            </div>
            <Progress value={result.seoScore} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Readability</span>
              <span className="font-medium">{result.readabilityScore}/100</span>
            </div>
            <Progress value={result.readabilityScore} className="h-2" />
          </div>
        </div>

        <Separator />

        {/* Recommendations */}
        <div>
          <h3 className="font-medium mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Keywords */}
        <div>
          <h3 className="font-medium mb-2">Priority Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {result.priorityKeywords?.map((keyword, i) => (
              <Badge key={i} variant="outline">{keyword}</Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Optimized content */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Optimized Content</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyContent}
            >
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
          </div>
          <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto">
            {result.optimizedContent || result.originalContent}
          </div>
        </div>

        {/* Meta description if available */}
        {result.metaDescription && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">Generated Meta Description</h3>
              <p className="text-sm bg-muted p-3 rounded-md">{result.metaDescription}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to determine badge color based on score
function getSeoScoreBadgeVariant(score: number): "default" | "outline" | "secondary" | "destructive" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  return "destructive";
}

export default SeoResultsDisplay;
