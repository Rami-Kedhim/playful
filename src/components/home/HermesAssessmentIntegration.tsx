
import { useEffect, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { useHermesMode } from '@/hooks/auth/useHermesMode';
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
  const [lastMetricsUpdate, setLastMetricsUpdate] = useState<Date | null>(null);
  const [toastMounted, setToastMounted] = useState(false);
  const [userBehavioralState, setUserBehavioralState] = useState<{
    chaseHughesProfile?: ChaseHughesBehavioralProfile;
    lastInfluencePhase?: string;
    trustScoreTrend?: 'increasing' | 'decreasing' | 'stable';
  }>({});
  
  // Set toast as mounted after component mounts
  useEffect(() => {
    setToastMounted(true);
  }, []);

  // Initialize HERMES-OXUM Integration
  useEffect(() => {
    hermesOxumIntegration.initialize();
    
    // Register observer to receive insights
    hermesOxumIntegration.addObserver(insights => {
      processInsights(insights);
    });
    
    // Cleanup on unmount
    return () => {
      // Cannot remove observer because we don't have reference to the callback
      // This is acceptable for this component since it's meant to run for the entire session
    };
  }, []);
  
  // Process insights from the HERMES-OXUM integration
  const processInsights = (insights: any) => {
    // Skip if no insights or profile
    if (!insights || !insights.chaseHughesProfile) return;
    
    const now = new Date();
    setLastMetricsUpdate(now);
    
    const significantChange = checkForSignificantChange(insights.chaseHughesProfile);
    
    if (significantChange) {
      console.log('Significant behavioral change detected, generating new assessment');
      generateAssessment().then(handleNewAssessment);
    }
  };
  
  // Check for significant changes in behavioral state
  const checkForSignificantChange = (profile: ChaseHughesBehavioralProfile): boolean => {
    if (!userBehavioralState.chaseHughesProfile) return true;
    
    // Check for phase change
    if (profile.currentInfluencePhase !== userBehavioralState.lastInfluencePhase) {
      return true;
    }
    
    // Check for significant trust change
    const previousTrust = userBehavioralState.chaseHughesProfile.trustScore;
    const currentTrust = profile.trustScore;
    if (Math.abs(currentTrust - previousTrust) > 15) {
      return true;
    }
    
    // Check for significant desire change
    const previousDesire = userBehavioralState.chaseHughesProfile.desireScore;
    const currentDesire = profile.desireScore;
    if (Math.abs(currentDesire - previousDesire) > 20) {
      return true;
    }
    
    return false;
  };
  
  // Handle new assessment generation
  const handleNewAssessment = (result: any) => {
    if (!result) return;
    
    // Update tracking of behavioral state
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
      
      // Show relevant toast notification based on current state
      showRelevantNotification(result.chaseHughesProfile);
    }
  };
  
  // Show a relevant notification based on the user's profile
  const showRelevantNotification = (profile: ChaseHughesBehavioralProfile) => {
    if (!toastMounted) return;
    
    const influencePhase = profile.currentInfluencePhase;
    
    // Customize notification based on influence phase
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
  
  // Monitor neural hub metrics and connect to assessment
  useEffect(() => {
    // Observer function to receive neural hub health metric updates
    const metricsObserver = (metrics: any) => {
      // Skip if we updated too recently (avoid spam)
      if (lastMetricsUpdate && (new Date().getTime() - lastMetricsUpdate.getTime() < 30000)) {
        return;
      }
      
      const now = new Date();
      setLastMetricsUpdate(now);
      
      // Process neural hub metrics through our integration
      hermesOxumIntegration.processUserInteraction(
        'system', // Use system as userId for general metrics
        'system_update',
        { metrics }
      );
      
      // If this is our first assessment, generate one
      if (!assessment && toastMounted) {
        generateAssessment().then(handleNewAssessment);
      }
    };
    
    // Register the observer with the neural hub
    neuralHub.addObserver(metricsObserver);
    
    // Generate initial assessment if needed, but wait until toast is mounted
    if (toastMounted && !assessment) {
      generateAssessment().then(handleNewAssessment);
    } else if (assessment?.chaseHughesProfile) {
      // Initialize behavioral state tracking
      setUserBehavioralState({
        chaseHughesProfile: assessment.chaseHughesProfile,
        lastInfluencePhase: assessment.chaseHughesProfile.currentInfluencePhase,
        trustScoreTrend: 'stable'
      });
    }
    
    // Cleanup: remove the observer when the component unmounts
    return () => {
      neuralHub.removeObserver(metricsObserver);
    };
  }, [assessment, generateAssessment, toastMounted, userBehavioralState, lastMetricsUpdate]);

  // This component doesn't render anything visible - it's a background service
  return null;
};

export default HermesAssessmentIntegration;
