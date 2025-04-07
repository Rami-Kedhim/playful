import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import { useEnhancedBehavioral } from './useEnhancedBehavioral';
import { BehaviorAssessment } from '@/services/assessment/BehavioralAssessmentService';
import { AssessmentResult, AssessmentInsight, AssessmentCategory } from '@/types/assessment';

export const useAssessment = () => {
  const { user } = useAuth();
  const { analyzeUser, enhancedProfile } = useEnhancedBehavioral();
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const assessmentService = new BehaviorAssessment();
  
  const runAssessment = useCallback(async () => {
    if (!user) return null;
    
    setIsProcessing(true);
    try {
      await analyzeUser();
      
      const assessment = assessmentService.generateAssessment(enhancedProfile);
      
      setAssessmentResults(assessment);
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
    
    return assessmentService.getPriorityInsights(enhancedProfile);
  }, [assessment, assessmentService, enhancedProfile]);
  
  const filterInsightsByCategory = useCallback((category: AssessmentCategory) => {
    if (!assessment) return [];
    
    return assessmentService.getInsightsByCategory(enhancedProfile, category);
  }, [assessment, assessmentService, enhancedProfile]);

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
