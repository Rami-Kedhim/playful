
import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import { useEnhancedBehavioral } from './useEnhancedBehavioral';
import BehavioralAssessmentService from '@/services/assessment/BehavioralAssessmentService';
import { AssessmentResult, AssessmentInsight, AssessmentCategory, AssessmentSeverityLevel } from '@/types/enhancedBehavioral';

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
        // Fix: Use functional state update to ensure type compliance
        setAssessmentResults(() => assessment);
      }
      return assessment;
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
