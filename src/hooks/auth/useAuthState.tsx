
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserProfile } from '@/types/auth';
import { getUserRoles } from '@/utils/authStateUtils';

export type AuthState = {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  userRoles: string[];
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    userRoles: []
  });

  // Function to set the loading state
  const setIsLoading = (loading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading: loading }));
  };

  // Function to set the user state
  const setUser = (user: AuthUser | null) => {
    setAuthState(prev => ({ ...prev, user }));
    
    // Update roles when user changes
    if (user) {
      const roles = getUserRoles(user);
      setAuthState(prev => ({ ...prev, user, userRoles: roles }));
    } else {
      setAuthState(prev => ({ ...prev, user: null, userRoles: [], profile: null }));
    }
  };

  // Function to set the profile state
  const setProfile = (profile: UserProfile | null) => {
    setAuthState(prev => ({ ...prev, profile }));
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
        setProfile(data);
      }
      
      // Fetch roles for the user
      const roles = getUserRoles(authState.user);
      setAuthState(prev => ({ ...prev, userRoles: roles }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  return { 
    authState, 
    setIsLoading, 
    setUser, 
    setProfile, 
    refreshProfile 
  };
};
