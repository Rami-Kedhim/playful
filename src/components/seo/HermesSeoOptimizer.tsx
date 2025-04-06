
import React, { useState } from 'react';
import { useHermesSeo } from '@/hooks/useHermesSeo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle, Brain, AlertTriangle } from 'lucide-react';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';

interface HermesSeoOptimizerProps {
  contentId: string;
  initialTitle: string;
  initialDescription: string;
  initialKeywords: string[];
  contentType: 'profile' | 'content' | 'livecam' | 'event';
  onOptimizationsApplied?: (result: SeoOptimizationResult) => void;
}

const HermesSeoOptimizer: React.FC<HermesSeoOptimizerProps> = ({
  contentId,
  initialTitle,
  initialDescription,
  initialKeywords,
  contentType,
  onOptimizationsApplied
}) => {
  // State for form inputs
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [keywords, setKeywords] = useState(initialKeywords.join(', '));
  const [selectedContentType, setSelectedContentType] = useState<'profile' | 'content' | 'livecam' | 'event'>(contentType);
  
  // Get SEO optimization hook
  const { enhanceContentSeo, applyOptimizations, optimizationResult, isLoading, error } = useHermesSeo();
  
  const handleOptimize = async () => {
    const keywordsArray = keywords
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);
      
    const result = await enhanceContentSeo(
      contentId, 
      selectedContentType, 
      title,
      description,
      keywordsArray
    );
    
    // If we have optimizations, update the form with suggestions
    if (result.enhancedTitle) {
      setTitle(result.enhancedTitle);
    }
    
    if (result.enhancedDescription) {
      setDescription(result.enhancedDescription);
    }
    
    if (result.priorityKeywords) {
      setKeywords(result.priorityKeywords.join(', '));
    }
  };
  
  const handleApply = async () => {
    if (optimizationResult) {
      const success = await applyOptimizations(contentId, optimizationResult);
      
      if (success && onOptimizationsApplied) {
        onOptimizationsApplied(optimizationResult);
      }
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              HERMES SEO Optimizer
            </CardTitle>
            <CardDescription>
              AI-powered SEO optimization for your content
            </CardDescription>
          </div>
          {optimizationResult && (
            <Badge variant={optimizationResult.visibilityScore > 80 ? "default" : "secondary"}>
              Score: {optimizationResult.visibilityScore}%
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="content-type">Content Type</Label>
          <Select 
            value={selectedContentType}
            onValueChange={(value) => setSelectedContentType(value as any)}
          >
            <SelectTrigger id="content-type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile">Profile</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="livecam">Live Cam</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">
            Title
            {optimizationResult?.seoImprovements?.title && (
              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-500" />
            )}
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter content title"
            className={optimizationResult?.seoImprovements?.title ? "border-green-500" : ""}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">
            Description
            {optimizationResult?.seoImprovements?.description && (
              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-500" />
            )}
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter content description"
            className={optimizationResult?.seoImprovements?.description ? "border-green-500" : ""}
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keywords">
            Keywords (comma separated)
            {optimizationResult?.seoImprovements?.keywords && (
              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-500" />
            )}
          </Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
            className={optimizationResult?.seoImprovements?.keywords ? "border-green-500" : ""}
          />
        </div>
        
        {optimizationResult && optimizationResult.recommendedTags && (
          <div className="space-y-2">
            <Label>Recommended Tags</Label>
            <div className="flex flex-wrap gap-2">
              {optimizationResult.recommendedTags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleOptimize}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Optimize with HERMES
        </Button>
        
        <Button 
          onClick={handleApply}
          disabled={isLoading || !optimizationResult}
        >
          Apply Optimizations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HermesSeoOptimizer;
