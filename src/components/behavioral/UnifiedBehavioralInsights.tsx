
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, LineChart, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useUnifiedBehavioral } from '@/hooks/useUnifiedBehavioral';
import { useAssessment } from '@/hooks/useAssessment';
import { toast } from '@/components/ui/use-toast';

const UnifiedBehavioralInsights: React.FC = () => {
  const { profile, isAnalyzing, insights } = useUnifiedBehavioral();
  const { assessment, generateAssessment } = useAssessment();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Auto-refresh insights periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isAnalyzing) {
        generateAssessment().then(result => {
          if (result) {
            toast({
              title: "AI Insights Updated",
              description: "Behavioral profile automatically refreshed",
              variant: "default"
            });
          }
        });
      }
    }, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearInterval(intervalId);
  }, [generateAssessment, isAnalyzing]);
  
  if (!profile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Behavioral Insights</CardTitle>
          <CardDescription>Loading profile data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="flex flex-col items-center">
            <Brain className="h-12 w-12 text-muted-foreground animate-pulse" />
            <p className="mt-4 text-muted-foreground">Initializing AI behavioral analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getBadgeForSeverity = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-amber-500">Warning</Badge>;
      case 'opportunity':
        return <Badge className="bg-emerald-500">Opportunity</Badge>;
      default:
        return <Badge className="bg-blue-500">Info</Badge>;
    }
  };
  
  const getIconForSeverity = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'opportunity':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="chaseHughes">Chase Hughes Profile</TabsTrigger>
          <TabsTrigger value="psychographic">Psychographic Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Overview</CardTitle>
              <CardDescription>
                AI-driven analysis of engagement patterns and behavioral indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Engagement Health</h3>
                    <div className="text-2xl font-bold">{assessment?.engagementHealthScore || profile.systemMetrics.userEngagement.toFixed(0)}%</div>
                    <div className="w-full bg-secondary h-2 mt-2">
                      <div 
                        className="bg-primary h-2" 
                        style={{ width: `${assessment?.engagementHealthScore || profile.systemMetrics.userEngagement}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Conversion Potential</h3>
                    <div className="text-2xl font-bold">{assessment?.conversionPotentialScore || profile.systemMetrics.conversionPotential.toFixed(0)}%</div>
                    <div className="w-full bg-secondary h-2 mt-2">
                      <div 
                        className="bg-primary h-2" 
                        style={{ width: `${assessment?.conversionPotentialScore || profile.systemMetrics.conversionPotential}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Retention Score</h3>
                    <div className="text-2xl font-bold">{(100 - (assessment?.retentionRiskScore || 0)).toFixed(0)}%</div>
                    <div className="w-full bg-secondary h-2 mt-2">
                      <div 
                        className="bg-primary h-2" 
                        style={{ width: `${100 - (assessment?.retentionRiskScore || 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Trust Level</h3>
                    <div className="text-2xl font-bold">{profile.chaseHughesProfile?.trustScore || 0}%</div>
                    <div className="w-full bg-secondary h-2 mt-2">
                      <div 
                        className="bg-primary h-2" 
                        style={{ width: `${profile.chaseHughesProfile?.trustScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {assessment?.insightSummary && (
                  <div className="border rounded-md p-4 bg-muted/50">
                    <h3 className="font-medium mb-2">AI Summary</h3>
                    <p className="text-sm text-muted-foreground">{assessment.insightSummary}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium mb-2">Behavioral Loop Stage</h3>
                  <div className="flex items-center space-x-1">
                    <div className={`h-2 w-2 rounded-full ${profile.enhancedProfile.psychographicProfile.behavioralLoop === 'discovery' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className="h-0.5 w-4 bg-gray-200"></div>
                    <div className={`h-2 w-2 rounded-full ${profile.enhancedProfile.psychographicProfile.behavioralLoop === 'engagement' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className="h-0.5 w-4 bg-gray-200"></div>
                    <div className={`h-2 w-2 rounded-full ${profile.enhancedProfile.psychographicProfile.behavioralLoop === 'conversion' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className="h-0.5 w-4 bg-gray-200"></div>
                    <div className={`h-2 w-2 rounded-full ${profile.enhancedProfile.psychographicProfile.behavioralLoop === 'retention' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className="h-0.5 w-4 bg-gray-200"></div>
                    <div className={`h-2 w-2 rounded-full ${profile.enhancedProfile.psychographicProfile.behavioralLoop === 'advocacy' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Discovery</span>
                    <span>Engagement</span>
                    <span>Conversion</span>
                    <span>Retention</span>
                    <span>Advocacy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI Behavioral Insights</CardTitle>
              <CardDescription>
                Automatically generated recommendations based on behavioral analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assessment?.insights && assessment.insights.length > 0 ? (
                <div className="space-y-4">
                  {assessment.insights.map((insight) => (
                    <Card key={insight.id}>
                      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getIconForSeverity(insight.severityLevel)}
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                        </div>
                        {getBadgeForSeverity(insight.severityLevel)}
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                        
                        {insight.recommendedActions && insight.recommendedActions.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium">Recommended Actions</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                              {insight.recommendedActions.map((action, idx) => (
                                <li key={idx}>{action}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                          <span>Category: {insight.category}</span>
                          <span>Confidence: {insight.confidenceScore}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Brain className="h-16 w-16 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">No insights available yet. Run an assessment to generate insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chaseHughes">
          <Card>
            <CardHeader>
              <CardTitle>Chase Hughes Behavioral Profile</CardTitle>
              <CardDescription>
                Analysis based on the Behavioral Table of Elements framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile.chaseHughesProfile ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Current Influence Phase</h3>
                      <div className="flex items-center">
                        <Badge className="mr-2">{profile.chaseHughesProfile.currentInfluencePhase}</Badge>
                        <div className="text-sm text-muted-foreground">
                          {profile.chaseHughesProfile.influencePhaseProgress}% complete
                        </div>
                      </div>
                      <div className="w-full bg-secondary h-2 mt-2">
                        <div 
                          className="bg-primary h-2" 
                          style={{ width: `${profile.chaseHughesProfile.influencePhaseProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Primary Sensory Preference</h3>
                      <div className="flex space-x-1">
                        <Badge variant={profile.chaseHughesProfile.primarySensoryPreference === 'visual' ? 'default' : 'outline'}>
                          Visual
                        </Badge>
                        <Badge variant={profile.chaseHughesProfile.primarySensoryPreference === 'auditory' ? 'default' : 'outline'}>
                          Auditory
                        </Badge>
                        <Badge variant={profile.chaseHughesProfile.primarySensoryPreference === 'kinesthetic' ? 'default' : 'outline'}>
                          Kinesthetic
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Engagement Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Trust Score</div>
                        <div className="text-xl font-bold">{profile.chaseHughesProfile.trustScore}%</div>
                        <div className="w-full bg-secondary h-2 mt-1">
                          <div className="bg-blue-500 h-2" style={{ width: `${profile.chaseHughesProfile.trustScore}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Desire Score</div>
                        <div className="text-xl font-bold">{profile.chaseHughesProfile.desireScore}%</div>
                        <div className="w-full bg-secondary h-2 mt-1">
                          <div className="bg-purple-500 h-2" style={{ width: `${profile.chaseHughesProfile.desireScore}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Engagement Score</div>
                        <div className="text-xl font-bold">{profile.chaseHughesProfile.engagementScore}%</div>
                        <div className="w-full bg-secondary h-2 mt-1">
                          <div className="bg-green-500 h-2" style={{ width: `${profile.chaseHughesProfile.engagementScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Suggested Approach</h3>
                    <div className="border rounded-md p-4 bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Technique</span>
                        <Badge>{profile.chaseHughesProfile.suggestedApproach.technique}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Recommended Language Pattern:</strong> "{profile.chaseHughesProfile.suggestedApproach.languagePattern}"
                      </p>
                    </div>
                  </div>
                  
                  {profile.chaseHughesProfile.detectedMicroExpressions && profile.chaseHughesProfile.detectedMicroExpressions.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Detected Micro-Expressions</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.chaseHughesProfile.detectedMicroExpressions.map((exp, idx) => (
                          <Badge key={idx} variant="outline">{exp}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Brain className="h-16 w-16 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">Chase Hughes profile not available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="psychographic">
          <Card>
            <CardHeader>
              <CardTitle>Psychographic Profile</CardTitle>
              <CardDescription>
                Enhanced behavioral profiling analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile.enhancedProfile.psychographicProfile ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Personality Traits</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.enhancedProfile.psychographicProfile.personalityTraits.map((trait, idx) => (
                          <Badge key={idx}>{trait}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.enhancedProfile.psychographicProfile.interests.map((interest, idx) => (
                          <Badge key={idx} variant="outline">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Values</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.enhancedProfile.psychographicProfile.values.map((value, idx) => (
                          <Badge key={idx} variant="secondary">{value}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Motivations</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.enhancedProfile.psychographicProfile.motivations.map((motivation, idx) => (
                          <Badge key={idx} variant="outline">{motivation}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-4">Decision Making & Engagement Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Decision Making Style</div>
                        <Badge>{profile.enhancedProfile.psychographicProfile.decisionMakingStyle}</Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Value Orientation</div>
                        <Badge>{profile.enhancedProfile.psychographicProfile.valueOrientation}</Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Decision Stage</div>
                        <Badge>{profile.enhancedProfile.psychographicProfile.decisionStage}</Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Trust Level</div>
                        <div className="flex items-center">
                          <span className="mr-2 font-medium">{profile.enhancedProfile.psychographicProfile.trustLevel}</span>
                          <div className="w-full bg-secondary h-2">
                            <div 
                              className="bg-blue-500 h-2" 
                              style={{ width: `${profile.enhancedProfile.psychographicProfile.trustLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Price Sensitivity</div>
                        <div className="flex items-center">
                          <span className="mr-2 font-medium">{profile.enhancedProfile.psychographicProfile.priceSensitivity}</span>
                          <div className="w-full bg-secondary h-2">
                            <div 
                              className="bg-amber-500 h-2" 
                              style={{ width: `${profile.enhancedProfile.psychographicProfile.priceSensitivity}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Brand Resonance</div>
                        <Badge>{profile.enhancedProfile.psychographicProfile.brandResonance}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-4">Marketing Optimization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Recommended Approach</div>
                        <div className="font-medium">{profile.enhancedProfile.marketingOptimizations.recommendedApproach}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Messaging Tone</div>
                        <div className="font-medium">{profile.enhancedProfile.marketingOptimizations.messagingTone}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Content Preferences</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.enhancedProfile.marketingOptimizations.contentPreferences.map((pref, idx) => (
                            <Badge key={idx} variant="outline">{pref}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Call To Action Style</div>
                        <div className="font-medium">{profile.enhancedProfile.marketingOptimizations.callToActionStyle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Brain className="h-16 w-16 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">Psychographic profile data not available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedBehavioralInsights;
