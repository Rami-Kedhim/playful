
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  isVerified: boolean;
  profileImageUrl?: string;
  lucoinsBalance: number;
  role: "user" | "creator" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would check for an existing session with your backend
        const savedUser = localStorage.getItem("user");
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // Simulating API response for now
      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "user-1",
          email,
          username: "demouser",
          createdAt: new Date().toISOString(),
          isVerified: true,
          lucoinsBalance: 100,
          role: "user"
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
        
        return true;
      } else {
        setError("Invalid email or password");
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error: any) {
      setError(error.message || "Login failed");
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // Simulating API response for now
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        username,
        createdAt: new Date().toISOString(),
        isVerified: false,
        lucoinsBalance: 50, // New users get some free Lucoins
        role: "user"
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Registration successful",
        description: "Welcome to our platform! Please verify your email."
      });
      
      return true;
    } catch (error: any) {
      setError(error.message || "Registration failed");
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  }, [toast]);

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // Simulating API response for now
      toast({
        title: "Password reset email sent",
        description: "If an account exists with this email, you will receive a password reset link"
      });
      
      return true;
    } catch (error: any) {
      setError(error.message || "Password reset failed");
      toast({
        title: "Password reset failed",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // In a real app, this would be an API call
      // Simulating API response for now
      const updatedUser = {
        ...user,
        ...data
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      });
      
      return true;
    } catch (error: any) {
      setError(error.message || "Profile update failed");
      toast({
        title: "Profile update failed",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
