
import { useEffect, useState } from 'react';
import { brainHubConnection } from '@/services/BrainHubConnectionService';

/**
 * Hook for connecting components to the Brain Hub and managing synchronization
 * @param componentId Unique identifier for the component
 * @param initialData Initial data to register with the Brain Hub
 */
export const useBrainHub = (componentId: string, initialData?: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(initialData || {});

  // Connect component to Brain Hub on mount
  useEffect(() => {
    const success = brainHubConnection.connectComponent(componentId);
    setIsConnected(success);
    
    // Disconnect on unmount
    return () => {
      brainHubConnection.disconnectComponent(componentId);
      setIsConnected(false);
    };
  }, [componentId]);

  /**
   * Synchronize data with another component via the Brain Hub
   * @param targetComponentId Target component ID
   * @param syncData Data to synchronize
   */
  const syncWith = (targetComponentId: string, syncData: any) => {
    if (!isConnected) {
      console.warn(`Component ${componentId} is not connected to Brain Hub`);
      return false;
    }
    
    // Update local state
    setData(prevData => ({ ...prevData, ...syncData }));
    
    // Synchronize with target component
    return brainHubConnection.synchronizeComponents(
      componentId,
      targetComponentId,
      syncData
    );
  };

  /**
   * Get list of all components connected to Brain Hub
   */
  const getConnectedComponents = () => {
    return brainHubConnection.getConnectedComponents();
  };

  return {
    isConnected,
    data,
    setData,
    syncWith,
    getConnectedComponents
  };
};

export default useBrainHub;
