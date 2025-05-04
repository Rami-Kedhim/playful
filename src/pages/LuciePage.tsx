
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AICompanionChat from '@/components/ai/AICompanionChat';
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { UserJourneyInsights } from '@/types/core-systems';

const LuciePage: React.FC = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [insights, setInsights] = useState<UserJourneyInsights | null>(null);

  const analyzeContent = async () => {
    if (!content.trim()) return;
    setLoading(true);

    try {
      // First moderate the content
      const moderationResult = await lucie.moderateContent({
        content,
        contentType: 'text'
      });

      if (!moderationResult.safe) {
        setResult({
          moderation: "Content flagged as inappropriate",
          sentiment: null
        });
        return;
      }

      // Get sentiment analysis
      const sentimentResult = await lucie.analyzeSentiment(content);
      
      // Get user journey insights
      const userInsights = hermes.getUserJourneyInsights('demo-user');
      setInsights(userInsights);
      
      setResult({
        moderation: "Content passed moderation",
        sentiment: sentimentResult
      });
    } catch (error) {
      console.error("Error analyzing content:", error);
      setResult({
        error: "Failed to analyze content"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      title="Lucie AI System"
      description="AI-powered content generation and moderation"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="analyze">Content Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>AI Companion</CardTitle>
                </CardHeader>
                <CardContent className="h-[600px]">
                  <AICompanionChat 
                    companionName="Lucie AI Assistant" 
                    primaryColor="#8A2BE2" 
                  />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>About Lucie AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Lucie is UberEscorts' advanced AI system that powers content generation,
                    moderation, and sentiment analysis throughout the platform. It helps ensure
                    safe interactions and personalized experiences.
                  </p>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Natural conversation and content generation</li>
                      <li>Real-time content moderation</li>
                      <li>Sentiment analysis for better matches</li>
                      <li>Personalized recommendations</li>
                      <li>Content enhancement tools</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analyze" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter text to analyze..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <Button 
                    onClick={analyzeContent} 
                    disabled={loading || !content.trim()}
                    className="w-full"
                  >
                    {loading ? "Analyzing..." : "Analyze Content"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-52">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Moderation</h4>
                      <p className={result.moderation === "Content passed moderation" ? "text-green-500" : "text-red-500"}>
                        {result.moderation}
                      </p>
                    </div>
                    
                    {result.sentiment && (
                      <div>
                        <h4 className="font-medium mb-2">Sentiment Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Sentiment:</span>
                            <span className="font-medium capitalize">{result.sentiment.sentiment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Score:</span>
                            <span className="font-medium">{result.sentiment.score.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Confidence:</span>
                            <span className="font-medium">{(result.sentiment.confidence * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {result.error && (
                      <div className="text-red-500">
                        {result.error}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-52 text-muted-foreground">
                    <p>Enter text and click "Analyze Content" to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {insights ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Session Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium">Total Sessions:</dt>
                        <dd>{insights.sessions}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Average Duration:</dt>
                        <dd>{Math.floor(insights.averageDuration / 60)}m {insights.averageDuration % 60}s</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {insights.topPages.map((page, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{page.page}</span>
                          <span className="font-medium">{page.views} views</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {insights.conversionPoints.map((point, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{point.action.replace('_', ' ')}</span>
                          <span className="font-medium">{point.count}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="col-span-3 text-center py-12">
                <p>Analyze content first to see user insights</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default LuciePage;
