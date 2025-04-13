
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useAI } from '@/contexts/AIContext';

/**
 * Custom hook that combines auth and AI contexts for easier access
 * to user preferences and AI interaction data
 */
export const useUserAIContext = () => {
  const auth = useAuth();
  const ai = useAI();
  
  // Check if user has interacted with a specific companion
  const hasInteractedWith = (companionId: string): boolean => {
    if (!auth.isAuthenticated) return false;
    
    return ai.recentInteractions.some(
      interaction => interaction.companionId === companionId
    );
  };
  
  // Get interaction count with a specific companion
  const getInteractionCount = (companionId: string): number => {
    if (!auth.isAuthenticated) return 0;
    
    const interaction = ai.recentInteractions.find(
      interaction => interaction.companionId === companionId
    );
    
    return interaction?.messageCount || 0;
  };
  
  // Check if the user has AI features enabled (could be based on subscription, etc.)
  const hasAIFeatures = (): boolean => {
    return auth.isAuthenticated && 
      (!auth.profile?.subscription_tier || 
       ['standard', 'premium'].includes(String(auth.profile?.subscription_tier)));
  };
  
  return {
    // Auth context
    ...auth,
    
    // AI context
    ...ai,
    
    // Combined helper functions
    hasInteractedWith,
    getInteractionCount,
    hasAIFeatures,
    
    // Current user and companion info
    currentUser: auth.user,
    currentCompanion: ai.currentCompanion,
  };
};

export default useUserAIContext;
