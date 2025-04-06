
import { useState, useEffect } from "react";
import { AuthUser } from "@/types/auth";

export type AuthState = {
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
};

export function useAuthState(): [
  AuthState,
  (loading: boolean) => void,
  () => Promise<void>
] {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      // In a real app, fetch profile data here
      console.log("Refreshing profile for user:", user.id);
      
      // Mock profile data
      setProfile({
        id: user.id,
        username: user.username || user.email?.split('@')[0],
        avatar_url: user.profileImageUrl,
      });
      
      // Set roles based on user.role
      const roles = user.role ? [user.role] : ['user'];
      setUserRoles(roles);
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('uberEscortsUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Set default profile
        setProfile({
          id: parsedUser.id,
          username: parsedUser.username || parsedUser.email?.split('@')[0],
          avatar_url: parsedUser.profileImageUrl,
        });
        
        // Set roles based on user.role
        const roles = parsedUser.role ? [parsedUser.role] : ['user'];
        setUserRoles(roles);
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      }
    }
    
    setIsLoading(false);
  }, []);

  return [{ user, profile, isLoading, userRoles }, setIsLoading, refreshProfile];
}
