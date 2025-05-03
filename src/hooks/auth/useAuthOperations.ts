
import { toast } from "@/components/ui/use-toast";
import { AuthUser } from "@/types/authTypes";
import { 
  mockLoginRequest, 
  mockRegisterRequest, 
  mockResetPasswordRequest, 
  mockUpdateProfileRequest,
  getUserRoles,
  handleAuthError
} from "@/utils/authUtils";

interface AuthStateProps {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  userRoles: string[];
  setUserRoles: (roles: string[]) => void;
}

export const useAuthOperations = ({
  user,
  setUser,
  isLoading,
  setIsLoading,
  setError,
  setUserRoles
}: AuthStateProps) => {
  
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mockUser = await mockLoginRequest(email, password);
      
      setUser(mockUser);
      setUserRoles(getUserRoles(mockUser));
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mockUser = await mockRegisterRequest(email, password, username);
      
      setUser(mockUser);
      setUserRoles(getUserRoles(mockUser));
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await mockResetPasswordRequest(email);
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions",
      });
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error("No user logged in");
      }
      
      const updatedUser = await mockUpdateProfileRequest(user, userData);
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update roles if roles changed
      if (userData.roles && userData.roles !== user.roles) {
        setUserRoles(getUserRoles(updatedUser));
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
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

  return {
    login,
    register,
    resetPassword,
    updateUserProfile,
    logout
  };
};
