import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Activity, Search, Copy, CheckCircle } from 'lucide-react';
import { useHermesSeo } from '@/hooks/useHermesSeo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';

const SEOModule = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [optimizationResult, setOptimizationResult] = useState<SeoOptimizationResult | null>(null);

  const handleOptimizeContent = async () => {
    setLoading(true);
    try {
      // Mock API call
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
            <Search className="h-5 w-5 mr-2 text-primary" />
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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">SEO Score</span>
                  <span className="text-sm">{optimizationResult.seoScore}/100</span>
                </div>
                <Progress value={optimizationResult.seoScore} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Readability</span>
                  <span className="text-sm">{optimizationResult.readabilityScore}/100</span>
                </div>
                <Progress value={optimizationResult.readabilityScore} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Visibility</span>
                  <span className="text-sm">{optimizationResult.visibilityScore ?? 0}/100</span>
                </div>
                <Progress value={optimizationResult.visibilityScore ?? 0} />
              </div>
            </div>
            
            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="recommendations">
                <AccordionTrigger>Recommendations</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    {optimizationResult.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm">
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="keywords">
                <AccordionTrigger>Keywords Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Keyword Density</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(optimizationResult.keywordDensity).map(([keyword, density]) => (
                        <div key={keyword} className="flex justify-between">
                          <span className="text-sm">{keyword}</span>
                          <span className="text-sm font-medium">{density.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-medium mt-4">Priority Keywords</h4>
                    <div className="flex flex-wrap gap-1">
                      {(optimizationResult.priorityKeywords || []).map((keyword) => (
                        <Badge key={keyword} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="meta">
                <AccordionTrigger>Meta Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Meta Description</h4>
                    <p className="text-sm">{optimizationResult.metaDescription}</p>
                    
                    <h4 className="text-sm font-medium mt-4">Meta Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {optimizationResult.metaTags?.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button variant="secondary">
                <Copy className="h-4 w-4 mr-2" />
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
