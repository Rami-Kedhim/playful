
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  AuthContext, 
  AuthProvider, 
  useAuth 
} from './auth';

export { 
  useAuth, 
  AuthProvider, 
  AuthContext
};

export default useAuth;
