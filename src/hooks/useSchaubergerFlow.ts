
/**
 * useSchaubergerFlow - Custom hook implementing Schauberger's natural flow principles
 * for optimizing AI interactions based on emotional patterns and engagement
 */
import { useState, useEffect, useCallback } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { useHermesInsights } from './useHermesInsights';

export type EmotionalFlow = 'neutral' | 'rising' | 'peaking' | 'receptive' | 'declining';
export type ResourceAllocation = 'minimal' | 'standard' | 'enhanced' | 'maximum';

interface SchaubergerFlowState {
  emotionalFlow: EmotionalFlow;
  vortexStrength: number;
  resourceAllocation: ResourceAllocation;
  systemLoad: number;
  optimalTiming: boolean;
}

interface SchaubergerFlowOptions {
  userId?: string;
  conversationId?: string;
  messageHistory?: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
  }>;
  initialState?: Partial<SchaubergerFlowState>;
}

export const useSchaubergerFlow = (options: SchaubergerFlowOptions = {}) => {
  const { userId, messageHistory = [], initialState = {} } = options;
  const { insights, recordAICompanionInteraction } = useHermesInsights(userId);
  
  // Initialize state with defaults or provided values
  const [flowState, setFlowState] = useState<SchaubergerFlowState>({
    emotionalFlow: initialState.emotionalFlow || 'neutral',
    vortexStrength: initialState.vortexStrength || 0,
    resourceAllocation: initialState.resourceAllocation || 'standard',
    systemLoad: initialState.systemLoad || 0,
    optimalTiming: initialState.optimalTiming || true
  });
  
  // Calculate emotional flow based on message patterns and content
  const calculateEmotionalFlow = useCallback((messages: typeof messageHistory): EmotionalFlow => {
    if (messages.length < 2) return 'neutral';
    
    // Extract user messages
    const userMessages = messages.filter(m => m.role === 'user');
    
    // Basic sentiment analysis (would be more sophisticated in real implementation)
    const avgMessageLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length || 0;
    const hasQuestions = userMessages.some(m => m.content.includes('?'));
    const hasExclamations = userMessages.some(m => m.content.includes('!'));
    const recentMessages = userMessages.slice(-3);
    
    // Check for declining pattern - shorter and shorter messages
    if (recentMessages.length >= 3) {
      const lengths = recentMessages.map(m => m.content.length);
      if (lengths[2] < lengths[1] && lengths[1] < lengths[0] && lengths[2] < 10) {
        return 'declining';
      }
    }
    
    // Determine flow state based on engagement patterns
    if (avgMessageLength > 35 && (hasQuestions && hasExclamations)) {
      return 'peaking';
    } else if (avgMessageLength > 25 || (hasExclamations && userMessages.length > 3)) {
      return 'rising';
    } else if (hasQuestions && avgMessageLength > 15) {
      return 'receptive';
    }
    
    return 'neutral';
  }, []);
  
  // Calculate resource allocation based on Schauberger's implosive logic
  const calculateResourceAllocation = useCallback((
    flow: EmotionalFlow, 
    vortexStrength: number,
    systemLoad: number
  ): ResourceAllocation => {
    // Only allocate higher resources when truly needed (implosive principle)
    if (flow === 'peaking' && vortexStrength > 80 && systemLoad < 70) {
      return 'maximum';
    } else if ((flow === 'peaking' || flow === 'rising') && vortexStrength > 60) {
      return 'enhanced';
    } else if (flow !== 'declining' && vortexStrength > 40) {
      return 'standard';
    }
    
    // Default to minimal resources (save energy, be efficient)
    return 'minimal';
  }, []);
  
  // Determine if the current time is optimal for intensive processing
  // Fixed to not use private calculateTimeImpact method
  const calculateOptimalTiming = useCallback((): boolean => {
    // Get current time metrics
    const currentHour = new Date().getHours();
    
    // Simple time-based heuristic (peak hours 9-11 AM and 7-10 PM)
    const isPeakMorning = currentHour >= 9 && currentHour <= 11;
    const isPeakEvening = currentHour >= 19 && currentHour <= 22;
    
    // Get health metrics from neural hub
    const healthMetrics = neuralHub.getHealthMetrics();
    
    // Consider time and system health
    return (isPeakMorning || isPeakEvening) && healthMetrics.stability > 0.7;
  }, []);
  
  // Update the flow state when messages or system conditions change
  useEffect(() => {
    if (messageHistory.length === 0) return;
    
    // Get system health metrics from neural hub
    const healthMetrics = neuralHub.getHealthMetrics();
    const systemLoad = healthMetrics.load * 100;
    
    // Calculate emotional flow
    const flow = calculateEmotionalFlow(messageHistory);
    
    // Calculate vortex strength (natural flow energy)
    const baseStrength = flow === 'neutral' ? 30 : 
                         flow === 'rising' ? 60 :
                         flow === 'peaking' ? 90 :
                         flow === 'receptive' ? 70 : 20;
                         
    const userEngagement = healthMetrics.userEngagement * 100;
    const vortexStrength = Math.min((baseStrength + userEngagement) / 2, 100);
    
    // Determine resource allocation
    const resourceAllocation = calculateResourceAllocation(flow, vortexStrength, systemLoad);
    
    // Check timing
    const optimalTiming = calculateOptimalTiming();
    
    // Update state with all calculated values
    setFlowState({
      emotionalFlow: flow,
      vortexStrength,
      resourceAllocation,
      systemLoad,
      optimalTiming
    });
    
    // Record flow in HERMES system if userId provided
    if (userId) {
      recordAICompanionInteraction('schauberger', messageHistory.length, {
        emotionalFlow: flow,
        vortexStrength,
        resourceAllocation
      });
    }
  }, [
    messageHistory, 
    userId, 
    calculateEmotionalFlow, 
    calculateResourceAllocation, 
    calculateOptimalTiming, 
    recordAICompanionInteraction
  ]);
  
  /**
   * Applies Schauberger's principles to decide what level of response is appropriate
   * Uses implosive logic - only use what's needed, when it's needed
   */
  const getShouldActivate = useCallback((feature: 'voice' | 'images' | 'cards' | 'advanced'): boolean => {
    const { emotionalFlow, vortexStrength, resourceAllocation, optimalTiming } = flowState;
    
    // Apply implosive logic - only activate when truly beneficial
    switch (feature) {
      case 'voice':
        // Voice requires high engagement and optimal timing
        return (resourceAllocation === 'enhanced' || resourceAllocation === 'maximum') && optimalTiming;
        
      case 'images':
        // Images require at least standard resources
        return resourceAllocation !== 'minimal' && vortexStrength > 50;
        
      case 'cards':
        // Interactive cards can be used more liberally
        return vortexStrength > 40;
        
      case 'advanced':
        // Advanced features only when peaking and resources available
        return emotionalFlow === 'peaking' && resourceAllocation === 'maximum';
        
      default:
        return false;
    }
  }, [flowState]);
  
  return {
    ...flowState,
    getShouldActivate,
    // Helper methods for output enhancement
    shouldUseVoice: () => getShouldActivate('voice'),
    shouldUseImages: () => getShouldActivate('images'),
    shouldUseCards: () => getShouldActivate('cards'),
    shouldUseAdvancedFeatures: () => getShouldActivate('advanced')
  };
};

export default useSchaubergerFlow;
