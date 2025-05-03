
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  AuthProvider, 
  useAuth 
} from './auth';

export { 
  useAuth, 
  AuthProvider
};

export default useAuth;
