
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, AlertCircle, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RecommendationItem {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  explanation: string;
  impact: number; // 0-100
  priority: 'high' | 'medium' | 'low';
}

interface HermesSeoRecommendationsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  content?: string;
  contentType?: 'profile' | 'content' | 'livecam' | 'event';
  onApplyRecommendation?: (recommendationId: string) => void;
}

const HermesSeoRecommendations: React.FC<HermesSeoRecommendationsProps> = ({
  title,
  description,
  keywords,
  content,
  contentType = 'content',
  onApplyRecommendation
}) => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [overallScore, setOverallScore] = useState<number>(0);

  // Analyze content whenever props change
  useEffect(() => {
    if (title || description || keywords || content) {
      analyzeContent();
    }
  }, [title, description, keywords, content, contentType]);

  // Simulated analysis function
  const analyzeContent = () => {
    setIsAnalyzing(true);
    
    // In a real implementation, this would call the HERMES API
    setTimeout(() => {
      const newRecommendations: RecommendationItem[] = [];
      
      // Title analysis
      if (title) {
        if (title.length < 10) {
          newRecommendations.push({
            id: 'title-length',
            type: 'error',
            message: 'Title is too short',
            explanation: 'Search engines prefer titles between 50-60 characters for optimal visibility.',
            impact: 80,
            priority: 'high'
          });
        } else if (title.length > 60) {
          newRecommendations.push({
            id: 'title-length',
            type: 'warning',
            message: 'Title may be too long',
            explanation: 'Long titles might get truncated in search results. Keep it under 60 characters.',
            impact: 40,
            priority: 'medium'
          });
        } else {
          newRecommendations.push({
            id: 'title-length',
            type: 'success',
            message: 'Title length is optimal',
            explanation: 'Your title is within the recommended length range.',
            impact: 0,
            priority: 'low'
          });
        }
        
        // Check if title contains keywords
        if (keywords && keywords.length > 0) {
          const keywordsInTitle = keywords.filter(keyword => 
            title.toLowerCase().includes(keyword.toLowerCase())
          );
          
          if (keywordsInTitle.length === 0) {
            newRecommendations.push({
              id: 'title-keywords',
              type: 'warning',
              message: 'Title is missing keywords',
              explanation: 'Including keywords in your title improves search relevance.',
              impact: 60,
              priority: 'high'
            });
          } else {
            newRecommendations.push({
              id: 'title-keywords',
              type: 'success',
              message: `Title contains ${keywordsInTitle.length} keywords`,
              explanation: 'Good job including keywords in your title!',
              impact: 0,
              priority: 'low'
            });
          }
        }
      }
      
      // Description analysis
      if (description) {
        if (description.length < 50) {
          newRecommendations.push({
            id: 'desc-length',
            type: 'error',
            message: 'Description is too short',
            explanation: 'Descriptions should be between 150-160 characters for best SEO results.',
            impact: 70,
            priority: 'high'
          });
        } else if (description.length > 160) {
          newRecommendations.push({
            id: 'desc-length',
            type: 'warning',
            message: 'Description may be too long',
            explanation: 'Search engines typically show only the first 160 characters.',
            impact: 30,
            priority: 'medium'
          });
        } else {
          newRecommendations.push({
            id: 'desc-length',
            type: 'success',
            message: 'Description length is optimal',
            explanation: 'Your description is within the recommended length range.',
            impact: 0,
            priority: 'low'
          });
        }
      }
      
      // Keywords analysis
      if (keywords) {
        if (keywords.length === 0) {
          newRecommendations.push({
            id: 'keywords-count',
            type: 'error',
            message: 'No keywords specified',
            explanation: 'Keywords help search engines understand your content\'s focus.',
            impact: 90,
            priority: 'high'
          });
        } else if (keywords.length < 3) {
          newRecommendations.push({
            id: 'keywords-count',
            type: 'warning',
            message: 'Few keywords specified',
            explanation: 'Having 5-7 keywords helps improve content visibility.',
            impact: 50,
            priority: 'medium'
          });
        } else {
          newRecommendations.push({
            id: 'keywords-count',
            type: 'success',
            message: 'Good number of keywords',
            explanation: `You have ${keywords.length} keywords, which is good for SEO.`,
            impact: 0,
            priority: 'low'
          });
        }
      }
      
      // Content type specific recommendations
      if (contentType === 'profile') {
        newRecommendations.push({
          id: 'profile-specific',
          type: 'info',
          message: 'Profile optimization tip',
          explanation: 'Profiles perform better with personal details, services, and location information.',
          impact: 40,
          priority: 'medium'
        });
      } else if (contentType === 'livecam') {
        newRecommendations.push({
          id: 'livecam-specific',
          type: 'info',
          message: 'Live content optimization tip',
          explanation: 'Use time-related keywords like "live", "now", or "streaming" to improve visibility.',
          impact: 40,
          priority: 'medium'
        });
      }
      
      // Calculate overall score based on recommendations
      const errorCount = newRecommendations.filter(rec => rec.type === 'error').length;
      const warningCount = newRecommendations.filter(rec => rec.type === 'warning').length;
      const successCount = newRecommendations.filter(rec => rec.type === 'success').length;
      
      const totalIssues = errorCount + warningCount;
      const totalItems = totalIssues + successCount;
      
      let calculatedScore = 100;
      if (totalItems > 0) {
        calculatedScore = Math.max(0, 100 - ((errorCount * 20) + (warningCount * 10)));
      }
      
      setOverallScore(calculatedScore);
      setRecommendations(newRecommendations);
      setIsAnalyzing(false);
    }, 500); // Simulate API delay
  };
  
  // Get a badge variant based on recommendation type
  const getTypeVariant = (type: RecommendationItem['type']) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'warning';
      case 'success': return 'default';
      case 'info': return 'secondary';
      default: return 'outline';
    }
  };
  
  // Get icon based on recommendation type
  const getTypeIcon = (type: RecommendationItem['type']) => {
    switch (type) {
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          Real-time SEO Insights
        </CardTitle>
        <CardDescription>
          {isAnalyzing 
            ? 'HERMES is analyzing your content...' 
            : 'Instant feedback from HERMES neural intelligence'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score display */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">SEO Score</span>
          <Badge variant={
            overallScore >= 80 ? "default" : 
            overallScore >= 60 ? "secondary" : "destructive"
          }>
            {overallScore}%
          </Badge>
        </div>
        <Progress 
          value={overallScore} 
          className="h-2" 
        />
        
        <Separator className="my-4" />
        
        {/* Recommendations list */}
        {recommendations.length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No content to analyze</AlertTitle>
            <AlertDescription>
              Add a title, description, or keywords to receive real-time SEO recommendations.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center">
              <Lightbulb className="h-4 w-4 mr-1 text-primary" />
              Recommendations ({recommendations.length})
            </h4>
            
            {recommendations
              .sort((a, b) => {
                // Sort by priority first
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map(rec => (
                <div 
                  key={rec.id} 
                  className={`p-3 rounded-md border ${
                    rec.type === 'error' ? 'border-destructive/30 bg-destructive/10' : 
                    rec.type === 'warning' ? 'border-orange-200 bg-orange-100/30' :
                    rec.type === 'success' ? 'border-green-200 bg-green-100/30' : 
                    'border-secondary bg-secondary/10'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {getTypeIcon(rec.type)}
                      <span className="ml-2 font-medium">{rec.message}</span>
                    </div>
                    {rec.impact > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline">Impact: {rec.impact}%</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Estimated impact on SEO performance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">
                    {rec.explanation}
                  </p>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HermesSeoRecommendations;
