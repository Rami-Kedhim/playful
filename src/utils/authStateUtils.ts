
import { User, UserProfile } from '@/types/user';

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  userRoles: string[];
}

export const createAuthState = (
  user: User | null = null,
  profile: UserProfile | null = null,
  isLoading: boolean = false
): AuthState => {
  const userRoles = user?.role ? 
    (typeof user.role === 'string' ? [user.role] : []) :
    [];
  
  return {
    user,
    profile,
    isLoading,
    userRoles
  };
};

export const hasRole = (state: AuthState, role: string): boolean => {
  return state.userRoles.includes(role);
};

export const isAuthenticated = (state: AuthState): boolean => {
  return !!state.user;
};

export const isProfileComplete = (state: AuthState): boolean => {
  if (!state.profile) return false;
  
  // Add logic to determine if profile is complete
  const requiredFields: Array<keyof UserProfile> = [
    'name',
    'email'
  ];
  
  return requiredFields.every(field => !!state.profile?.[field]);
};

export const getUserDisplayName = (state: AuthState): string => {
  if (!state.user) return '';
  
  return state.user.name || state.profile?.name || state.user.username || state.user.email;
};
