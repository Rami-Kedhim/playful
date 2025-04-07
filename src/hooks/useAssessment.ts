
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useEnhancedBehavioral } from '@/hooks/useEnhancedBehavioral';
import behavioralAssessmentService from '@/services/assessment/BehavioralAssessmentService';
import { AssessmentResult, AssessmentCategory, AssessmentPreferences } from '@/types/assessment';
import { toast } from '@/hooks/use-toast';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';

/**
 * Hook for using the behavioral assessment service
 */
export function useAssessment() {
  const { user } = useAuth();
  const { enhancedProfile, analyzeUser } = useEnhancedBehavioral();
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [assessmentPreferences, setAssessmentPreferences] = useState<AssessmentPreferences>({
    focusAreas: ['engagement', 'conversion', 'retention', 'monetization', 'trust'],
    insightThreshold: 60,
    autoRunFrequency: 'weekly'
  });
  
  /**
   * Generate a new assessment based on current behavioral data
   */
  const generateAssessment = useCallback(async () => {
    if (!user?.id) {
      toast({
        title: "User not found",
        description: "Please sign in to generate an assessment",
        variant: "destructive",
      });
      return null;
    }
    
    if (!enhancedProfile) {
      // Try to analyze the user first
      await analyzeUser();
      
      if (!enhancedProfile) {
        toast({
          title: "Missing behavioral data",
          description: "Please analyze behavior patterns first",
          variant: "destructive",
        });
        return null;
      }
    }
    
    setIsGenerating(true);
    
    try {
      // Generate assessment using the behavioral assessment service
      const result = behavioralAssessmentService.generateAssessment(user.id, enhancedProfile);
      
      // Connect with Hermes-Oxum neural hub for enhanced insights
      const hermesData = neuralHub.getHealthMetrics();
      
      // Add psychographic profile from enhanced behavioral profile
      result.psychographicProfile = enhancedProfile.psychographicProfile;
      
      // Adjust assessment scores based on neural hub data
      if (hermesData) {
        result.engagementHealthScore = Math.round(
          (result.engagementHealthScore + hermesData.userEngagement * 100) / 2
        );
        
        // Use stability metric to influence retention risk
        const stabilityFactor = 1 - hermesData.stability; // Lower stability = higher risk
        result.retentionRiskScore = Math.round(
          (result.retentionRiskScore + stabilityFactor * 100) / 2
        );
      }
      
      // Filter insights based on preferences
      result.insights = result.insights.filter(insight => 
        assessmentPreferences.focusAreas.includes(insight.category) && 
        insight.confidenceScore >= assessmentPreferences.insightThreshold
      );
      
      setAssessment(result);
      return result;
    } catch (error) {
      console.error('Error generating assessment:', error);
      toast({
        title: "Assessment error",
        description: "Failed to generate behavioral assessment",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [user?.id, enhancedProfile, analyzeUser, assessmentPreferences]);

  // Automatic assessment generation based on preferences
  useEffect(() => {
    if (!assessment && user?.id && assessmentPreferences.autoRunFrequency !== 'never') {
      generateAssessment();
    }
    
    // Set up interval for auto-generation based on frequency preference
    let intervalId: number | null = null;
    
    if (user?.id && assessmentPreferences.autoRunFrequency !== 'never') {
      const frequencyMap = {
        'daily': 24 * 60 * 60 * 1000,
        'weekly': 7 * 24 * 60 * 60 * 1000,
        'monthly': 30 * 24 * 60 * 60 * 1000
      };
      
      const interval = frequencyMap[assessmentPreferences.autoRunFrequency || 'weekly'];
      
      intervalId = window.setInterval(() => {
        generateAssessment();
      }, interval);
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [user?.id, assessment, assessmentPreferences.autoRunFrequency, generateAssessment]);
  
  /**
   * Update assessment preferences
   */
  const updatePreferences = useCallback((newPreferences: Partial<AssessmentPreferences>) => {
    setAssessmentPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  }, []);
  
  /**
   * Filter insights by category
   */
  const filterInsightsByCategory = useCallback((category: AssessmentCategory) => {
    if (!assessment) return [];
    return assessment.insights.filter(insight => insight.category === category);
  }, [assessment]);
  
  /**
   * Filter insights by severity level
   */
  const filterInsightsBySeverity = useCallback((severity: 'critical' | 'warning' | 'opportunity' | 'positive') => {
    if (!assessment) return [];
    return assessment.insights.filter(insight => insight.severityLevel === severity);
  }, [assessment]);
  
  /**
   * Get priority insights (critical and high impact)
   */
  const getPriorityInsights = useCallback(() => {
    if (!assessment) return [];
    
    return assessment.insights
      .filter(insight => insight.severityLevel === 'critical' || insight.impact > 85)
      .sort((a, b) => {
        // Sort by severity first, then by impact
        if (a.severityLevel === 'critical' && b.severityLevel !== 'critical') return -1;
        if (a.severityLevel !== 'critical' && b.severityLevel === 'critical') return 1;
        return b.impact - a.impact;
      })
      .slice(0, 3); // Return top 3 priority insights
  }, [assessment]);
  
  return {
    assessment,
    isGenerating,
    generateAssessment,
    assessmentPreferences,
    updatePreferences,
    filterInsightsByCategory,
    filterInsightsBySeverity,
    getPriorityInsights
  };
}

export default useAssessment;
