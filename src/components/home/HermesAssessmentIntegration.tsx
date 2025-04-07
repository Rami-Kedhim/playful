import { useEffect, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { useHermesMode } from '@/hooks/auth/useHermesMode';
import { useUnifiedBehavioral } from '@/hooks/useUnifiedBehavioral';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';
import hermesOxumIntegration from '@/services/integration/HermesOxumIntegration';
import { toast } from '@/components/ui/use-toast';
import { ChaseHughesBehavioralProfile } from '@/types/chaseHughes';

/**
 * Integration component that connects the Hermes-Oxum neural hub with the assessment system
 * This acts as a background service that runs automatically
 */
export const HermesAssessmentIntegration = () => {
  const { assessment, generateAssessment } = useAssessment();
  const { getCurrentMode, shouldUseEmotionalResponses } = useHermesMode();
  const { analyzeUser, profile: unifiedProfile } = useUnifiedBehavioral();
  const [lastMetricsUpdate, setLastMetricsUpdate] = useState<Date | null>(null);
  const [toastMounted, setToastMounted] = useState(false);
  const [userBehavioralState, setUserBehavioralState] = useState<{
    chaseHughesProfile?: ChaseHughesBehavioralProfile;
    lastInfluencePhase?: string;
    trustScoreTrend?: 'increasing' | 'decreasing' | 'stable';
  }>({});
  
  useEffect(() => {
    setToastMounted(true);
  }, []);

  useEffect(() => {
    hermesOxumIntegration.initialize();
    
    hermesOxumIntegration.addObserver(insights => {
      processInsights(insights);
    });
    
    return () => {
    };
  }, []);
  
  const processInsights = (insights: any) => {
    if (!insights || !insights.chaseHughesProfile) return;
    
    const now = new Date();
    setLastMetricsUpdate(now);
    
    const significantChange = checkForSignificantChange(insights.chaseHughesProfile);
    
    if (significantChange) {
      console.log('Significant behavioral change detected, generating new assessment');
      analyzeUser().then(result => {
        if (result) {
          generateAssessment().then(handleNewAssessment);
        }
      });
    }
  };
  
  const checkForSignificantChange = (profile: ChaseHughesBehavioralProfile): boolean => {
    if (!userBehavioralState.chaseHughesProfile) return true;
    
    if (profile.currentInfluencePhase !== userBehavioralState.lastInfluencePhase) {
      return true;
    }
    
    const previousTrust = userBehavioralState.chaseHughesProfile.trustScore;
    const currentTrust = profile.trustScore;
    if (Math.abs(currentTrust - previousTrust) > 15) {
      return true;
    }
    
    const previousDesire = userBehavioralState.chaseHughesProfile.desireScore;
    const currentDesire = profile.desireScore;
    if (Math.abs(currentDesire - previousDesire) > 20) {
      return true;
    }
    
    return false;
  };
  
  const handleNewAssessment = (result: any) => {
    if (!result) return;
    
    if (result.chaseHughesProfile) {
      const previousTrustScore = userBehavioralState.chaseHughesProfile?.trustScore || 50;
      const currentTrustScore = result.chaseHughesProfile.trustScore;
      
      setUserBehavioralState({
        chaseHughesProfile: result.chaseHughesProfile,
        lastInfluencePhase: result.chaseHughesProfile.currentInfluencePhase,
        trustScoreTrend: 
          currentTrustScore > previousTrustScore + 5 ? 'increasing' :
          currentTrustScore < previousTrustScore - 5 ? 'decreasing' : 'stable'
      });
      
      showRelevantNotification(result.chaseHughesProfile);
    }
  };
  
  const showRelevantNotification = (profile: ChaseHughesBehavioralProfile) => {
    if (!toastMounted) return;
    
    const influencePhase = profile.currentInfluencePhase;
    
    if (influencePhase === 'desire' && profile.desireScore > 70) {
      toast({
        title: "Conversion Opportunity",
        description: "User shows high desire and is ready for conversion messaging",
        variant: "default"
      });
    } else if (influencePhase === 'trust' && profile.trustScore < 50) {
      toast({
        title: "Trust Building Required",
        description: "Focus on building trust before moving to conversion messaging",
        variant: "default"
      });
    } else if (influencePhase === 'interest' && profile.influencePhaseProgress > 90) {
      toast({
        title: "Interest Phase Completing",
        description: "User is ready to transition to trust building techniques",
        variant: "default"
      });
    } else if (influencePhase === 'action') {
      toast({
        title: "Action Phase Detected",
        description: "User is primed for specific calls to action and commitments",
        variant: "default"
      });
    } else if (influencePhase === 'loyalty') {
      toast({
        title: "Loyalty Phase Achieved",
        description: "Focus on reinforcing long-term commitment and advocacy",
        variant: "default"
      });
    }
  };

  useEffect(() => {
    const metricsObserver = (metrics: any) => {
      if (lastMetricsUpdate && (new Date().getTime() - lastMetricsUpdate.getTime() < 30000)) {
        return;
      }
      
      const now = new Date();
      setLastMetricsUpdate(now);
      
      hermesOxumIntegration.processUserInteraction(
        'system',
        'system_update',
        { metrics }
      );
      
      if (!unifiedProfile && toastMounted) {
        analyzeUser();
        generateAssessment().then(handleNewAssessment);
      }
    };
    
    neuralHub.addObserver(metricsObserver);
    
    if (toastMounted && !assessment && !unifiedProfile) {
      analyzeUser();
      generateAssessment().then(handleNewAssessment);
    } else if (assessment?.chaseHughesProfile) {
      setUserBehavioralState({
        chaseHughesProfile: assessment.chaseHughesProfile,
        lastInfluencePhase: assessment.chaseHughesProfile.currentInfluencePhase,
        trustScoreTrend: 'stable'
      });
    }
    
    return () => {
      neuralHub.removeObserver(metricsObserver);
    };
  }, [assessment, generateAssessment, toastMounted, userBehavioralState, lastMetricsUpdate, unifiedProfile, analyzeUser]);

  return null;
};

export default HermesAssessmentIntegration;
