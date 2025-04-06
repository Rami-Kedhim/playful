
import React, { createContext, useContext, useState } from "react";
import { AuthContextValue, UserRole } from "@/types/auth";
import { useAuthState } from "@/hooks/auth/useAuthState";
import { useAuthActions } from "@/hooks/auth/useAuthActions";
import { usePasswordManagement } from "@/hooks/auth/usePasswordManagement";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ session, user, profile, isLoading, userRoles }, setIsLoading, refreshProfile] = useAuthState();
  const { resetPassword, updatePassword } = usePasswordManagement();
  const { signUp, signIn, signOut } = useAuthActions(setIsLoading, refreshProfile);
  const [error, setError] = useState<string | null>(null);

  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      throw err;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      setError(null);
      await signUp(email, password, { username });
    } catch (err: any) {
      setError(err.message || "Failed to register");
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut();
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
      throw err;
    }
  };

  const updateUserProfile = async (userData: Partial<any>) => {
    try {
      setError(null);
      if (!user) throw new Error("User not logged in");
      
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', user.id)
        .single();
      
      if (updateError) throw updateError;
      
      await refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      throw err;
    }
  };

  const clearError = () => setError(null);

  const mapUserToAuthUser = (dbUser: any | null, profile: any | null) => {
    if (!dbUser) return null;
    
    const roleValue: UserRole = (userRoles.length > 0 ? userRoles[0] : "user") as UserRole;
    
    return {
      id: dbUser.id,
      email: dbUser.email || "",
      username: profile?.username || dbUser.email?.split('@')[0] || "",
      profileImageUrl: profile?.avatar_url || "",
      lucoinsBalance: profile?.lucoin_balance || 0,
      isVerified: profile?.is_verified || false,
      role: roleValue,
      app_metadata: dbUser.app_metadata,
      user_metadata: dbUser.user_metadata,
      aud: dbUser.aud,
      created_at: dbUser.created_at
    };
  };

  const authUser = user || (session?.user ? mapUserToAuthUser(session.user, profile) : null);

  const value: AuthContextValue = {
    session,
    user: authUser,
    profile,
    isLoading,
    userRoles,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    checkRole,
    isAuthenticated: !!session,
    login,
    logout,
    register,
    updateUserProfile,
    error,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider as AuthContextProvider };
