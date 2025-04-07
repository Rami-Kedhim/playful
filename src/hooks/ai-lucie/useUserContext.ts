
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';

export const useUserContext = () => {
  const { user } = useAuth();
  const [userContext, setUserContext] = useState<string>('');

  useEffect(() => {
    if (user) {
      const displayName = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User';
      
      let context = `The user's name is ${displayName}. `;
      
      if (user.email) {
        context += `Their email is ${user.email}. `;
      }
      
      setUserContext(context);
    } else {
      setUserContext('This is an anonymous user.');
    }
  }, [user]);

  return userContext;
};
