import React, { useState, useEffect } from 'react';
import { useHermesSeo } from '@/hooks/useHermesSeo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Copy, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const HermesSeoOptimizer = () => {
  const {
    optimizeContent,
    optimizationResult,
    optimizationHistory,
    loadOptimizationHistory,
    getContentScore,
    isOptimizing,
    error
  } = useHermesSeo();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadOptimizationHistory().catch(console.error);
  }, [loadOptimizationHistory]);

  const handleOptimizeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter some content to optimize.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await optimizeContent(content);
      toast({
        title: "Content optimized",
        description: "Your content has been analyzed and optimized for SEO.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Optimization failed",
        description: error || "Failed to optimize content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetScore = async () => {
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      const contentScore = await getContentScore(content);
      setScore(contentScore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The optimized content has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Content Optimizer</CardTitle>
          <CardDescription>
            Optimize your content for better search engine visibility using HERMES AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Content Title</Label>
            <Input
              id="title"
              placeholder="Enter content title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keywords">Target Keywords (comma separated)</Label>
            <Input
              id="keywords"
              placeholder="escort, premium, services..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Enter your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleOptimizeContent} 
              disabled={loading || isOptimizing || !content.trim()}
              className="flex-1"
            >
              {(loading || isOptimizing) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                "Optimize Content"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleGetScore}
              disabled={loading || !content.trim()}
            >
              Get Score
            </Button>
          </div>
          
          {score !== null && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Content Score</span>
                <span>{score}/100</span>
              </div>
              <Progress value={score} />
            </div>
          )}
        </CardContent>
      </Card>
      
      {optimizationResult && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>
              Review and apply the suggested optimizations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="original">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="original">Original Content</TabsTrigger>
                <TabsTrigger value="optimized">Optimized Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="original" className="space-y-4">
                <div className="p-4 border rounded-md bg-muted/30">
                  <pre className="whitespace-pre-wrap">{optimizationResult.originalContent}</pre>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Score:</span>
                    <Badge variant="outline">{optimizationResult.readabilityScore}/100</Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="optimized" className="space-y-4">
                <div className="p-4 border rounded-md bg-muted/30 relative">
                  <pre className="whitespace-pre-wrap">{optimizationResult.optimizedContent}</pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(optimizationResult.optimizedContent)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Score:</span>
                    <Badge variant="outline">{optimizationResult.seoScore}/100</Badge>
                  </div>
                  <Button size="sm" onClick={() => copyToClipboard(optimizationResult.optimizedContent)}>
                    {copied ? "Copied!" : "Copy Optimized Content"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommendations</h3>
              <ul className="space-y-2">
                {optimizationResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Keyword Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(optimizationResult.keywordDensity || {}).map(([keyword, density]) => (
                  <div key={keyword} className="flex justify-between items-center">
                    <span>{keyword}</span>
                    <Badge variant="secondary">{typeof density === 'number' ? `${density.toFixed(2)}%` : density}</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Meta Information</h3>
              <div className="space-y-2">
                <div>
                  <Label>Meta Description</Label>
                  <div className="p-3 border rounded-md mt-1 text-sm">
                    {optimizationResult.metaDescription || "No meta description generated"}
                  </div>
                </div>
                
                <div>
                  <Label>Meta Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(optimizationResult.metaTags || []).map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {optimizationHistory && optimizationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationHistory.slice(0, 5).map((item, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Content #{index + 1}</h4>
                    <Badge>{item.seoScore}/100</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.originalContent.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HermesSeoOptimizer;
