
// This file is kept for backward compatibility
// It re-exports components from the auth folder
import { 
  useAuth,
  useRole,
  AuthProvider
} from './auth/index';

import type { AuthContextType } from './auth/types';

export { 
  useAuth, 
  AuthProvider, 
  useRole
};

export type { AuthContextType };
