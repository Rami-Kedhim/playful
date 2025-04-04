
import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "@/components/ui/use-toast";

// Define the User interface internally to avoid conflicts
interface AuthUser {
  id: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  lucoinsBalance: number;
  role?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRoles: string[];
  register: (email: string, password: string, username: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  // Check if user is already logged in
  useEffect(() => {
    // Mock implementation - in a real app, you'd check localStorage or a token
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Set user roles based on the user's role property
      if (parsedUser.role) {
        setUserRoles([parsedUser.role]);
      } else {
        setUserRoles(['user']); // Default role
      }
    }
  }, []);
  
  // Clear any authentication errors
  const clearError = () => {
    setError(null);
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock login - in a real app, you'd call an API
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate input
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Mock successful login
      const mockUser: AuthUser = {
        id: "user-1",
        username: "johndoe",
        email: email,
        profileImageUrl: "https://github.com/shadcn.png",
        lucoinsBalance: 120,
        role: "user",
        isVerified: true
      };
      
      setUser(mockUser);
      setUserRoles([mockUser.role || 'user']);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password";
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate input
      if (!email || !password || !username) {
        throw new Error("All fields are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Mock registration - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: AuthUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        username: username,
        email: email,
        lucoinsBalance: 10, // Starting balance
        role: "user",
        isVerified: false
      };
      
      setUser(mockUser);
      setUserRoles(['user']);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate input
      if (!email) {
        throw new Error("Email is required");
      }
      
      // Mock password reset - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send a password reset email
      console.log(`Password reset requested for ${email}`);
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Password reset failed";
      setError(errorMessage);
      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock profile update - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user state with the new data
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Update roles if role changed
        if (userData.role && userData.role !== user.role) {
          setUserRoles([userData.role]);
        }
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      } else {
        throw new Error("No user logged in");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Profile update failed";
      setError(errorMessage);
      toast({
        title: "Profile update failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserRoles([]);
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const isAuthenticated = !!user;

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
