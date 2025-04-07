
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import type { AuthContextType } from '@/types/auth';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export for backward compatibility
export { AuthProvider } from './AuthProvider';
