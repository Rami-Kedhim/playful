
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRole } from './auth/useRole';
import { AuthContextType } from '@/types/auth';

// Re-export the auth context and provider
export { AuthContext, AuthProvider, useAuth } from './auth/useAuth'; 

// Re-export useRole
export { useRole };

// Re-export additional hooks
export { useAuthState } from './auth/useAuthState';
export { useAuthActions } from './auth/useAuthActions';

// For backward compatibility with direct imports
const importedModule = require('./auth/useAuth');
export default importedModule.default;
