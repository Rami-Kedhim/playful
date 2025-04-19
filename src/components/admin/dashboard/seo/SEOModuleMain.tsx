
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';

import SEOScore from './SEOScore';
import Recommendations from './Recommendations';
import KeywordsAnalysis from './KeywordsAnalysis';
import MetaInfo from './MetaInfo';

const SEOModuleMain: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<null | {
    originalContent: string;
    optimizedContent: string;
    seoScore: number;
    recommendations: string[];
    keywordDensity: Record<string, number>;
    readabilityScore: number;
    visibilityScore?: number;
    priorityKeywords?: string[];
    metaDescription?: string;
    metaTags?: string[];
  }>(null);

  const handleOptimizeContent = async () => {
    setLoading(true);
    try {
      // Mock API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOptimizationResult({
        originalContent: content,
        optimizedContent: content,
        seoScore: 78,
        recommendations: ['Improve keyword density', 'Enhance readability'],
        keywordDensity: {
          'escort': 3.2,
          'premium': 2.5,
          'services': 1.8
        },
        readabilityScore: 85,
        visibilityScore: 92,
        priorityKeywords: ['escort services', 'premium escorts'],
        metaDescription: 'Find the best premium escort services in your area.',
        metaTags: ['escort', 'premium', 'services']
      });
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v4"/><path d="M8 13v6"/><path d="M16 3v6"/><path d="M16 11v8"/></svg>
            SEO Optimization
          </CardTitle>
          <CardDescription>
            Analyze and optimize your content for better search engine visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content to Optimize</Label>
            <textarea
              id="content"
              placeholder="Enter your content here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="min-h-[120px] w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <Button onClick={handleOptimizeContent} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              "Optimize Content"
            )}
          </Button>
        </CardContent>
      </Card>

      {optimizationResult && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <SEOScore label="SEO Score" score={optimizationResult.seoScore} />
              <SEOScore label="Readability" score={optimizationResult.readabilityScore} />
              <SEOScore label="Visibility" score={optimizationResult.visibilityScore ?? 0} />
            </div>

            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <Recommendations recommendations={optimizationResult.recommendations} />
              <KeywordsAnalysis 
                keywordDensity={optimizationResult.keywordDensity}
                priorityKeywords={optimizationResult.priorityKeywords}
              />
              <MetaInfo 
                metaDescription={optimizationResult.metaDescription}
                metaTags={optimizationResult.metaTags}
              />
            </Accordion>

            <Separator />

            <div className="flex justify-end">
              <Button variant="secondary">
                Copy Optimized Content
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SEOModuleMain;
