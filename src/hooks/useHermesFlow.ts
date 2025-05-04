
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { hermes } from '@/core/Hermes';

interface UseHermesFlowOptions {
  trackPageView?: boolean;
  trackEvents?: boolean;
  spatial?: boolean;
}

export const useHermesFlow = (
  flowName: string,
  options: UseHermesFlowOptions = {}
) => {
  const { 
    trackPageView = true,
    trackEvents = true,
    spatial = false
  } = options;
  
  const { user } = useAuth();
  const location = useLocation();
  const userId = user?.id || 'anonymous';
  const [flowId, setFlowId] = useState<string>(`${flowName}-${Date.now()}`);
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  
  // Initialize the flow
  useEffect(() => {
    // Connect to Hermes
    hermes.connect({
      system: flowName,
      connectionId: flowId,
      userId,
      metadata: {
        path: location.pathname,
        flowName,
        timestamp: new Date().toISOString(),
      },
    });
    
    // Track page view if enabled
    if (trackPageView) {
      hermes.trackPageView(userId, location.pathname, document.referrer);
    }
    
    // Track flow start event if events are enabled
    if (trackEvents) {
      hermes.trackEvent(userId, `${flowName}_start`, { flowId });
    }
    
    // Enter spatial flow if spatial is enabled
    if (spatial) {
      hermes.enterSpatialFlow(userId, flowId);
    }
    
    // Cleanup function
    return () => {
      if (trackEvents) {
        hermes.trackEvent(userId, `${flowName}_end`, { 
          flowId, 
          duration: Date.now() - new Date(flowId.split('-')[1]).getTime() 
        });
      }
      
      if (spatial) {
        hermes.exitSpatialFlow(userId);
      }
    };
  }, [flowName, flowId, userId, location.pathname, trackPageView, trackEvents, spatial]);
  
  // Track flow step
  const trackStep = useCallback((stepName: string, stepData?: Record<string, any>) => {
    if (trackEvents) {
      hermes.trackEvent(userId, `${flowName}_step`, { 
        flowId, 
        step: stepName,
        ...stepData 
      });
    }
  }, [flowName, flowId, userId, trackEvents]);
  
  // Update flow metadata
  const updateMetadata = useCallback((newMetadata: Record<string, any>) => {
    setMetadata(prev => ({
      ...prev,
      ...newMetadata
    }));
    
    if (trackEvents) {
      hermes.trackEvent(userId, `${flowName}_metadata_update`, { 
        flowId, 
        ...newMetadata 
      });
    }
  }, [flowName, flowId, userId, trackEvents]);
  
  // Complete the flow
  const completeFlow = useCallback((completionData?: Record<string, any>) => {
    if (trackEvents) {
      hermes.trackEvent(userId, `${flowName}_complete`, { 
        flowId,
        ...completionData,
        ...metadata
      });
    }
    
    return { flowId, metadata: { ...metadata, ...completionData } };
  }, [flowName, flowId, metadata, userId, trackEvents]);
  
  return {
    flowId,
    metadata,
    trackStep,
    updateMetadata,
    completeFlow
  };
};

export default useHermesFlow;
