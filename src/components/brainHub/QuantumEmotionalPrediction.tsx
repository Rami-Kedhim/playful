
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Heart, UserCheck, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Types for emotional prediction engine
interface EmotionalState {
  dominant: string;
  secondary: string;
  intensity: number;
  volatility: number;
  timestamp: number;
}

interface EmotionPrediction {
  currentState: EmotionalState;
  predictedState: EmotionalState;
  confidence: number;
  triggers: string[];
  recommendedActions: string[];
}

interface EmotionalTrend {
  emotion: string;
  values: number[];
  direction: 'rising' | 'falling' | 'stable';
}

const QuantumEmotionalPrediction: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<EmotionPrediction | null>(null);
  const [emotionalTrends, setEmotionalTrends] = useState<EmotionalTrend[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // Simulate loading prediction data
  const loadPredictionData = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPrediction: EmotionPrediction = {
        currentState: {
          dominant: 'curiosity',
          secondary: 'anticipation',
          intensity: 68,
          volatility: 12,
          timestamp: Date.now()
        },
        predictedState: {
          dominant: 'desire',
          secondary: 'excitement',
          intensity: 76,
          volatility: 18,
          timestamp: Date.now() + 3600000 // 1 hour in the future
        },
        confidence: 82,
        triggers: [
          'visual content engagement',
          'conversation depth',
          'profile viewing patterns',
          'time-of-day behavior'
        ],
        recommendedActions: [
          'Suggest premium visual content',
          'Initiate personalized conversation',
          'Present limited-time offers',
          'Enhance immersion with contextual elements'
        ]
      };
      
      const mockTrends: EmotionalTrend[] = [
        { emotion: 'desire', values: [42, 46, 51, 58, 64, 67, 76], direction: 'rising' },
        { emotion: 'curiosity', values: [68, 65, 70, 68, 64, 61, 55], direction: 'falling' },
        { emotion: 'excitement', values: [28, 35, 42, 45, 50, 54, 65], direction: 'rising' },
        { emotion: 'contentment', values: [45, 48, 50, 52, 49, 47, 44], direction: 'stable' },
      ];
      
      setPredictionData(mockPrediction);
      setEmotionalTrends(mockTrends);
      setLoading(false);
    }, 1500);
  };
  
  // Load data on initial render
  useEffect(() => {
    loadPredictionData();
  }, []);
  
  // Handle optimization
  const handleOptimizeEmotionalSystem = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      toast({
        title: "Emotional Prediction Engine Optimized",
        description: "Quantum patterns recalibrated and uncertainty principles adjusted."
      });
    }, 2000);
  };
  
  // Helper function to get badge styles
  const getEmotionBadgeColor = (emotion: string): string => {
    switch(emotion) {
      case 'desire': return 'bg-red-500 hover:bg-red-600';
      case 'curiosity': return 'bg-blue-500 hover:bg-blue-600';
      case 'excitement': return 'bg-amber-500 hover:bg-amber-600';
      case 'contentment': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-slate-500 hover:bg-slate-600';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Quantum Emotional Prediction Engine
            </CardTitle>
            <CardDescription>
              Predicts user emotional states based on behavioral micro-patterns
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleOptimizeEmotionalSystem}
            disabled={isOptimizing || loading}
          >
            {isOptimizing ? "Optimizing..." : "Optimize Engine"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">
              <Brain className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="predictions">
              <Star className="h-4 w-4 mr-2" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="trends">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Emotional Trends
            </TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading emotional quantum patterns...</p>
            </div>
          ) : (
            <>
              <TabsContent value="overview">
                {predictionData && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Current Emotional State</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <Badge className={getEmotionBadgeColor(predictionData.currentState.dominant)}>
                                {predictionData.currentState.dominant}
                              </Badge>
                              <div className="text-sm text-muted-foreground mt-1">
                                Secondary: {predictionData.currentState.secondary}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">{predictionData.currentState.intensity}%</div>
                              <div className="text-sm text-muted-foreground">Intensity</div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Emotional Volatility</span>
                              <span>{predictionData.currentState.volatility}%</span>
                            </div>
                            <Progress value={predictionData.currentState.volatility} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Predicted Transition</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <Badge className={getEmotionBadgeColor(predictionData.predictedState.dominant)}>
                                {predictionData.predictedState.dominant}
                              </Badge>
                              <div className="text-sm text-muted-foreground mt-1">
                                Secondary: {predictionData.predictedState.secondary}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">{predictionData.confidence}%</div>
                              <div className="text-sm text-muted-foreground">Confidence</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm">
                              <div className="font-medium">Predicted Intensity</div>
                              <div className="text-2xl font-bold">{predictionData.predictedState.intensity}%</div>
                            </div>
                            <div className="ml-2">
                              <Sparkles className="h-10 w-10 text-amber-400 opacity-80" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Emotional Triggers</h3>
                      <div className="flex flex-wrap gap-2">
                        {predictionData.triggers.map((trigger, index) => (
                          <Badge key={index} variant="outline">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Alert>
                        <AlertDescription>
                          <div className="font-medium mb-1">Recommended Actions</div>
                          <ul className="list-disc pl-5 space-y-1">
                            {predictionData.recommendedActions.map((action, index) => (
                              <li key={index} className="text-sm">{action}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="predictions">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Prediction Confidence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end space-x-2 mb-4">
                        <div className="text-4xl font-bold">{predictionData?.confidence || 0}%</div>
                        <div className="text-sm text-muted-foreground mb-1">confidence level</div>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quantum Uncertainty Range</span>
                        <span>±{Math.floor((100 - (predictionData?.confidence || 0)) / 2)}%</span>
                      </div>
                      <Progress value={predictionData?.confidence || 0} className="h-2" />
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Current vs Predicted</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Emotional Intensity</div>
                            <div className="text-sm">
                              {predictionData?.currentState.intensity || 0}% → {predictionData?.predictedState.intensity || 0}%
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Emotional Volatility</div>
                            <div className="text-sm">
                              {predictionData?.currentState.volatility || 0}% → {predictionData?.predictedState.volatility || 0}%
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Time Window</div>
                            <div className="text-sm">Next 1-2 hours</div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Accuracy History</div>
                            <div className="text-sm">78% (last 7 days)</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Recommended Response</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium mb-1">Content Type Adjustment</div>
                            <Badge className="bg-blue-500 hover:bg-blue-600">Increase Visual Content</Badge>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-1">Communication Tone</div>
                            <Badge className="bg-amber-500 hover:bg-amber-600">More Intimate</Badge>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-1">Offer Timing</div>
                            <Badge className="bg-green-500 hover:bg-green-600">Optimal Within 30 Min</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium mb-2">Emotional Trend Analysis</h3>
                  
                  <div className="space-y-6">
                    {emotionalTrends.map((trend, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge className={getEmotionBadgeColor(trend.emotion)}>
                              {trend.emotion}
                            </Badge>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {trend.direction === 'rising' ? '↗ Rising' : 
                               trend.direction === 'falling' ? '↘ Falling' : '→ Stable'}
                            </span>
                          </div>
                          <div className="text-sm font-medium">
                            {trend.values[0]}% → {trend.values[trend.values.length - 1]}%
                          </div>
                        </div>
                        
                        <div className="h-8 bg-muted rounded-md flex items-end">
                          {trend.values.map((value, i) => (
                            <div 
                              key={i}
                              className={`h-${Math.max(1, Math.floor(value / 10))} ${getEmotionBadgeColor(trend.emotion)} flex-1 mx-px rounded-t-sm`}
                              style={{ height: `${value}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Card className="mt-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Emotional Prediction Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Time in State</div>
                          <div className="text-lg font-medium">34 minutes</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Transition Probability</div>
                          <div className="text-lg font-medium">76%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Behavior Correlation</div>
                          <div className="text-lg font-medium">High (0.82)</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Purchase Intent</div>
                          <div className="text-lg font-medium">Medium-High</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t text-xs text-muted-foreground">
          <div>Updated {new Date().toLocaleTimeString()}</div>
          <Button variant="ghost" size="sm" disabled={loading} onClick={loadPredictionData}>
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumEmotionalPrediction;
