
import { createContext, useContext } from "react";
import { AuthContextType } from "@/types/authTypes";
import { useAuthState } from "./useAuthState";
import { useAuthOperations } from "./useAuthOperations";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    userRoles,
    setUserRoles,
    isAuthenticated,
    clearError
  } = useAuthState();

  const {
    login,
    register,
    resetPassword,
    updateUserProfile,
    logout
  } = useAuthOperations({
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    userRoles,
    setUserRoles
  });

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      error, 
      isAuthenticated,
      userRoles,
      register,
      resetPassword,
      updateUserProfile,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
