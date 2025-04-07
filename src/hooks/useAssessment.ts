
import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import { useEnhancedBehavioral } from './useEnhancedBehavioral';
import BehavioralAssessmentService from '@/services/assessment/BehavioralAssessmentService';
import { AssessmentResult, AssessmentInsight, AssessmentCategory, AssessmentSeverityLevel } from '@/types/assessment';

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
      
      // Only set if we got valid assessment results
      if (assessment) {
        // Create a correctly typed assessment result object
        const completeAssessment: AssessmentResult = {
          userId: assessment.userId || user.id,
          timestamp: assessment.timestamp || new Date().toISOString(),
          assessmentId: assessment.assessmentId || `assess-${Date.now()}`,
          insightSummary: assessment.insightSummary || 'Behavior analysis completed',
          recommendations: assessment.recommendations || [],
          overallScore: assessment.overallScore || 0,
          insights: (assessment.insights || []).map(insight => {
            // Ensure category is of type AssessmentCategory
            const category: AssessmentCategory = 
              (insight.category as AssessmentCategory) || 'engagement';
            
            // Ensure severityLevel is of type AssessmentSeverityLevel
            const severityLevel: AssessmentSeverityLevel = 
              (insight.severityLevel as AssessmentSeverityLevel) || 'opportunity';
            
            return {
              id: insight.id || `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              category: category,
              title: insight.title || '',
              description: insight.description || '',
              severityLevel: severityLevel,
              impact: insight.impact || 50,
              confidenceScore: insight.confidenceScore || 70,
              recommendedActions: insight.recommendedActions || []
            } as AssessmentInsight;
          }),
          summary: assessment.summary || '',
          strengthAreas: assessment.strengthAreas || [],
          improvementAreas: assessment.improvementAreas || [],
          engagementHealthScore: assessment.engagementHealthScore || 0,
          conversionPotentialScore: assessment.conversionPotentialScore || 0,
          retentionRiskScore: assessment.retentionRiskScore || 0,
          scores: assessment.scores || {
            engagementPotential: 0,
            contentAffinity: 0,
            monetizationPropensity: 0,
            retentionLikelihood: 0
          }
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
    assessment: assessmentResults,
    isGenerating: isProcessing,
    generateAssessment: runAssessment,
    getPriorityInsights,
    filterInsightsByCategory
  };
};

export default useAssessment;
