
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  useAuth,
  useRole,
  AuthProvider,
  AuthContextType
} from './auth/index';

export { 
  useAuth, 
  AuthProvider, 
  useRole,
  AuthContextType
};
