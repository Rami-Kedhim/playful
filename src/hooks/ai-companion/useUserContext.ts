
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';

export const useUserContext = () => {
  const { user } = useAuth();
  const [userContext, setUserContext] = useState<string>('');

  useEffect(() => {
    // Generate context about the user that can be used by the AI
    if (user) {
      const displayName = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User';
      
      let context = `The user's name is ${displayName}. `;
      
      if (user.email) {
        context += `Their email is ${user.email}. `;
      }
      
      // Add more user context if available
      if (user.user_metadata) {
        if (user.user_metadata.preferences) {
          context += `Their preferences include: ${JSON.stringify(user.user_metadata.preferences)}. `;
        }
      }
      
      setUserContext(context);
    } else {
      setUserContext('This is an anonymous user.');
    }
  }, [user]);

  // Return an object with a function to get the user context
  return {
    getUserContext: () => userContext
  };
};
