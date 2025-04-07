
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import type { AuthUser, UserProfile, AuthResult } from '@/types/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export for backward compatibility
export { AuthProvider } from './AuthProvider';
export type { AuthUser, UserProfile, AuthResult };
