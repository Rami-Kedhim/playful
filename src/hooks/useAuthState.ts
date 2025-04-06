
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "./useProfile";
import { AuthState, AuthUser } from "@/types/auth";

export const useAuthState = (): [
  AuthState,
  (loading: boolean) => void,
  () => Promise<void>
] => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fetchProfile } = useProfile();

  // Helper function to convert Supabase User to AuthUser
  const mapSupabaseUserToAuthUser = (supabaseUser: User): AuthUser => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      app_metadata: supabaseUser.app_metadata,
      user_metadata: supabaseUser.user_metadata,
      aud: supabaseUser.aud, // This is required now
      created_at: supabaseUser.created_at
    };
  };

  const fetchUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (error) {
        console.error("Error fetching user roles:", error);
        return [];
      }
      
      return data.map(roleObj => roleObj.role);
    } catch (error) {
      console.error("Error in fetchUserRoles:", error);
      return [];
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const profile = await fetchProfile(user.id);
      setProfile(profile);
      
      // Fetch user roles
      const roles = await fetchUserRoles(user.id);
      setUserRoles(roles);
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        
        // Convert User to AuthUser type to match our interface
        if (session?.user) {
          const authUser = mapSupabaseUserToAuthUser(session.user);
          setUser(authUser);
        } else {
          setUser(null);
        }
        
        // Don't load profile data within the callback to avoid deadlock
        if (session?.user) {
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
            
            const rolesData = await fetchUserRoles(session.user.id);
            setUserRoles(rolesData);
            
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setUserRoles([]);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      
      // Convert User to AuthUser type to match our interface
      if (session?.user) {
        const authUser = mapSupabaseUserToAuthUser(session.user);
        setUser(authUser);
        
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
        
        const rolesData = await fetchUserRoles(session.user.id);
        setUserRoles(rolesData);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return [{ session, user, profile, isLoading, userRoles }, setIsLoading, refreshProfile];
};
