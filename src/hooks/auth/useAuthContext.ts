
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

// This is a simplified hook to use the AuthContext
// It adds type safety and ensures the context exists
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
