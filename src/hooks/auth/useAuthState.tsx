
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserProfile } from '@/types/auth';
import { getUserRoles } from '@/utils/authStateUtils';

export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  // Function to refresh profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      if (data) setProfile(data);
      
      // Fetch roles for the user
      const roles = getUserRoles(user);
      setUserRoles(roles);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  return [{ user, profile, isLoading, userRoles }, setIsLoading, refreshProfile] as const;
};
