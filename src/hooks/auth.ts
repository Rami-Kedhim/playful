
// Re-export the auth context and provider
export { AuthContext, AuthProvider, useAuth } from './auth/index'; 

// Re-export additional hooks
export { useRole } from './auth/useRole';
export { useAuthState } from './auth/useAuthState';
export { useAuthActions } from './auth/useAuthActions';

// For backward compatibility with direct imports
export * from './auth/useAuthContext';
