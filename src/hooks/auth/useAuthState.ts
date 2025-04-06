
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthState, AuthUser } from "@/types/auth";
import { fetchUserRoles } from "@/utils/authStateUtils";
import { useProfileManagement } from "./useProfileManagement";

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
  
  const { fetchProfile } = useProfileManagement();

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
      
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
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || "",
            app_metadata: session.user.app_metadata,
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at,
            aud: session.user.aud
          };
          setUser(authUser);
        } else {
          setUser(null);
        }
        
        // Don't load profile data within the callback to avoid deadlock
        if (session?.user) {
          setTimeout(async () => {
            try {
              const profileData = await fetchProfile(session.user.id);
              setProfile(profileData);
              
              const rolesData = await fetchUserRoles(session.user.id);
              setUserRoles(rolesData);
            } catch (error) {
              console.error("Error loading profile data:", error);
            } finally {
              setIsLoading(false);
            }
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
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email || "",
          app_metadata: session.user.app_metadata,
          user_metadata: session.user.user_metadata,
          created_at: session.user.created_at,
          aud: session.user.aud
        };
        setUser(authUser);
        
        try {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
          
          const rolesData = await fetchUserRoles(session.user.id);
          setUserRoles(rolesData);
        } catch (error) {
          console.error("Error loading initial profile:", error);
        }
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
