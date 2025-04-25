
import { AuthUser } from '@/types/authTypes';

// Mock login request function for development
export const mockLoginRequest = async (email: string, password: string): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  if (password.length < 6) {
    throw new Error('Invalid password. Must be at least 6 characters.');
  }
  
  // Return mock user
  return {
    id: '1',
    email,
    username: email.split('@')[0],
    role: 'user',
    user_metadata: {},
    created_at: new Date().toISOString(),
  };
};

// Mock register request function for development
export const mockRegisterRequest = async (
  email: string, 
  password: string, 
  username: string
): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  if (password.length < 6) {
    throw new Error('Invalid password. Must be at least 6 characters.');
  }
  
  // Return mock user
  return {
    id: String(Date.now()),
    email,
    username: username || email.split('@')[0],
    role: 'user',
    user_metadata: {},
    created_at: new Date().toISOString(),
  };
};

// Mock reset password request function for development
export const mockResetPasswordRequest = async (email: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  // In a real app, this would send a password reset email
  console.log(`Password reset email sent to ${email}`);
};

// Mock update profile request function for development
export const mockUpdateProfileRequest = async (
  user: AuthUser, 
  userData: Partial<AuthUser>
): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
  
  // Return updated user
  return {
    ...user,
    ...userData,
  };
};

// Get user roles from a user object
export const getUserRoles = (user: AuthUser): string[] => {
  return user.role ? [user.role] : ['user'];
};

// Handle authentication errors
export const handleAuthError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};
