
import { AuthUser } from "@/types/authTypes";
import { toast } from "@/components/ui/use-toast";

// Mock successful login with a delay
export const mockLoginRequest = async (
  email: string, 
  password: string
): Promise<AuthUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate input
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  
  // Mock successful login
  return {
    id: "user-1",
    username: "johndoe",
    email: email,
    profileImageUrl: "https://github.com/shadcn.png",
    lucoinsBalance: 120,
    role: "user",
    isVerified: true
  };
};

// Mock registration with a delay
export const mockRegisterRequest = async (
  email: string, 
  password: string, 
  username: string
): Promise<AuthUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate input
  if (!email || !password || !username) {
    throw new Error("All fields are required");
  }
  
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  
  // Mock successful registration
  return {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    username: username,
    email: email,
    lucoinsBalance: 10, // Starting balance
    role: "user",
    isVerified: false
  };
};

// Mock password reset request
export const mockResetPasswordRequest = async (email: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate input
  if (!email) {
    throw new Error("Email is required");
  }
  
  // In a real app, this would send a password reset email
  console.log(`Password reset requested for ${email}`);
};

// Mock profile update request
export const mockUpdateProfileRequest = async (
  user: AuthUser, 
  userData: Partial<AuthUser>
): Promise<AuthUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update the user with the new data
  return { ...user, ...userData };
};

// Handle auth errors with toast notifications
export const handleAuthError = (error: unknown): string => {
  const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
  
  toast({
    title: "Authentication Error",
    description: errorMessage,
    variant: "destructive",
  });
  
  console.error(error);
  return errorMessage;
};

// Get user roles from user object
export const getUserRoles = (user: AuthUser | null): string[] => {
  if (!user) return [];
  return user.role ? [user.role] : ['user']; // Default role if none specified
};
