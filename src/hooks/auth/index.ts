
// Import all auth hooks
import { useAuth } from './useAuthContext';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { usePasswordManagement } from './usePasswordManagement';
import { useProfileManagement } from './useProfileManagement';
import { useRole } from './useRole';
import { useAuthentication } from './useAuthentication';

// Export all authentication related hooks from a single file
export { 
  useAuth
};

// Also export useAuth as default for compatibility
export default useAuth;
