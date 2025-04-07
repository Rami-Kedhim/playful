
import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import { useEnhancedBehavioral } from './useEnhancedBehavioral';
import { BehavioralAssessmentService } from '@/services/assessment/BehavioralAssessmentService';

interface AssessmentScores {
  engagementPotential: number;
  contentAffinity: number;
  monetizationPropensity: number;
  retentionLikelihood: number;
}

interface AssessmentResult {
  assessmentId: string;
  userId: string;
  timestamp: string;
  scores: AssessmentScores;
  recommendations: string[];
  insightSummary: string;
  chaseHughesProfile?: any;
}

export const useAssessment = () => {
  const { user } = useAuth();
  const { analyzeUser, enhancedProfile } = useEnhancedBehavioral();
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const assessmentService = new BehavioralAssessmentService();
  
  // Run the main assessment process
  const runAssessment = useCallback(async () => {
    if (!user) return null;
    
    setIsProcessing(true);
    try {
      // First, get the enhanced behavioral profile
      await analyzeUser();
      
      // Generate an assessment based on the enhanced profile
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

  // Additional methods
  const assessment = assessmentResults;
  const isGenerating = isProcessing;
  
  const generateAssessment = useCallback(async () => {
    return await runAssessment();
  }, [runAssessment]);
  
  const getPriorityInsights = useCallback(() => {
    if (!assessment) return [];
    
    return assessmentService.getPriorityInsights(enhancedProfile);
  }, [assessment, assessmentService, enhancedProfile]);
  
  const filterInsightsByCategory = useCallback((category: string) => {
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
