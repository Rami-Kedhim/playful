
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User, UserProfile } from '@/types/user';

// Create the auth context with a default empty value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  initialized: false,
  
  login: async () => ({ success: false }),
  logout: async () => false,
  register: async () => ({ success: false }),
  signIn: async () => ({ success: false }),
  signOut: async () => false,
  updateUser: async () => false,
  updateUserProfile: async () => false,
  updateProfile: async () => false,
  loadUserProfile: async () => null,
  refreshProfile: async () => {},
  sendPasswordResetEmail: async () => false,
  resetPassword: async () => false,
  requestPasswordReset: async () => false,
  verifyEmail: async () => false,
  updatePassword: async () => false,
  deleteAccount: async () => false,
  checkRole: () => false,
});

// Hook for using the auth context
const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default useAuthContext;
