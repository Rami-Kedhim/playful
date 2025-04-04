
import { useState, useEffect } from "react";
import { AuthUser } from "@/types/authTypes";
import { getUserRoles, handleAuthError } from "@/utils/authUtils";

export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserRoles(getUserRoles(parsedUser));
    }
  }, []);
  
  // Clear any authentication errors
  const clearError = () => {
    setError(null);
  };
  
  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    userRoles,
    setUserRoles,
    isAuthenticated: !!user,
    clearError
  };
};
