
import React, { createContext, useContext, useState } from "react";
import { AuthContextValue, AuthUser } from "@/types/auth";
import { useAuthState } from "./useAuthState";
import { useAuthentication } from "./useAuthentication";
import { User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ session, user, profile, isLoading, userRoles }, setIsLoading, refreshProfile] = useAuthState();
  const { signUp, signIn, signOut, resetPassword, updatePassword, updateProfile } = useAuthentication(setIsLoading, refreshProfile);
  const [error, setError] = useState<string | null>(null);

  // Function to check if user has a specific role
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  // Additional methods expected by components
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
      
      await updateProfile(user.id, userData);
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

  // Convert database user to AuthUser type for components
  const mapUserToAuthUser = (user: User | null, profile: any | null): AuthUser | null => {
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email || "",
      username: profile?.username || user.email?.split('@')[0] || "",
      profileImageUrl: profile?.avatar_url || "",
      lucoinsBalance: profile?.lucoin_balance || 0,
      isVerified: profile?.is_verified || false,
      role: userRoles.length > 0 ? userRoles[0] : "user"
    };
  };

  const authUser = mapUserToAuthUser(user, profile);

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
    // Additional properties expected by components
    isAuthenticated: !!session,
    login,
    logout,
    register,
    updateUserProfile,
    error,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
