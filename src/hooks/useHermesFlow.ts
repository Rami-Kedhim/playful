
import { useState, useEffect } from 'react';
import { hermes } from '@/core/Hermes';
import { useAuth } from './auth';

interface HermesFlowResult {
  flowId: string;
  metadata: Record<string, any>;
  trackStep: (stepName: string, stepData?: Record<string, any>) => void;
  updateMetadata: (newMetadata: Record<string, any>) => void;
  completeFlow: (completionData?: Record<string, any>) => { success: boolean; flowId: string };
  getRecommendedAction: (userId: string, context?: Record<string, any>) => Promise<string>;
}

export const useHermesFlow = (flowName: string): HermesFlowResult => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  const [flowId] = useState(`${flowName}-${Date.now()}`);
  const [metadata, setMetadata] = useState<Record<string, any>>({
    flowName,
    startTime: new Date().toISOString(),
    userId
  });

  // Initialize the flow
  useEffect(() => {
    hermes.trackEvent(userId, 'flow_started', {
      flowId,
      flowName,
      timestamp: new Date().toISOString()
    });

    return () => {
      // Cleanup on unmount if flow wasn't completed
      if (!metadata.completed) {
        hermes.trackEvent(userId, 'flow_abandoned', {
          flowId,
          flowName,
          duration: Date.now() - new Date(metadata.startTime).getTime(),
          lastStep: metadata.lastStep
        });
      }
    };
  }, [flowId, flowName, userId]);

  const trackStep = (stepName: string, stepData: Record<string, any> = {}) => {
    const stepMetadata = {
      ...stepData,
      timestamp: new Date().toISOString(),
      flowId,
      flowName
    };
    
    hermes.trackEvent(userId, `flow_step_${stepName}`, stepMetadata);
    
    setMetadata(prev => ({
      ...prev,
      lastStep: stepName,
      [`step_${stepName}`]: stepMetadata
    }));
  };

  const updateMetadata = (newMetadata: Record<string, any>) => {
    setMetadata(prev => ({
      ...prev,
      ...newMetadata
    }));
  };

  const completeFlow = (completionData: Record<string, any> = {}) => {
    const completionMetadata = {
      ...completionData,
      completedAt: new Date().toISOString(),
      duration: Date.now() - new Date(metadata.startTime).getTime()
    };
    
    hermes.trackEvent(userId, 'flow_completed', {
      flowId,
      flowName,
      ...completionMetadata
    });
    
    setMetadata(prev => ({
      ...prev,
      completed: true,
      ...completionMetadata
    }));
    
    return { success: true, flowId };
  };

  const getRecommendedAction = async (userId: string, context?: Record<string, any>): Promise<string> => {
    try {
      return await hermes.getRecommendedAction(userId, context);
    } catch (error) {
      console.error('Error getting recommended action:', error);
      return 'Explore our featured profiles to discover new connections.';
    }
  };

  return {
    flowId,
    metadata,
    trackStep,
    updateMetadata,
    completeFlow,
    getRecommendedAction
  };
};
