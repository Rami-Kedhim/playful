
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useEnhancedBehavioral, EnhancedBehavioralProfile } from './useEnhancedBehavioral';

export const useAssessment = () => {
  const { user } = useAuth();
  const { enhancedProfile, analyzeUser, isAnalyzing } = useEnhancedBehavioral();
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const runAssessment = async () => {
    if (!user) return null;
    
    setIsProcessing(true);
    
    try {
      // First get behavioral data if it doesn't exist
      if (!enhancedProfile.psychographicProfile.trustLevel) {
        await analyzeUser();
      }
      
      // Simulate assessment calculation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate assessment based on enhancedProfile
      const results = {
        assessmentId: `assess-${Date.now()}`,
        userId: user.id,
        timestamp: new Date().toISOString(),
        scores: {
          engagementPotential: calculateEngagementScore(enhancedProfile),
          contentAffinity: calculateContentScore(enhancedProfile),
          monetizationPropensity: calculateMonetizationScore(enhancedProfile),
          retentionLikelihood: calculateRetentionScore(enhancedProfile)
        },
        recommendations: generateRecommendations(enhancedProfile),
        insightSummary: "Based on behavioral and psychographic analysis, this user shows significant engagement potential with premium virtual experiences and a preference for personalized content."
      };
      
      setAssessmentResults(results);
      return results;
    } catch (error) {
      console.error('Assessment failed:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Utility functions for assessment calculations
  const calculateEngagementScore = (profile: EnhancedBehavioralProfile) => {
    // Calculate engagement score based on profile data
    const baseScore = profile.psychographicProfile.trustLevel / 20;
    const multiplier = profile.psychographicProfile.behavioralLoop === 'advocacy' ? 1.2 : 1.0;
    return Math.min(Math.round(baseScore * multiplier * 10) / 10, 5);
  };
  
  const calculateContentScore = () => {
    // Mock content score calculation
    return Math.round((Math.random() * 2 + 3) * 10) / 10;
  };
  
  const calculateMonetizationScore = () => {
    // Mock monetization score calculation
    return Math.round((Math.random() * 2 + 2.5) * 10) / 10;
  };
  
  const calculateRetentionScore = (profile: EnhancedBehavioralProfile) => {
    // Calculate retention score based on profile data
    return Math.round((5 - (profile.psychographicProfile.priceSensitivity / 100) * 2) * 10) / 10;
  };
  
  const generateRecommendations = () => {
    // Generate mock recommendations
    return [
      "Offer premium content bundle with 15% discount",
      "Highlight exclusive virtual experiences",
      "Personalize messaging with social proof",
      "Introduce loyalty program for continued engagement"
    ];
  };
  
  return {
    runAssessment,
    assessmentResults,
    isProcessing: isProcessing || isAnalyzing,
    resetAssessment: () => setAssessmentResults(null)
  };
};

export default useAssessment;
