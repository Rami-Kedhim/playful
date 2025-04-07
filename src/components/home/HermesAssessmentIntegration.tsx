
import { useEffect, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { useHermesMode } from '@/hooks/auth/useHermesMode';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';
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

  // Connect to neural hub metrics updates
  useEffect(() => {
    // Observer function to receive neural hub health metric updates
    const metricsObserver = (metrics: any) => {
      console.log('HermesOxum metrics updated:', metrics);
      
      // Track last update time
      const now = new Date();
      setLastMetricsUpdate(now);
      
      // If the system detects significant changes, trigger a new assessment
      // Using Chase Hughes principles for defining "significant"
      
      const significantMetricsChange = metrics.stability < 0.6 || metrics.userEngagement < 0.5;
      
      // Check for change in behavioral state if we have assessment data
      const significantBehavioralChange = assessment?.chaseHughesProfile && (
        // Phase change
        assessment.chaseHughesProfile.currentInfluencePhase !== userBehavioralState.lastInfluencePhase ||
        // Sudden trust drop
        (assessment.chaseHughesProfile.trustScore < 50 && userBehavioralState.trustScoreTrend === 'decreasing')
      );
      
      if (significantMetricsChange || significantBehavioralChange) {
        console.log('Significant change detected, generating new assessment');
        generateAssessment().then(result => {
          if (result) {
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
            }
            
            // Show a toast notification tailored to the current situation if toast is mounted
            if (toastMounted && result.chaseHughesProfile) {
              const influencePhase = result.chaseHughesProfile.currentInfluencePhase;
              
              // Customize notification based on influence phase
              if (influencePhase === 'desire' && result.chaseHughesProfile.desireScore > 70) {
                toast({
                  title: "Conversion Opportunity",
                  description: "User shows high desire and is ready for conversion messaging",
                  variant: "default"
                });
              } else if (influencePhase === 'trust' && result.chaseHughesProfile.trustScore < 50) {
                toast({
                  title: "Trust Building Required",
                  description: "Focus on building trust before moving to conversion messaging",
                  variant: "default"
                });
              } else {
                toast({
                  title: "New Assessment Available",
                  description: `The system has detected changes in ${influencePhase} phase behavior patterns`,
                  variant: "default"
                });
              }
            } else if (toastMounted) {
              toast({
                title: "New Assessment Available",
                description: "The system has detected significant changes in behavior patterns",
                variant: "default"
              });
            }
          }
        });
      }
    };
    
    // Register the observer with the neural hub
    neuralHub.addObserver(metricsObserver);
    
    // Generate initial assessment if needed, but wait until toast is mounted
    if (toastMounted && !assessment) {
      generateAssessment();
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
  }, [assessment, generateAssessment, toastMounted, userBehavioralState]);

  // This component doesn't render anything visible - it's a background service
  return null;
};

export default HermesAssessmentIntegration;
