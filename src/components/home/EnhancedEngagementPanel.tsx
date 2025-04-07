
import { useState, useEffect } from 'react';
import { useEnhancedBehavioral } from '@/hooks/useEnhancedBehavioral';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  BarChart, 
  Brain, 
  Clock, 
  CreditCard, 
  Heart, 
  Lightbulb, 
  MessageCircle, 
  Rocket 
} from 'lucide-react';
import { useAuth } from '@/hooks/auth';

const EnhancedEngagementPanel = () => {
  const { user } = useAuth();
  const { 
    enhancedProfile, 
    isAnalyzing, 
    analyzeUser, 
    generateEngagementStrategy,
    lastAnalyzedAt 
  } = useEnhancedBehavioral();
  
  const [engagementStrategy, setEngagementStrategy] = useState(() => generateEngagementStrategy());
  
  // Update strategy when profile changes
  useEffect(() => {
    setEngagementStrategy(generateEngagementStrategy());
  }, [enhancedProfile, generateEngagementStrategy]);

  // If no user, show login prompt
  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Enhanced Engagement
          </CardTitle>
          <CardDescription>
            Sign in to unlock personalized experiences
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Button variant="outline">Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Enhanced Engagement
        </CardTitle>
        <CardDescription>
          Personalized engagement based on behavioral analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="text-center py-4">
            <Activity className="h-8 w-8 mx-auto animate-pulse mb-2" />
            <p className="text-sm text-muted-foreground">Analyzing behavior patterns...</p>
          </div>
        ) : enhancedProfile ? (
          <Tabs defaultValue="insights">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="psychographics">Psychographics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Trust Level</span>
                    <span className="text-sm">{Number(enhancedProfile.psychographicProfile.trustLevel)}%</span>
                  </div>
                  <Progress value={Number(enhancedProfile.psychographicProfile.trustLevel)} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Price Sensitivity</span>
                    <span className="text-sm">{Number(enhancedProfile.psychographicProfile.priceSensitivity)}%</span>
                  </div>
                  <Progress value={Number(enhancedProfile.psychographicProfile.priceSensitivity)} className="bg-amber-200" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Behavioral Loop Stage</h4>
                <div className="flex space-x-1">
                  <Badge variant={enhancedProfile.psychographicProfile.behavioralLoop === 'discovery' ? 'default' : 'outline'}>
                    Discovery
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.behavioralLoop === 'engagement' ? 'default' : 'outline'}>
                    Engagement
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.behavioralLoop === 'investment' ? 'default' : 'outline'}>
                    Investment
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.behavioralLoop === 'identity' ? 'default' : 'outline'}>
                    Identity
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.behavioralLoop === 'advocacy' ? 'default' : 'outline'}>
                    Advocacy
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Decision Stage</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant={enhancedProfile.psychographicProfile.decisionStage === 'problem_recognition' ? 'default' : 'outline'}>
                    Problem Recognition
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.decisionStage === 'information_search' ? 'default' : 'outline'}>
                    Information Search
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.decisionStage === 'alternative_evaluation' ? 'default' : 'outline'}>
                    Evaluation
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.decisionStage === 'purchase_decision' ? 'default' : 'outline'}>
                    Purchase Decision
                  </Badge>
                  <Badge variant={enhancedProfile.psychographicProfile.decisionStage === 'post_purchase_evaluation' ? 'default' : 'outline'}>
                    Post Purchase
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Value Orientation</h4>
                <Badge variant="secondary" className="capitalize">
                  {enhancedProfile.psychographicProfile.valueOrientation}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Next Best Action</h4>
                <p className="text-sm text-muted-foreground">{enhancedProfile.marketingOptimizations.nextBestAction}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="space-y-4">
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center mb-2">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold">Communication Strategy</h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-xs font-medium w-20">Tone:</span>
                    <span className="text-xs">{engagementStrategy.communicationStrategy.tone}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-medium mb-1">Appeals:</span>
                    <div className="flex flex-wrap gap-1">
                      {engagementStrategy.communicationStrategy.emotionalAppeals.map((appeal, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{appeal}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-medium mb-1">Key Messages:</span>
                    <ul className="text-xs list-disc list-inside">
                      {engagementStrategy.communicationStrategy.keyMessages.map((message, i) => (
                        <li key={i}>{message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold">Offer Strategy</h4>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Offer Type:</span>
                    <span className="font-medium">{engagementStrategy.offerStrategies.offerType}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Pricing Structure:</span>
                    <span className="font-medium">{engagementStrategy.offerStrategies.pricingStructure}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Incentive Type:</span>
                    <span className="font-medium">{engagementStrategy.offerStrategies.incentiveType}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Deadline Structure:</span>
                    <span className="font-medium">{engagementStrategy.offerStrategies.deadline}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Presentation:</span>
                    <span className="font-medium">{engagementStrategy.offerStrategies.presentationStyle}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold">Optimal Timing</h4>
                </div>
                
                <div className="text-sm space-y-2">
                  <div>
                    <span className="text-xs">Best time for offers: </span>
                    <span className="text-xs font-medium">
                      {enhancedProfile.marketingOptimizations.optimalOfferTiming}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    {Array.from({length: 24}).map((_, hour) => (
                      <div 
                        key={hour}
                        className={`h-4 w-1 ${
                          hour === parseInt(enhancedProfile.marketingOptimizations.optimalOfferTiming as string) 
                            ? 'bg-primary' 
                            : 'bg-gray-200'
                        }`}
                        title={`${hour}:00`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="psychographics" className="space-y-4">
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Heart className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold">Brand Resonance (Keller)</h4>
                </div>
                
                <div className="relative pt-5">
                  <div className="absolute inset-x-0 h-px bg-gray-300">
                    <div className="absolute left-0 right-0 flex justify-between -top-2">
                      <div className={`h-4 w-4 rounded-full ${
                        enhancedProfile.psychographicProfile.brandResonance === 'awareness' 
                          ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                      <div className={`h-4 w-4 rounded-full ${
                        enhancedProfile.psychographicProfile.brandResonance === 'performance' 
                          ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                      <div className={`h-4 w-4 rounded-full ${
                        enhancedProfile.psychographicProfile.brandResonance === 'imagery' 
                          ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                      <div className={`h-4 w-4 rounded-full ${
                        enhancedProfile.psychographicProfile.brandResonance === 'judgments' 
                          ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                      <div className={`h-4 w-4 rounded-full ${
                        enhancedProfile.psychographicProfile.brandResonance === 'feelings' 
                          ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                      <div className={`h-4 w-4 rounded-full ${
                        enhancedProfile.psychographicProfile.brandResonance === 'resonance' 
                          ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="absolute inset-x-0 flex justify-between text-[9px] text-gray-500 mt-2">
                    <span>Awareness</span>
                    <span>Performance</span>
                    <span>Imagery</span>
                    <span>Judgments</span>
                    <span>Feelings</span>
                    <span>Resonance</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold">Identified Signals (Hughes)</h4>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {enhancedProfile.psychographicProfile.identifiedSignals.map((signal, i) => (
                    <Badge key={i} variant="secondary" className="capitalize">{signal}</Badge>
                  ))}
                  
                  {enhancedProfile.psychographicProfile.identifiedSignals.length === 0 && (
                    <span className="text-xs text-muted-foreground">No signals identified yet</span>
                  )}
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center mb-2">
                  <BarChart className="h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold">Metrics</h4>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Est. Lifetime Value:</span>
                    <span className="font-medium">
                      ${enhancedProfile.marketingOptimizations.lifetimeValueEstimate.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Retention Risk:</span>
                    <span className={`font-medium ${
                      enhancedProfile.marketingOptimizations.retentionRisk > 70 ? 'text-red-500' :
                      enhancedProfile.marketingOptimizations.retentionRisk > 40 ? 'text-amber-500' :
                      'text-green-500'
                    }`}>
                      {enhancedProfile.marketingOptimizations.retentionRisk}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Suggested Price Points:</span>
                    <span className="font-medium">
                      ${enhancedProfile.marketingOptimizations.suggestedPricePoints.map(p => p.toFixed(2)).join(', $')}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">No behavioral data available yet</p>
            <Button onClick={analyzeUser} size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Analyze Behavior
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={analyzeUser} disabled={isAnalyzing}>
          <Rocket className="h-4 w-4 mr-2" />
          Refresh Analysis
        </Button>
        <div className="text-xs text-muted-foreground">
          {lastAnalyzedAt && `Last analyzed: ${lastAnalyzedAt.toLocaleTimeString()}`}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedEngagementPanel;
