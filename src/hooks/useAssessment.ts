
import { useState, useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { useEnhancedBehavioral } from './useEnhancedBehavioral';
import { ChaseHughesBehavioralProfile } from '@/types/chaseHughes';

interface AssessmentResult {
  assessmentId: string;
  userId: string;
  timestamp: string;
  scores: {
    engagementPotential: number;
    contentAffinity: number;
    monetizationPropensity: number;
    retentionLikelihood: number;
  };
  recommendations: string[];
  insightSummary: string;
  chaseHughesProfile?: ChaseHughesBehavioralProfile;
}

export const useAssessment = () => {
  const { user } = useAuth();
  const { analyzeUser } = useEnhancedBehavioral();
  
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Added assessment and isGenerating to match what components expect
  const [assessment, setAssessment] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const runAssessment = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }
    
    try {
      setIsProcessing(true);
      setError(null);
      
      // Generate mock assessment
      const result: AssessmentResult = {
        assessmentId: `assess-${Date.now()}`,
        userId: user.id,
        timestamp: new Date().toISOString(),
        scores: {
          engagementPotential: Math.random() * 100,
          contentAffinity: Math.random() * 100,
          monetizationPropensity: Math.random() * 100,
          retentionLikelihood: Math.random() * 100
        },
        recommendations: [
          'Personalize content recommendations',
          'Increase engagement through interactive elements',
          'Target promotional content during peak usage times'
        ],
        insightSummary: 'User shows moderate engagement potential with higher affinity for visual content.'
      };
      
      setAssessmentResults(result);
      setAssessment(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to run assessment');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [user]);
  
  // Add the missing methods expected by components
  const generateAssessment = useCallback(async () => {
    setIsGenerating(true);
    const result = await runAssessment();
    setIsGenerating(false);
    return result;
  }, [runAssessment]);
  
  const getPriorityInsights = useCallback(() => {
    if (!assessment) return [];
    
    return assessment.recommendations || [];
  }, [assessment]);
  
  const filterInsightsByCategory = useCallback((category: string) => {
    if (!assessment) return [];
    
    // Mock filtering based on category
    return assessment.recommendations?.filter((rec: string) => 
      rec.toLowerCase().includes(category.toLowerCase())
    ) || [];
  }, [assessment]);
  
  return {
    runAssessment,
    assessmentResults,
    isProcessing,
    error,
    // Add properties used by components
    assessment,
    isGenerating,
    generateAssessment,
    getPriorityInsights,
    filterInsightsByCategory
  };
};

export default useAssessment;
