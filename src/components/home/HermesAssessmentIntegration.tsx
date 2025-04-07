
import { useEffect } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { useHermesMode } from '@/hooks/auth/useHermesMode';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';
import { toast } from '@/components/ui/use-toast';

/**
 * Integration component that connects the Hermes-Oxum neural hub with the assessment system
 * This acts as a background service that runs automatically
 */
export const HermesAssessmentIntegration = () => {
  const { assessment, generateAssessment } = useAssessment();
  const { getCurrentMode, shouldUseEmotionalResponses } = useHermesMode();

  // Connect to neural hub metrics updates
  useEffect(() => {
    // Observer function to receive neural hub health metric updates
    const metricsObserver = (metrics: any) => {
      console.log('HermesOxum metrics updated:', metrics);
      
      // If the system detects significant changes, trigger a new assessment
      const significantChange = metrics.stability < 0.6 || metrics.userEngagement < 0.5;
      
      if (significantChange) {
        console.log('Significant change detected, generating new assessment');
        generateAssessment().then(result => {
          if (result) {
            toast({
              title: "New Assessment Available",
              description: "The system has detected significant changes in behavior patterns",
              variant: "default"
            });
          }
        });
      }
    };
    
    // Register the observer with the neural hub
    neuralHub.addObserver(metricsObserver);
    
    // Generate initial assessment if needed
    if (!assessment) {
      generateAssessment();
    }
    
    // Cleanup: remove the observer when the component unmounts
    return () => {
      neuralHub.removeObserver(metricsObserver);
    };
  }, [assessment, generateAssessment]);

  // This component doesn't render anything visible - it's a background service
  return null;
};

export default HermesAssessmentIntegration;
