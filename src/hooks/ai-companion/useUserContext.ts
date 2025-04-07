
import { useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { UserContext } from './types';

export function useUserContext() {
  const { user } = useAuth();
  
  // Build user context based on authenticated user info
  const getUserContext = useCallback((): UserContext => {
    if (!user) return {};
    
    // In a real app, you would fetch relationship status and interaction history
    return {
      name: user.username,
      interests: user.user_metadata?.interests || [],
      relationshipStatus: "friendly", // This would come from a database
      recentInteractions: "You discussed art and travel destinations recently" // This would be derived from chat history
    };
  }, [user]);

  return { getUserContext };
}
