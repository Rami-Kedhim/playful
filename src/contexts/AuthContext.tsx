
import { createContext, useContext } from "react";
import { AuthContextValue } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthentication } from "@/hooks/useAuthentication";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ session, user, profile, isLoading, userRoles }, setIsLoading, refreshProfile] = useAuthState();
  const { signUp, signIn, signOut, resetPassword, updatePassword } = useAuthentication(setIsLoading, refreshProfile);

  // Function to check if user has a specific role
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const value: AuthContextValue = {
    session,
    user,
    profile,
    isLoading,
    userRoles,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    checkRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
