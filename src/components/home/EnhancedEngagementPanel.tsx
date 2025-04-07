import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  Activity, 
  Heart, 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  User, 
  RefreshCw 
} from 'lucide-react';
import useEnhancedBehavioral from '@/hooks/useEnhancedBehavioral';
import { BehavioralLoop, TrustLevel, PriceSensitivity, ConsumerDecisionStage, BrandResonanceStage } from '@/types/enhancedBehavioral';

const EnhancedEngagementPanel = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [engagementStrategies, setEngagementStrategies] = useState<any>(null);
  const { 
    enhancedProfile, 
    isAnalyzing, 
    analyzeUser, 
    generateEngagementStrategy,
    lastAnalyzedAt
  } = useEnhancedBehavioral();
  
  useEffect(() => {
    if (!lastAnalyzedAt) {
      handleAnalyzeUser();
    }
  }, [lastAnalyzedAt]);
  
  const handleAnalyzeUser = async () => {
    setIsRefreshing(true);
    
    try {
      await analyzeUser();
      
      // Generate engagement strategies
      const strategies = generateEngagementStrategy();
      setEngagementStrategies(strategies);
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const formatLastAnalyzedTime = () => {
    if (!lastAnalyzedAt) return 'Never';
    
    return new Date(lastAnalyzedAt).toLocaleTimeString();
  };
  
  const getTrustLevelInfo = (level: TrustLevel) => {
    const numericValue = Number(level);
    
    if (numericValue <= Number(TrustLevel.Low)) {
      return { text: 'Low Trust', color: 'bg-red-500', textColor: 'text-red-500' };
    } else if (numericValue <= Number(TrustLevel.Moderate)) {
      return { text: 'Building Trust', color: 'bg-amber-500', textColor: 'text-amber-500' };
    } else {
      return { text: 'High Trust', color: 'bg-green-500', textColor: 'text-green-500' };
    }
  };

  const getSensitivityInfo = (sensitivity: PriceSensitivity) => {
    const numericValue = Number(sensitivity);
    
    if (numericValue <= Number(PriceSensitivity.Low)) {
      return { text: 'Low Sensitivity', color: 'bg-green-500' };
    } else if (numericValue <= Number(PriceSensitivity.Moderate)) {
      return { text: 'Moderate Sensitivity', color: 'bg-amber-500' };
    } else {
      return { text: 'High Sensitivity', color: 'bg-red-500' };
    }
  };

  const getLoopStageInfo = (stage: BehavioralLoop) => {
    switch (stage) {
      case BehavioralLoop.Discovery:
        return { text: 'Discovery', icon: <AlertCircle className="h-4 w-4" /> };
      case BehavioralLoop.Engagement:
        return { text: 'Engagement', icon: <Activity className="h-4 w-4" /> };
      case BehavioralLoop.Conversion:
        return { text: 'Conversion', icon: <ShoppingCart className="h-4 w-4" /> };
      case BehavioralLoop.Retention:
        return { text: 'Retention', icon: <Heart className="h-4 w-4" /> };
      case BehavioralLoop.Advocacy:
        return { text: 'Advocacy', icon: <Target className="h-4 w-4" /> };
      case BehavioralLoop.Investment:
        return { text: 'Investment', icon: <TrendingUp className="h-4 w-4" /> };
      case BehavioralLoop.Identity:
        return { text: 'Identity', icon: <User className="h-4 w-4" /> };
      default:
        return { text: 'Unknown', icon: <AlertCircle className="h-4 w-4" /> };
    }
  };

  const getDecisionStageInfo = (stage: ConsumerDecisionStage) => {
    switch (stage) {
      case ConsumerDecisionStage.ProblemRecognition:
        return 'Problem Recognition';
      case ConsumerDecisionStage.InformationSearch:
        return 'Information Search';
      case ConsumerDecisionStage.AlternativeEvaluation:
        return 'Evaluating Alternatives';
      case ConsumerDecisionStage.PurchaseDecision:
        return 'Purchase Decision';
      case ConsumerDecisionStage.PostPurchaseEvaluation:
        return 'Post-Purchase Evaluation';
      case ConsumerDecisionStage.Evaluation:
        return 'Evaluation';
      case ConsumerDecisionStage.PostPurchase:
        return 'Post Purchase';
      default:
        return 'Unknown Stage';
    }
  };
  
  const renderCommunicationStrategies = () => {
    if (!engagementStrategies) return null;
    
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Communication Strategy</CardTitle>
          <CardDescription>AI-generated recommendations for optimal engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Tone</h4>
              <p className="text-sm">{engagementStrategies.communicationStrategy.tone}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Emotional Appeals</h4>
              <div className="flex flex-wrap gap-1">
                {engagementStrategies.communicationStrategy.emotionalAppeals.map((appeal: string, i: number) => (
                  <Badge key={i} variant="secondary">{appeal}</Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Key Messages</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {engagementStrategies.communicationStrategy.keyMessages.map((message: string, i: number) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderOfferStrategies = () => {
    if (!engagementStrategies) return null;
    
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Offer Strategies</CardTitle>
          <CardDescription>Optimized offer structuring based on behavioral analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Recommended Offer Type</h4>
              <p className="text-sm">{engagementStrategies.offerStrategies.offerType}</p>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Pricing Structure</h4>
              <p className="text-sm">{engagementStrategies.offerStrategies.pricingStructure}</p>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Incentive Type</h4>
              <p className="text-sm">{engagementStrategies.offerStrategies.incentiveType}</p>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Deadline Strategy</h4>
              <p className="text-sm">{engagementStrategies.offerStrategies.deadline}</p>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Presentation Style</h4>
              <p className="text-sm">{engagementStrategies.offerStrategies.presentationStyle}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Engagement Panel</h2>
          <p className="text-muted-foreground">AI-powered behavioral insights and recommendations</p>
        </div>
        <Button 
          onClick={handleAnalyzeUser} 
          disabled={isRefreshing || isAnalyzing}
          size="sm"
        >
          {isRefreshing || isAnalyzing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Analysis
            </>
          )}
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        Last analyzed: {formatLastAnalyzedTime()}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Trust Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={Number(enhancedProfile.psychographicProfile.trustLevel)} 
              className={`h-2 ${getTrustLevelInfo(enhancedProfile.psychographicProfile.trustLevel).color}`} 
            />
            <div className="mt-2 flex justify-between items-center">
              <span className={`text-sm font-medium ${getTrustLevelInfo(enhancedProfile.psychographicProfile.trustLevel).textColor}`}>
                {getTrustLevelInfo(enhancedProfile.psychographicProfile.trustLevel).text}
              </span>
              <span className="text-sm text-muted-foreground">
                {enhancedProfile.psychographicProfile.trustLevel}/100
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Price Sensitivity</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={Number(enhancedProfile.psychographicProfile.priceSensitivity)} 
              className={`h-2 ${getSensitivityInfo(enhancedProfile.psychographicProfile.priceSensitivity).color}`} 
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm font-medium">
                {getSensitivityInfo(enhancedProfile.psychographicProfile.priceSensitivity).text}
              </span>
              <span className="text-sm text-muted-foreground">
                {enhancedProfile.psychographicProfile.priceSensitivity}/100
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Behavioral Loop Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {getLoopStageInfo(enhancedProfile.psychographicProfile.behavioralLoop).icon}
              <span className="font-medium">
                {getLoopStageInfo(enhancedProfile.psychographicProfile.behavioralLoop).text}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {enhancedProfile.psychographicProfile.behavioralLoop === BehavioralLoop.Discovery && 
                "User is in the discovery phase, exploring options and gathering information."
              }
              {enhancedProfile.psychographicProfile.behavioralLoop === BehavioralLoop.Engagement && 
                "User is actively engaging with content and showing increased interest."
              }
              {enhancedProfile.psychographicProfile.behavioralLoop === BehavioralLoop.Conversion && 
                "User is nearing conversion, considering making a purchase or commitment."
              }
              {enhancedProfile.psychographicProfile.behavioralLoop === BehavioralLoop.Retention && 
                "User is in the retention phase, focus on maintaining their interest and satisfaction."
              }
              {enhancedProfile.psychographicProfile.behavioralLoop === BehavioralLoop.Advocacy && 
                "User is a potential advocate, likely to recommend or share positive experiences."
              }
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Decision Making Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium mb-2">
              {getDecisionStageInfo(enhancedProfile.psychographicProfile.decisionStage)}
            </div>
            <p className="text-sm text-muted-foreground">
              {enhancedProfile.psychographicProfile.decisionStage === ConsumerDecisionStage.ProblemRecognition && 
                "User has recognized a need or problem that requires a solution."
              }
              {enhancedProfile.psychographicProfile.decisionStage === ConsumerDecisionStage.InformationSearch && 
                "User is actively researching and gathering information about potential solutions."
              }
              {enhancedProfile.psychographicProfile.decisionStage === ConsumerDecisionStage.AlternativeEvaluation && 
                "User is comparing different options and evaluating alternatives."
              }
              {enhancedProfile.psychographicProfile.decisionStage === ConsumerDecisionStage.PurchaseDecision && 
                "User is ready to make a purchase decision."
              }
              {enhancedProfile.psychographicProfile.decisionStage === ConsumerDecisionStage.PostPurchaseEvaluation && 
                "User is evaluating their satisfaction after making a purchase."
              }
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Brand Resonance Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <div className={`text-center p-2 rounded-md ${enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Awareness ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                <div className="font-medium">Awareness</div>
                <div className="text-xs text-muted-foreground mt-1">Basic brand knowledge</div>
              </div>
              
              <div className={`text-center p-2 rounded-md ${enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Consideration ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                <div className="font-medium">Consideration</div>
                <div className="text-xs text-muted-foreground mt-1">Evaluating the brand</div>
              </div>
              
              <div className={`text-center p-2 rounded-md ${enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Preference ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                <div className="font-medium">Preference</div>
                <div className="text-xs text-muted-foreground mt-1">Favoring the brand</div>
              </div>
              
              <div className={`text-center p-2 rounded-md ${enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Purchase ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                <div className="font-medium">Purchase</div>
                <div className="text-xs text-muted-foreground mt-1">Buying decision</div>
              </div>
              
              <div className={`text-center p-2 rounded-md ${enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Loyalty ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                <div className="font-medium">Loyalty</div>
                <div className="text-xs text-muted-foreground mt-1">Repeat purchases</div>
              </div>
              
              {enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Performance && 
                <div className={`text-center p-2 rounded-md bg-primary/20 border border-primary`}>
                  <div className="font-medium">Performance</div>
                  <div className="text-xs text-muted-foreground mt-1">Value perception</div>
                </div>
              }
              
              {enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Imagery && 
                <div className={`text-center p-2 rounded-md bg-primary/20 border border-primary`}>
                  <div className="font-medium">Imagery</div>
                  <div className="text-xs text-muted-foreground mt-1">Brand associations</div>
                </div>
              }
              
              {enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Judgments && 
                <div className={`text-center p-2 rounded-md bg-primary/20 border border-primary`}>
                  <div className="font-medium">Judgments</div>
                  <div className="text-xs text-muted-foreground mt-1">Quality evaluations</div>
                </div>
              }
              
              {enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Feelings && 
                <div className={`text-center p-2 rounded-md bg-primary/20 border border-primary`}>
                  <div className="font-medium">Feelings</div>
                  <div className="text-xs text-muted-foreground mt-1">Emotional responses</div>
                </div>
              }
              
              {enhancedProfile.psychographicProfile.brandResonance === BrandResonanceStage.Resonance && 
                <div className={`text-center p-2 rounded-md bg-primary/20 border border-primary`}>
                  <div className="font-medium">Resonance</div>
                  <div className="text-xs text-muted-foreground mt-1">Deep connection</div>
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>
      
      {renderCommunicationStrategies()}
      {renderOfferStrategies()}
    </div>
  );
};

export default EnhancedEngagementPanel;
