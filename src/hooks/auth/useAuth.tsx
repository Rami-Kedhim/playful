
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, AuthUser, AuthResult } from "@/types/authTypes";
import { mockLoginRequest, mockRegisterRequest, mockResetPasswordRequest, mockUpdateProfileRequest } from "@/utils/authUtils";

// Create the auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider component that wraps the app and makes auth object available to children
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Check if the user is authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Check for active session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session?.user) {
          setUser({
            id: sessionData.session.user.id,
            email: sessionData.session.user.email || "",
            username: sessionData.session.user.user_metadata?.username || sessionData.session.user.email?.split("@")[0] || "",
            user_metadata: sessionData.session.user.user_metadata || {},
            aud: sessionData.session.user.aud || "authenticated",
            role: sessionData.session.user.user_metadata?.role || "user"
          });

          // Load profile if we have a user
          await loadUserProfile();
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setError("Failed to initialize authentication");
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        setIsLoading(true);
        
        if (event === "SIGNED_IN" && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            username: session.user.user_metadata?.username || session.user.email?.split("@")[0] || "",
            user_metadata: session.user.user_metadata || {},
            aud: session.user.aud,
            role: session.user.user_metadata?.role || "user"
          });
          
          // Load user profile after sign in
          await loadUserProfile();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
        } else if (event === "TOKEN_REFRESHED" && session?.user) {
          // Update user state with fresh data
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            username: session.user.user_metadata?.username || session.user.email?.split("@")[0] || "",
            user_metadata: session.user.user_metadata || {},
            aud: session.user.aud,
            role: session.user.user_metadata?.role || "user"
          });
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/mock env
      if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MOCK_AUTH === "true") {
        const mockUser = await mockLoginRequest(email, password);
        setUser(mockUser);
        return { success: true, user: mockUser };
      }

      // Actual Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          username: data.user.user_metadata?.username || data.user.email?.split("@")[0] || "",
          user_metadata: data.user.user_metadata || {},
          aud: data.user.aud,
          role: data.user.user_metadata?.role || "user"
        });
        
        // Load user profile data
        await loadUserProfile();
      }

      return { success: true, user: data.user || null, session: data.session };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Additional alias for login
  const signIn = login;

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/mock env
      if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MOCK_AUTH === "true") {
        setUser(null);
        setProfile(null);
        return;
      }

      // Actual Supabase logout
      const { error } = await supabase.auth.signOut();

      if (error) {
        setError(error.message);
        throw error;
      }

      setUser(null);
      setProfile(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      console.error("Logout error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Additional alias for logout
  const signOut = logout;

  // Register function
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/mock env
      if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MOCK_AUTH === "true") {
        const mockUser = await mockRegisterRequest(email, password, username || "");
        setUser(mockUser);
        return { success: true, user: mockUser };
      }

      // Prepare user metadata
      const userData = {
        username: username || email.split("@")[0],
        role: "user",
      };

      // Actual Supabase registration
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      // Note: Supabase might not immediately authenticate the user
      // depending on email confirmation settings
      if (data.user) {
        // Don't automatically set the user if email confirmation is required
        // This would be handled by the onAuthStateChange listener
      }

      return { success: true, user: data.user || null, session: data.session };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile
  const loadUserProfile = async (): Promise<AuthUser | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile:", error);
        return user;
      }

      setProfile(data || null);
      return user;
    } catch (err) {
      console.error("Failed to load user profile:", err);
      return user;
    }
  };

  // Refresh user profile
  const refreshProfile = async (): Promise<void> => {
    await loadUserProfile();
  };

  // Update user profile
  const updateProfile = async (data: Partial<any>): Promise<boolean> => {
    try {
      if (!user) return false;

      setIsLoading(true);
      
      // For development/mock env
      if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MOCK_AUTH === "true") {
        const updatedUser = await mockUpdateProfileRequest(user, data);
        setUser(updatedUser);
        return true;
      }

      // Update profile in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id);

      if (error) {
        setError(error.message);
        return false;
      }

      // Refresh profile data
      await loadUserProfile();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Aliases for updateProfile
  const updateUser = updateProfile;
  const updateUserProfile = updateProfile;

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/mock env
      if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MOCK_AUTH === "true") {
        await mockResetPasswordRequest(email);
        return { success: true };
      }

      // Actual Supabase password reset
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send password reset email";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Aliases for sendPasswordResetEmail
  const resetPassword = async (email: string): Promise<boolean> => {
    const result = await sendPasswordResetEmail(email);
    return result.success;
  };
  const requestPasswordReset = sendPasswordResetEmail;

  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // This is just a placeholder as Supabase handles email verification automatically
      // The token would typically be in the URL that Supabase redirects to
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to verify email";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setError("No user is logged in");
        return false;
      }

      // For Supabase, password update is handled via updateUser
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update password";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (): Promise<boolean> => {
    try {
      if (!user) {
        setError("No user is logged in");
        return false;
      }

      setIsLoading(true);
      setError(null);

      // This would need admin privileges or a serverless function
      // For now, we'll just sign out the user as a placeholder
      await logout();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete account";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && r.name === role)
      );
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  // Clear any auth errors
  const clearError = (): void => {
    setError(null);
  };

  // Computed auth state
  const isAuthenticated = !!user;
  const loading = isLoading; // Alias for backward compatibility

  // Create the auth context value object
  const contextValue: AuthContextType = {
    user,
    profile,
    login,
    signIn,
    logout,
    signOut,
    register,
    isLoading,
    loading,
    error,
    isAuthenticated,
    initialized,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    updatePassword,
    deleteAccount,
    clearError,
    checkRole,
    session: null // Placeholder for session object
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
