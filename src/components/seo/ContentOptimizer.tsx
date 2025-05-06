
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Brain, Search } from 'lucide-react';
import { useHermesSeo } from '@/hooks/useHermesSeo';
import SeoResultsDisplay from './SeoResultsDisplay';

const ContentOptimizer: React.FC = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [contentType, setContentType] = useState('article');
  const [analyzing, setAnalyzing] = useState(false);
  const { enhanceContentSeo, optimizationResult, isLoading } = useHermesSeo();

  const handleOptimize = async () => {
    if (!content || !title) return;

    setAnalyzing(true);
    try {
      await enhanceContentSeo(
        'temp-id', // In a real app, this would be a real content ID
        contentType as 'profile' | 'content' | 'livecam' | 'event',
        title,
        content,
        keywords.split(',').map(k => k.trim()).filter(k => k)
      );
    } catch (error) {
      console.error('Error optimizing content:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            Content Enhancer
          </CardTitle>
          <CardDescription>
            Optimize your content with HERMES neural SEO technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="article" onValueChange={(value) => setContentType(value)}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="article">Article</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="livecam">Live Stream</TabsTrigger>
              <TabsTrigger value="event">Event</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter content title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Target Keywords (comma separated)</Label>
            <Input
              id="keywords"
              placeholder="premium, escorts, booking"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Enter your content here to optimize..."
              className="min-h-[200px] resize-none"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleOptimize} 
            disabled={isLoading || !content || !title}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Optimize Content
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Results panel */}
      <div className="lg:col-span-1">
        <SeoResultsDisplay result={optimizationResult} analyzing={analyzing} />
      </div>
    </div>
  );
};

export default ContentOptimizer;
