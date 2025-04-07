
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUnifiedBehavioral } from '@/hooks/useUnifiedBehavioral';
import { Loader2, BrainCircuit, LineChart, UserCheck, Zap, AlertCircle } from 'lucide-react';

const UnifiedBehavioralInsights: React.FC = () => {
  const { 
    profile, 
    isAnalyzing, 
    analyzeUser, 
    insights, 
    uiSettings,
    engagementStrategy
  } = useUnifiedBehavioral();
  
  useEffect(() => {
    if (!profile) {
      analyzeUser();
    }
  }, [profile, analyzeUser]);

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analyzing User Behavior</CardTitle>
          <CardDescription>
            HERMES-OXUM is analyzing behavioral patterns...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Running neural analysis...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Behavioral Insights Unavailable</CardTitle>
          <CardDescription>
            Unable to load behavioral profile data.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <button 
            onClick={() => analyzeUser()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry Analysis
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              Unified Behavioral Analysis
            </CardTitle>
            <CardDescription>
              HERMES-OXUM + Enhanced Behavioral Profile
            </CardDescription>
          </div>
          <Badge 
            variant={profile.systemMetrics.userEngagement > 70 ? "success" : "default"}
            className="ml-auto"
          >
            {profile.enhancedProfile.psychographicProfile.behavioralLoop}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="mb-4">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="strategy">Engagement</TabsTrigger>
            <TabsTrigger value="ui">UI Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Engagement</span>
                  <span className="text-sm font-medium">{Math.round(profile.systemMetrics.userEngagement)}%</span>
                </div>
                <Progress value={profile.systemMetrics.userEngagement} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Conversion Potential</span>
                  <span className="text-sm font-medium">{Math.round(profile.systemMetrics.conversionPotential)}%</span>
                </div>
                <Progress value={profile.systemMetrics.conversionPotential} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Retention Score</span>
                  <span className="text-sm font-medium">{Math.round(profile.systemMetrics.retentionScore)}%</span>
                </div>
                <Progress value={profile.systemMetrics.retentionScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Trust Level</span>
                  <span className="text-sm font-medium">{Math.round(profile.systemMetrics.trustLevel)}%</span>
                </div>
                <Progress value={profile.systemMetrics.trustLevel} className="h-2" />
              </div>
              
              <div className="pt-2 flex flex-wrap gap-2">
                {profile.enhancedProfile.psychographicProfile.personalityTraits.map((trait, i) => (
                  <Badge key={i} variant="outline">{trait}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {insight.type === 'opportunity' ? (
                      <Zap className="h-5 w-5 text-amber-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={insight.timeHorizon === 'immediate' ? "border-amber-500" : ""}
                        >
                          {insight.timeHorizon}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {insights.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                  No insights available at this time
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="strategy">
            {engagementStrategy && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Primary Approach:</span>
                  <Badge>{engagementStrategy.primaryApproach}</Badge>
                </div>
                
                <div className="border-t pt-2">
                  <h4 className="text-sm font-medium mb-2">Message Tone</h4>
                  <p className="text-sm text-muted-foreground">{engagementStrategy.messageTone}</p>
                </div>
                
                <div className="border-t pt-2">
                  <h4 className="text-sm font-medium mb-2">Ideal Content Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {engagementStrategy.idealContentTypes.map((type, i) => (
                      <Badge key={i} variant="outline">{type}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <h4 className="text-sm font-medium mb-2">CTA Style</h4>
                  <p className="text-sm text-muted-foreground">{engagementStrategy.callToActionStyle}</p>
                </div>
                
                <div className="border-t pt-2">
                  <h4 className="text-sm font-medium mb-2">Timing Recommendations</h4>
                  <div className="flex flex-wrap gap-2">
                    {engagementStrategy.timingRecommendations.map((timing, i) => (
                      <Badge key={i} variant="secondary">{timing}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ui">
            {uiSettings && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded p-3">
                    <div className="text-xs text-muted-foreground">Color Scheme</div>
                    <div className="font-medium capitalize">{uiSettings.colorScheme}</div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <div className="text-xs text-muted-foreground">Density</div>
                    <div className="font-medium capitalize">{uiSettings.density}</div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <div className="text-xs text-muted-foreground">Motion Level</div>
                    <div className="font-medium capitalize">{uiSettings.motionLevel}</div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <div className="text-xs text-muted-foreground">Message Style</div>
                    <div className="font-medium capitalize">{uiSettings.messageStyle}</div>
                  </div>
                </div>
                
                <div className="border rounded p-3">
                  <div className="text-xs text-muted-foreground">Content Prioritization</div>
                  <div className="font-medium capitalize">{uiSettings.contentPrioritization}</div>
                </div>
                
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>These settings are automatically applied based on the unified behavioral analysis to optimize the user experience.</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UnifiedBehavioralInsights;
