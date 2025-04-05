
import React, { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthState } from "@/types/auth";
import { fetchUserRoles } from "@/utils/authStateUtils";
import { useProfileManagement } from "./useProfileManagement";

export const useAuthState = (): [
  AuthState,
  (loading: boolean) => void,
  () => Promise<void>
] => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
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
        setUser(session?.user || null);
        
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
      setUser(session?.user || null);
      
      if (session?.user) {
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
        
        const rolesData = await fetchUserRoles(session.user.id);
        setUserRoles(rolesData);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return [{ session, user, profile, isLoading, userRoles }, setIsLoading, refreshProfile];
};
