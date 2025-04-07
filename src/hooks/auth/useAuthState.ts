
import { useState, useEffect } from "react";
import { AuthUser } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";

export type AuthState = {
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
};

export function useAuthState() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    userRoles: []
  });

  const setIsLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setUser = (user: AuthUser | null) => {
    if (user) {
      const roles = user.role ? [user.role] : ['user'];
      setState(prev => ({ ...prev, user, userRoles: roles }));
    } else {
      setState(prev => ({ ...prev, user: null, userRoles: [], profile: null }));
    }
  };

  const setProfile = (profile: any | null) => {
    setState(prev => ({ ...prev, profile }));
  };

  const refreshProfile = async () => {
    if (!state.user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', state.user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const loadInitialUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          const user: AuthUser = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            username: data.session.user.user_metadata?.username || data.session.user.email?.split('@')[0] || '',
            role: data.session.user.user_metadata?.role || 'user',
            profileImageUrl: data.session.user.user_metadata?.avatar_url,
            app_metadata: data.session.user.app_metadata || {},
            user_metadata: data.session.user.user_metadata || {},
            aud: data.session.user.aud || 'authenticated',
            created_at: data.session.user.created_at || new Date().toISOString(),
          };
          
          setUser(user);
          await refreshProfile();
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialUser();
  }, []);

  return {
    authState: state,
    setIsLoading,
    setUser,
    setProfile,
    refreshProfile
  };
}

export default useAuthState;
