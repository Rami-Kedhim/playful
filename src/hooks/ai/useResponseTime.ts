
import { useCallback } from 'react';
import { AIProfile } from '@/types/ai-profile';

export const useResponseTime = () => {
  const calculateResponseTime = useCallback((messageLength: number, aiProfile: AIProfile | null) => {
    if (!aiProfile) return 3000;
    
    const baseTime = aiProfile.delayed_response_min || 2000;
    const variableTime = (aiProfile.delayed_response_max || 5000) - baseTime;
    
    const lengthFactor = Math.min(1, messageLength / 300);
    let personalityFactor = 0.5;
    
    if (aiProfile.personality) {
      switch (aiProfile.personality.type) {
        case 'flirty': personalityFactor = 0.7; break;
        case 'shy': personalityFactor = 0.9; break;
        case 'dominant': personalityFactor = 0.4; break;
        case 'playful': personalityFactor = 0.6; break;
        case 'professional': personalityFactor = 0.5; break;
      }
    }
    
    return baseTime + (variableTime * lengthFactor * personalityFactor);
  }, []);

  return { calculateResponseTime };
};
