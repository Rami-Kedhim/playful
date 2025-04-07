
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useBehavioralProfile } from '@/hooks/auth';
import { BehaviorTag } from '@/types/behavioral';
import { EnhancedBehavioralProfile, EngagementOptimization } from '@/types/enhancedBehavioral';
import enhancedBehavioralAnalyzer from '@/services/behavioral/EnhancedBehavioralAnalyzer';

/**
 * Hook for accessing enhanced behavioral analysis capabilities
 * Integrates Chase Hughes' behavioral analysis with Chernev/Kotler/Keller marketing principles
 */
export function useEnhancedBehavioral() {
  const { user } = useAuth();
  const { profile, recordBehavior, recordInteraction } = useBehavioralProfile();
  
  const [enhancedProfile, setEnhancedProfile] = useState<EnhancedBehavioralProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzedAt, setLastAnalyzedAt] = useState<Date | null>(null);
  
  /**
   * Generate enhanced profile based on current behavior data
   */
  const analyzeUser = useCallback(async () => {
    if (!user?.id || !profile) {
      return null;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would use actual interaction data from user history
      // For demo purposes, we'll use placeholder data
      const mockInteractionData = {
        messagesExchanged: profile.interactionHistory.messagesExchanged,
        responseDelays: [2.5, 3.1, 1.8, 4.2], // seconds
        clickPatterns: [
          { element: 'profile-view', timeViewing: 45 },
          { element: 'pricing-page', timeViewing: 30 },
          { element: 'testimonials', timeViewing: 20 }
        ],
        searchQueries: ['premium features', 'how to boost visibility'],
        pagesVisited: ['/home', '/pricing', '/profiles/123', '/boost'],
        comparisonsViewed: 2,
        cartAbandoned: false,
        purchaseCompleted: profile.interactionHistory.totalSpent > 0,
        postPurchaseEngagement: 3,
        purchaseHistory: profile.interactionHistory.totalSpent > 0 ? 1 : 0,
        totalSpent: profile.interactionHistory.totalSpent,
        visitsCount: 5,
        timeOnSite: 15 * 60, // 15 minutes in seconds
        engagementRate: 0.6,
        sessionFrequency: 3, // 3 times per week
        sessionDuration: 15, // 15 minutes average
        contentPreferences: ['profiles', 'messages', 'boost'],
        pricePoints: profile.interactionHistory.totalSpent > 0 ? [profile.interactionHistory.totalSpent] : [9.99],
        responseToIncentives: 75, // 0-100
        referralCount: 0
      };
      
      // Create enhanced behavioral profile
      const enhancedBehavioral = enhancedBehavioralAnalyzer.createEnhancedProfile(
        user.id,
        profile.behaviorTags,
        mockInteractionData
      );
      
      setEnhancedProfile(enhancedBehavioral);
      setLastAnalyzedAt(new Date());
      
      return enhancedBehavioral;
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [user?.id, profile]);
  
  /**
   * Record behavioral pattern and update enhanced profile
   */
  const recordBehaviorPattern = useCallback((
    behaviorTag: BehaviorTag,
    interactionType: 'message' | 'voice' | 'content' | 'payment',
    value: number = 1
  ) => {
    if (!user?.id) return;
    
    // Record in standard behavioral system
    recordBehavior(behaviorTag);
    recordInteraction(interactionType, value);
    
    // Trigger re-analysis if significant event
    if (interactionType === 'payment' || behaviorTag === 'high-value') {
      analyzeUser();
    }
  }, [user?.id, recordBehavior, recordInteraction, analyzeUser]);
  
  /**
   * Generate targeted engagement strategy based on Chernev's choice architecture
   * and Kotler's 4P marketing framework
   */
  const generateEngagementStrategy = useCallback((): EngagementOptimization => {
    if (!enhancedProfile) {
      // Return generic strategy if no profile exists
      return {
        contentRecommendations: [{
          contentType: 'general',
          timing: 'anytime',
          presentationStyle: 'standard'
        }],
        offerStrategies: {
          offerType: 'standard',
          pricingStructure: 'fixed',
          incentiveType: 'none',
          deadline: 'none',
          presentationStyle: 'informational'
        },
        communicationStrategy: {
          tone: 'neutral',
          emotionalAppeals: ['value'],
          keyMessages: ['Discover our features'],
          psychologicalTriggers: ['curiosity']
        }
      };
    }
    
    // Generate personalized content recommendations
    const contentRecommendations = [];
    
    // Apply Kotler's customer journey approach
    if (enhancedProfile.psychographicProfile.decisionStage === 'problem_recognition') {
      contentRecommendations.push({
        contentType: 'educational',
        timing: 'immediate',
        presentationStyle: 'helpful'
      });
    } else if (enhancedProfile.psychographicProfile.decisionStage === 'information_search') {
      contentRecommendations.push({
        contentType: 'comparison',
        timing: 'during session',
        presentationStyle: 'detailed'
      });
    } else if (enhancedProfile.psychographicProfile.decisionStage === 'evaluation') {
      contentRecommendations.push({
        contentType: 'testimonials',
        timing: 'prime hours',
        presentationStyle: 'social proof'
      });
    }
    
    // Apply Chernev's value framework
    let offerStrategies;
    if (enhancedProfile.psychographicProfile.valueOrientation === 'economic') {
      offerStrategies = {
        offerType: 'discount',
        pricingStructure: 'tiered',
        incentiveType: 'immediate savings',
        deadline: 'limited time',
        presentationStyle: 'value-focused'
      };
    } else if (enhancedProfile.psychographicProfile.valueOrientation === 'functional') {
      offerStrategies = {
        offerType: 'feature upgrade',
        pricingStructure: 'feature-based',
        incentiveType: 'extra features',
        deadline: 'feature limited',
        presentationStyle: 'benefit-focused'
      };
    } else if (enhancedProfile.psychographicProfile.valueOrientation === 'emotional') {
      offerStrategies = {
        offerType: 'experience',
        pricingStructure: 'value-based',
        incentiveType: 'exclusive access',
        deadline: 'special occasion',
        presentationStyle: 'story-based'
      };
    } else {
      offerStrategies = {
        offerType: 'premium',
        pricingStructure: 'prestige',
        incentiveType: 'status benefits',
        deadline: 'membership-driven',
        presentationStyle: 'exclusivity'
      };
    }
    
    // Apply Hughes' persuasion techniques
    const psychologicalTriggers = [];
    if (enhancedProfile.psychographicProfile.trustLevel < 50) {
      psychologicalTriggers.push('social proof');
      psychologicalTriggers.push('authority');
    } else {
      psychologicalTriggers.push('reciprocity');
      psychologicalTriggers.push('commitment');
    }
    
    if (enhancedProfile.psychographicProfile.identifiedSignals.includes('interest')) {
      psychologicalTriggers.push('curiosity');
    }
    
    if (enhancedProfile.psychographicProfile.identifiedSignals.includes('trust')) {
      psychologicalTriggers.push('liking');
    }
    
    // Apply Keller's brand resonance concept
    let tone = 'neutral';
    let emotionalAppeals = ['value'];
    let keyMessages = ['Discover our features'];
    
    switch (enhancedProfile.psychographicProfile.brandResonance) {
      case 'awareness':
        tone = 'informative';
        emotionalAppeals = ['curiosity', 'novelty'];
        keyMessages = ['Discover what we offer', 'New solution for your needs'];
        break;
      case 'performance':
        tone = 'practical';
        emotionalAppeals = ['efficiency', 'results'];
        keyMessages = ['How our solution works', 'Benefits you can expect'];
        break;
      case 'imagery':
        tone = 'aspirational';
        emotionalAppeals = ['identity', 'lifestyle'];
        keyMessages = ['Who our solution is for', 'How it fits your life'];
        break;
      case 'judgments':
        tone = 'credible';
        emotionalAppeals = ['trust', 'reliability'];
        keyMessages = ['Why users trust us', 'Our quality promise'];
        break;
      case 'feelings':
        tone = 'warm';
        emotionalAppeals = ['belonging', 'happiness'];
        keyMessages = ['How users feel about us', 'Join our community'];
        break;
      case 'resonance':
        tone = 'familiar';
        emotionalAppeals = ['loyalty', 'community'];
        keyMessages = ['Thank you for being with us', 'Your continued journey'];
        break;
    }
    
    return {
      contentRecommendations,
      offerStrategies,
      communicationStrategy: {
        tone,
        emotionalAppeals,
        keyMessages,
        psychologicalTriggers
      }
    };
  }, [enhancedProfile]);
  
  // Initialize enhanced profile when standard profile changes
  useEffect(() => {
    if (profile && user?.id && (!lastAnalyzedAt || new Date().getTime() - lastAnalyzedAt.getTime() > 3600000)) {
      analyzeUser();
    }
  }, [profile, user?.id, lastAnalyzedAt, analyzeUser]);
  
  return {
    enhancedProfile,
    isAnalyzing,
    analyzeUser,
    recordBehaviorPattern,
    generateEngagementStrategy,
    lastAnalyzedAt
  };
}

export default useEnhancedBehavioral;
