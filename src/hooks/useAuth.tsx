
// This file is kept for backward compatibility
// It re-exports components from the auth folder and contexts
import { 
  AuthProvider, 
  useAuth 
} from '@/contexts/AuthContext';

export { 
  useAuth, 
  AuthProvider
};

export default useAuth;
