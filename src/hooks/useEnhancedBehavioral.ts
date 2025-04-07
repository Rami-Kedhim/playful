
import { useState } from 'react';
import { useBehavioralProfile } from '@/hooks/auth';

export const useEnhancedBehavioral = () => {
  const { profile } = useBehavioralProfile();
  const [enhancedProfile, setEnhancedProfile] = useState({});

  return {
    enhancedProfile,
    setEnhancedProfile,
    original: profile
  };
};

export default useEnhancedBehavioral;
