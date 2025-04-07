
import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import { useEnhancedBehavioral } from './useEnhancedBehavioral';
import BehavioralAssessmentService from '@/services/assessment/BehavioralAssessmentService';
import { AssessmentResult, AssessmentInsight, AssessmentCategory, AssessmentSeverityLevel } from '@/types/assessment';
import { BrandResonanceStage, BehavioralLoop, ValueOrientation, ConsumerDecisionStage } from '@/types/enhancedBehavioral';

export const useAssessment = () => {
  const { user } = useAuth();
  const { analyzeUser, enhancedProfile } = useEnhancedBehavioral();
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const assessmentService = BehavioralAssessmentService;
  
  const runAssessment = useCallback(async () => {
    if (!user) return null;
    
    setIsProcessing(true);
    try {
      await analyzeUser();
      
      const assessment = await assessmentService.analyzeUserBehavior(
        user.id, 
        [] // Providing empty behavior events array as placeholder
      );
      
      // Only set if we got valid assessment results and ensure it matches the required type
      if (assessment) {
        // Transform the service result to match the expected AssessmentResult type
        const completeAssessment: AssessmentResult = {
          userId: user.id,
          timestamp: new Date().toISOString(),
          assessmentId: `assessment-${Date.now()}`,
          insightSummary: assessment.summary || '',
          scores: {
            engagementPotential: assessment.engagementHealthScore || 0,
            contentAffinity: assessment.conversionPotentialScore || 0,
            monetizationPropensity: assessment.conversionPotentialScore || 0, // Using conversion as a proxy
            retentionLikelihood: 100 - (assessment.retentionRiskScore || 0), // Invert risk score
          },
          recommendations: assessment.flags?.map(f => f.recommendedActions).flat() || [],
          overallScore: assessment.overallScore || 0,
          insights: assessment.insights?.map(insight => ({
            id: `insight-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            category: insight.category as AssessmentCategory,
            title: insight.title,
            description: insight.description,
            severityLevel: insight.severityLevel === 'high' ? 'critical' : 
                          insight.severityLevel === 'medium' ? 'warning' : 
                          insight.severityLevel === 'low' ? 'opportunity' : 'positive' as AssessmentSeverityLevel,
            impact: insight.severityLevel === 'high' ? 80 : 
                   insight.severityLevel === 'medium' ? 60 : 40,
            confidenceScore: 75, // Default confidence score
            recommendedActions: insight.recommendedActions || []
          })) || [],
          summary: assessment.summary || '',
          strengthAreas: assessment.strengthAreas || [],
          improvementAreas: assessment.improvementAreas || [],
          engagementHealthScore: assessment.engagementHealthScore || 0,
          conversionPotentialScore: assessment.conversionPotentialScore || 0,
          retentionRiskScore: assessment.retentionRiskScore || 0,
          psychographicProfile: assessment.psychographicProfile ? {
            personalityTraits: assessment.psychographicProfile.personalityTraits || [],
            interests: assessment.psychographicProfile.interests || [],
            values: assessment.psychographicProfile.values || [],
            motivations: assessment.psychographicProfile.motivations || [],
            decisionMakingStyle: assessment.psychographicProfile.decisionMakingStyle || 'analytical',
            trustLevel: assessment.psychographicProfile.trustLevel || 50,
            priceSensitivity: assessment.psychographicProfile.priceSensitivity || 50,
            behavioralLoop: assessment.psychographicProfile.behavioralLoop || BehavioralLoop.Discovery,
            decisionStage: assessment.psychographicProfile.decisionStage || ConsumerDecisionStage.InformationSearch,
            valueOrientation: assessment.psychographicProfile.valueOrientation || ValueOrientation.Practical,
            brandResonance: assessment.psychographicProfile.brandResonance || BrandResonanceStage.Awareness,
            identifiedSignals: assessment.psychographicProfile.identifiedSignals || []
          } : undefined,
          chaseHughesProfile: undefined // Will be filled in later if available
        };
        
        setAssessmentResults(completeAssessment);
        return completeAssessment;
      }
      return null;
    } catch (error) {
      console.error('Error running assessment:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [user, analyzeUser, enhancedProfile, assessmentService]);

  const isGenerating = isProcessing;
  const assessment = assessmentResults;
  
  const generateAssessment = useCallback(async () => {
    return await runAssessment();
  }, [runAssessment]);
  
  const getPriorityInsights = useCallback(() => {
    if (!assessment) return [];
    
    return assessment.insights.filter(insight => 
      insight.severityLevel === 'critical' || insight.severityLevel === 'warning'
    );
  }, [assessment]);
  
  const filterInsightsByCategory = useCallback((category: AssessmentCategory) => {
    if (!assessment) return [];
    
    return assessment.insights.filter(insight => 
      insight.category === category
    );
  }, [assessment]);

  return {
    runAssessment,
    assessmentResults,
    isProcessing,
    assessment,
    isGenerating,
    generateAssessment,
    getPriorityInsights,
    filterInsightsByCategory
  };
};

export default useAssessment;
