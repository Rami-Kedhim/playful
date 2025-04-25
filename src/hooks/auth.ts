
// Re-export all auth-related hooks and components
export { 
  AuthContext, 
  AuthProvider, 
  useAuth,
  useAuthContext,
  useAuthState,
  useAuthActions,
  useRole
} from './auth/index';

// For backward compatibility with direct imports
export * from './auth/useAuthContext';
