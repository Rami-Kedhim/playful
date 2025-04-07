import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useEnhancedBehavioral } from '@/hooks/useEnhancedBehavioral';
import behavioralAssessmentService from '@/services/assessment/BehavioralAssessmentService';
import { AssessmentResult, AssessmentCategory, AssessmentPreferences } from '@/types/assessment';
import { toast } from '@/components/ui/use-toast';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';
import chaseHughesAnalyzer from '@/services/behavioral/ChaseHughesBehavioralAnalyzer';

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
    autoRunFrequency: 'weekly',
    includeChaseHughesAnalysis: true
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
      
      // Apply Chase Hughes behavioral analysis if enabled in preferences
      if (assessmentPreferences.includeChaseHughesAnalysis) {
        // Mock interaction data for Chase Hughes analysis
        const chaseHughesProfile = chaseHughesAnalyzer.createBehavioralProfile({
          messageHistory: [
            { content: "Hello, I'm interested in learning more", isUser: true },
            { content: "What services do you offer?", isUser: true }
          ],
          interactionHistory: {
            clickPatterns: [
              { element: 'pricing-page', timeViewing: 45 },
              { element: 'testimonials', timeViewing: 30 }
            ],
            pageViews: [
              { page: '/home', timeSpent: 120 },
              { page: '/services', timeSpent: 180 },
              { page: '/testimonials', timeSpent: 90 }
            ],
            responseDelays: [2.5, 3.1, 1.8]
          },
          contentPreferences: enhancedProfile.psychographicProfile.engagementPatterns.contentPreferences
        });
        
        // Add Chase Hughes profile to assessment result
        result.chaseHughesProfile = chaseHughesProfile;
        
        // Use Chase Hughes insights to refine other scores
        result.conversionPotentialScore = Math.round(
          (result.conversionPotentialScore + chaseHughesProfile.desireScore) / 2
        );
        
        result.engagementHealthScore = Math.round(
          (result.engagementHealthScore + chaseHughesProfile.engagementScore) / 2
        );
        
        // Add Chase Hughes specific insights
        if (chaseHughesProfile.currentInfluencePhase === 'desire' && 
            chaseHughesProfile.influencePhaseProgress > 75) {
          result.insights.push({
            id: `ch-conversion-${Date.now()}`,
            category: 'conversion',
            title: 'High Conversion Potential Detected',
            description: `User is in the desire phase with ${chaseHughesProfile.influencePhaseProgress}% progress. Ready for conversion-focused messaging using ${chaseHughesProfile.suggestedApproach.technique} technique.`,
            severityLevel: 'opportunity',
            impact: 85,
            confidenceScore: chaseHughesProfile.desireScore,
            recommendedActions: [
              `Use ${chaseHughesProfile.primarySensoryPreference} language patterns in offers`,
              `Apply the "${chaseHughesProfile.suggestedApproach.languagePattern}" pattern`,
              'Present limited-time offer with scarcity framing'
            ]
          });
        }
        
        if (chaseHughesProfile.trustScore < 60) {
          result.insights.push({
            id: `ch-trust-${Date.now()}`,
            category: 'trust',
            title: 'Trust Building Required',
            description: `Current trust score is ${chaseHughesProfile.trustScore}%. Need to establish stronger trust before advancing to conversion.`,
            severityLevel: 'warning',
            impact: 80,
            confidenceScore: 85,
            recommendedActions: [
              'Increase social proof elements',
              'Use interrogation encapsulation technique',
              'Address objections before they arise'
            ]
          });
        }
      }
      
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
  
  /**
   * Get influence phase insights from Chase Hughes analysis
   */
  const getInfluencePhaseInsights = useCallback(() => {
    if (!assessment?.chaseHughesProfile) return null;
    
    const { currentInfluencePhase, influencePhaseProgress, suggestedApproach } = assessment.chaseHughesProfile;
    
    return {
      phase: currentInfluencePhase,
      progress: influencePhaseProgress,
      suggestedTechnique: suggestedApproach.technique,
      suggestedLanguage: suggestedApproach.languagePattern
    };
  }, [assessment]);
  
  return {
    assessment,
    isGenerating,
    generateAssessment,
    assessmentPreferences,
    updatePreferences,
    filterInsightsByCategory,
    filterInsightsBySeverity,
    getPriorityInsights,
    getInfluencePhaseInsights
  };
}

export default useAssessment;
