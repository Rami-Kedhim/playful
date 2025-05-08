
import { UserRole } from '@/types/user';
import { UserCredentials, UserProfile } from '@/types/pulse-boost';

// Mock authentication service
export const login = async (credentials: UserCredentials) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate success for demo user
  if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
    return {
      success: true,
      user: {
        id: 'user-1',
        email: credentials.email,
        name: 'Demo User',
        role: UserRole.USER
      }
    };
  }
  
  // Simulate failure
  return {
    success: false,
    error: 'Invalid credentials'
  };
};

export const register = async (credentials: UserCredentials) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    user: {
      id: `user-${Date.now()}`,
      email: credentials.email,
      name: 'New User',
      role: UserRole.USER
    }
  };
};

export const logout = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};

export const getCurrentUser = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate a logged-in user
  return {
    id: 'user-1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: UserRole.USER
  };
};

export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    success: true,
    profile: {
      ...profileData,
      id: userId,
      updatedAt: new Date()
    }
  };
};
