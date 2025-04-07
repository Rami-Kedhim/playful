
import { useState, useEffect } from 'react';
import { Escort } from '@/types/escort';
import { useEscorts } from '@/hooks/useEscorts';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import { useAuth } from '@/hooks/auth';

interface UseEscortWithInsightsOptions {
  initialData?: Escort[];
}

export const useEscortWithInsights = (options: UseEscortWithInsightsOptions = {}) => {
  const { user } = useAuth();
  const { escorts, loading, error, fetchEscorts } = useEscorts(options);
  const [enhancedEscorts, setEnhancedEscorts] = useState<Escort[]>([]);

  // Connect to HERMES behavioral insights
  const { 
    insights, 
    recordElementInteraction,
    shouldEnableFeature,
    reportUserAction,
    recordBoostRequest 
  } = useHermesInsights(user?.id);
  
  // Apply insights-based modifications to the escort list
  useEffect(() => {
    if (!escorts) return;

    let modifiedEscorts = [...escorts];
    
    // Apply behavioral insights to enhance results
    if (insights && insights.emotionalPhase?.phase) {
      // Boost escorts based on user's emotional phase
      switch(insights.emotionalPhase.phase) {
        case 'interest':
          // Sort by highest rated if in interest phase
          modifiedEscorts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'desire':
          // Prioritize escorts with matching content types to user preferences
          if (insights.sensoryPreferences?.primary) {
            const preference = insights.sensoryPreferences.primary;
            modifiedEscorts = modifiedEscorts.map(escort => ({
              ...escort,
              featured: escort.tags?.includes(preference) ? true : escort.featured
            }));
          }
          break;
        default:
          // No additional modification
          break;
      }
    }
    
    setEnhancedEscorts(modifiedEscorts);
  }, [escorts, insights]);

  // Record view for analytics
  const recordEscortView = (escortId: string) => {
    if (user?.id) {
      recordElementInteraction('escort-view', 'view', { 
        escortId: escortId  // Changed from escort_id to escortId to match the expected format
      });
    }
  };

  // Record interaction for analytics
  const recordEscortInteraction = (escortId: string, type: string) => {
    if (user?.id) {
      recordElementInteraction(`escort-${type}`, type, { 
        escortId: escortId  // Changed from escort_id to escortId to match the expected format
      });
      reportUserAction(`viewed_escort_${type}`, { 
        interactionData: { escortId: escortId }  // Moved to interactionData property
      });
    }
  };

  return {
    escorts: enhancedEscorts,
    loading,
    error,
    fetchEscorts,
    recordEscortView,
    recordEscortInteraction,
    insights
  };
};

export default useEscortWithInsights;
