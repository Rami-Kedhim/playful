
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserProfile } from '@/types/auth';
import { getUserRoles } from '@/utils/authStateUtils';

export const useAuthState = () => {
  const [authState, setAuthState] = useState<{
    user: AuthUser | null;
    profile: UserProfile | null;
    isLoading: boolean;
    userRoles: string[];
  }>({
    user: null,
    profile: null,
    isLoading: true,
    userRoles: []
  });

  // Function to set the loading state
  const setIsLoading = (loading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading: loading }));
  };

  // Function to refresh profile data
  const refreshProfile = async () => {
    if (!authState.user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authState.user.id)
        .single();
      
      if (error) throw error;
      
      // Update profile in state
      if (data) {
        setAuthState(prev => ({ ...prev, profile: data }));
      }
      
      // Fetch roles for the user
      const roles = getUserRoles(authState.user);
      setAuthState(prev => ({ ...prev, userRoles: roles }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  return [authState, setIsLoading, refreshProfile] as const;
};
