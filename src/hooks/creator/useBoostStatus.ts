import { useBoostStatus as useBaseBoostStatus } from '../boost/useBoostStatus';

// Re-export the hook with any creator-specific enhancements
export const useCreatorBoostStatus = (profileId?: string) => {
  const baseHook = useBaseBoostStatus(profileId);
  
  // Add any creator-specific logic here
  
  return {
    ...baseHook,
    // Add any creator-specific properties or methods here
  };
};

export default useCreatorBoostStatus;
