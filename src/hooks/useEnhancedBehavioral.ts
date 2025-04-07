import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './auth/useAuth';
import { 
  EnhancedBehavioralProfile, 
  TrustLevel, 
  PriceSensitivity, 
  BehavioralLoop, 
  ConsumerDecisionStage,
  ValueOrientation,
  BrandResonanceStage 
} from '@/types/enhancedBehavioral';
import { EnhancedBehavioralAnalyzer } from '@/services/behavioral/EnhancedBehavioralAnalyzer';

const defaultProfile: EnhancedBehavioralProfile = {
  standardProfile: {
    id: 'default',
    userId: 'anonymous',
    demographics: {
      ageGroup: '25-34',
      gender: 'unknown',
      location: 'unknown'
    },
    behaviorTags: ['new-user']
  },
  psychographicProfile: {
    personalityTraits: ['curious'],
    interests: ['technology'],
    values: ['convenience', 'quality'],
    motivations: ['discovery'],
    decisionMakingStyle: 'balanced',
    trustLevel: TrustLevel.Moderate,
    priceSensitivity: PriceSensitivity.Moderate,
    behavioralLoop: BehavioralLoop.Discovery,
    decisionStage: ConsumerDecisionStage.InformationSearch,
    valueOrientation: ValueOrientation.Practical,
    brandResonance: BrandResonanceStage.Awareness,
    identifiedSignals: ['interest']
  },
  marketingOptimizations: {
    recommendedApproach: 'educational',
    messagingTone: 'helpful',
    contentPreferences: ['visual', 'concise'],
    callToActionStyle: 'subtle',
    idealEngagementTimes: ['weekend', 'evening'],
    nextBestAction: 'provide_information',
    optimalOfferTiming: 'not_ready',
    suggestedPricePoints: [0, 5, 10],
    retentionRisk: 0.3,
    lifetimeValueEstimate: 50
  }
};

export const useEnhancedBehavioral = () => {
  const { user } = useAuth();
  const [enhancedProfile, setEnhancedProfile] = useState<EnhancedBehavioralProfile>(defaultProfile);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzedAt, setLastAnalyzedAt] = useState<Date | null>(null);
  const analyzer = new EnhancedBehavioralAnalyzer();
  
  useEffect(() => {
    if (user) {
      setEnhancedProfile(prev => ({
        ...prev,
        standardProfile: {
          ...prev.standardProfile,
          userId: user.id,
          id: `profile-${user.id}`
        }
      }));
    }
  }, [user]);

  const analyzeUser = useCallback(async (): Promise<EnhancedBehavioralProfile> => {
    if (!user) return enhancedProfile;
    
    setIsAnalyzing(true);
    try {
      const analyzedProfile = await analyzer.createEnhancedProfile(user, enhancedProfile);
      
      const optimizedProfile = analyzer.applyOxumDecisions(analyzedProfile);
      
      const validatedProfile = analyzer.applyGouldFilters(optimizedProfile);
      
      const finalProfile = analyzer.applyChaseHughesFramework(validatedProfile);
      
      setEnhancedProfile(finalProfile);
      setLastAnalyzedAt(new Date());
      return finalProfile;
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
      return enhancedProfile;
    } finally {
      setIsAnalyzing(false);
    }
  }, [user, enhancedProfile, analyzer]);
  
  const generateEngagementStrategy = useCallback(() => {
    if (!user) return {
      communicationStrategy: {
        tone: 'neutral',
        emotionalAppeals: ['trust', 'curiosity'],
        keyMessages: ['Discover our features']
      },
      offerStrategies: {
        offerType: 'freemium',
        pricingStructure: 'standard',
        incentiveType: 'none',
        deadline: 'none',
        presentationStyle: 'informational'
      }
    };
    
    try {
      const strategies = {
        communicationStrategy: {
          tone: 'friendly',
          emotionalAppeals: ['trust', 'curiosity', 'excitement'],
          keyMessages: ['Enhance your experience', 'Connect with AI companions']
        },
        offerStrategies: {
          offerType: 'premium',
          pricingStructure: 'tiered',
          incentiveType: 'bonus',
          deadline: 'limited-time',
          presentationStyle: 'personalized'
        }
      };
      
      return strategies;
    } catch (error) {
      console.error('Error generating engagement strategies:', error);
      return {
        communicationStrategy: {
          tone: 'neutral',
          emotionalAppeals: ['trust'],
          keyMessages: ['Explore our offerings']
        },
        offerStrategies: {
          offerType: 'standard',
          pricingStructure: 'flat',
          incentiveType: 'none',
          deadline: 'none',
          presentationStyle: 'informational'
        }
      };
    }
  }, [user, enhancedProfile]);

  return {
    enhancedProfile,
    setEnhancedProfile,
    original: user,
    isAnalyzing,
    analyzeUser,
    generateEngagementStrategy,
    lastAnalyzedAt
  };
};

export default useEnhancedBehavioral;
