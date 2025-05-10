
import { useEffect, useState } from 'react';
import { hermes } from '@/core/Hermes';
import { hermesOxumHub } from '@/core/HermesOxumNeuralHub';

export const useHermesFlow = (userId: string) => {
  const [flowStatus, setFlowStatus] = useState({
    currentFlow: '',
    previousAction: '',
    recommendedAction: '',
    confidence: 0
  });
  
  useEffect(() => {
    if (!userId) return;
    
    // Get recommended next action
    const recommendation = hermes.recommendNextAction(userId);
    
    // Update flow status
    setFlowStatus({
      currentFlow: 'browsing',
      previousAction: 'profile_view',
      recommendedAction: recommendation.action,
      confidence: recommendation.confidence
    });
    
  }, [userId]);
  
  // Track user flow transition between pages
  const trackPageFlow = (source: string, destination: string) => {
    hermes.routeFlow({
      source,
      destination,
      params: { userId, timestamp: new Date().toISOString() }
    });
    
    // Update local flow status
    setFlowStatus(prev => ({
      ...prev,
      currentFlow: destination,
      previousAction: source
    }));
  };
  
  return {
    flowStatus,
    trackPageFlow
  };
};

export default useHermesFlow;
