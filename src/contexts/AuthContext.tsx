
import { createContext, useContext } from "react";
import { AuthContextValue } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthentication } from "@/hooks/useAuthentication";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ session, user, profile, isLoading }, setIsLoading, refreshProfile] = useAuthState();
  const { signUp, signIn, signOut } = useAuthentication(setIsLoading, refreshProfile);

  const value: AuthContextValue = {
    session,
    user,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    refreshProfile
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
