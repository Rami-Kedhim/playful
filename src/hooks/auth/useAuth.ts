
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock user data
    setUser({
      id: 'user-123',
      email: 'user@example.com',
      displayName: 'Demo User'
    });
    
    setProfile({
      id: 'profile-123',
      subscription_tier: 'standard'
    });
    
    setIsLoading(false);
  }, []);
  
  return {
    user,
    profile,
    isLoading
  };
};
