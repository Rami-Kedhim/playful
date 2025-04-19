
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

type KeywordDensityType = Record<string, number>;

interface SEOScoreProps {
  label: string;
  score: number;
}

const SEOScore: React.FC<SEOScoreProps> = ({ label, score }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm">{score}/100</span>
    </div>
    <Progress value={score} />
  </div>
);

interface RecommendationsProps {
  recommendations: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => (
  <AccordionItem value="recommendations">
    <AccordionTrigger>Recommendations</AccordionTrigger>
    <AccordionContent>
      <ul className="list-disc pl-4 space-y-2">
        {recommendations.map((rec, i) => (
          <li key={i} className="text-sm">{rec}</li>
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);

interface KeywordsAnalysisProps {
  keywordDensity: KeywordDensityType;
  priorityKeywords?: string[];
}

const KeywordsAnalysis: React.FC<KeywordsAnalysisProps> = ({ keywordDensity, priorityKeywords }) => (
  <AccordionItem value="keywords">
    <AccordionTrigger>Keywords Analysis</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Keyword Density</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(keywordDensity).map(([keyword, density]) => (
            <div key={keyword} className="flex justify-between">
              <span className="text-sm">{keyword}</span>
              <span className="text-sm font-medium">{density.toFixed(2)}%</span>
            </div>
          ))}
        </div>

        {priorityKeywords && priorityKeywords.length > 0 && (
          <>
            <h4 className="text-sm font-medium mt-4">Priority Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {priorityKeywords.map(keyword => (
                <Badge key={keyword} variant="outline">{keyword}</Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </AccordionContent>
  </AccordionItem>
);

interface MetaInfoProps {
  metaDescription?: string;
  metaTags?: string[];
}

const MetaInfo: React.FC<MetaInfoProps> = ({ metaDescription, metaTags }) => (
  <AccordionItem value="meta">
    <AccordionTrigger>Meta Information</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Meta Description</h4>
        <p className="text-sm">{metaDescription}</p>

        {metaTags && metaTags.length > 0 && (
          <>
            <h4 className="text-sm font-medium mt-4">Meta Tags</h4>
            <div className="flex flex-wrap gap-1">
              {metaTags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </AccordionContent>
  </AccordionItem>
);

interface SEOModuleProps {}

const SEOModule: React.FC<SEOModuleProps> = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
        metaTags: ['escort', 'premium', 'services'],
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
            <svg className="h-5 w-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v4"/>
            <path d="M8 13v6"/>
            <path d="M16 3v6"/>
            <path d="M16 11v8"/></svg>
            SEO Optimization
          </CardTitle>
          <CardDescription>
            Analyze and optimize your content for better search engine visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content to Optimize</Label>
            <Textarea
              id="content"
              placeholder="Enter your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
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

export default SEOModule;

