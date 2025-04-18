
import { AuthState, UserRole } from "@/types/user";

// Initial auth state
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  loading: true,
  error: null
};

// Create admin user state
export const createAdminState = (): AuthState => ({
  isAuthenticated: true,
  user: {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    isVerified: true,
    createdAt: new Date().toISOString(),
  },
  profile: null,
  loading: false,
  error: null,
});

// Create moderator user state
export const createModeratorState = (): AuthState => ({
  isAuthenticated: true,
  user: {
    id: '2',
    email: 'mod@example.com',
    name: 'Moderator User',
    role: UserRole.MODERATOR,
    isVerified: true,
    createdAt: new Date().toISOString(),
  },
  profile: null,
  loading: false,
  error: null,
});

// Create escort user state
export const createEscortState = (): AuthState => ({
  isAuthenticated: true,
  user: {
    id: '3',
    email: 'escort@example.com',
    name: 'Escort User',
    role: UserRole.ESCORT,
    isVerified: true,
    createdAt: new Date().toISOString(),
  },
  profile: {
    id: '3',
    userId: '3',
    bio: 'Professional escort with 5 years of experience',
    location: 'New York, NY',
    verified: true,
    verification_level: 'enhanced',
    lucoin_balance: 1000,
    is_boosted: true,
    created_at: new Date().toISOString(),
    sexual_orientation: 'Heterosexual'
  },
  loading: false,
  error: null,
});

// Create user state based on role
export const createUserStateByRole = (role: UserRole): AuthState => {
  switch (role) {
    case UserRole.ADMIN:
      return createAdminState();
    case UserRole.MODERATOR:
      return createModeratorState();
    case UserRole.ESCORT:
      return createEscortState();
    default:
      return {
        isAuthenticated: true,
        user: {
          id: '4',
          email: 'user@example.com',
          name: 'Regular User',
          role: UserRole.USER,
          isVerified: true,
          createdAt: new Date().toISOString(),
        },
        profile: {
          id: '4',
          userId: '4',
          bio: 'Regular user profile',
          location: 'Chicago, IL',
          verified: false,
          lucoin_balance: 500,
          created_at: new Date().toISOString(),
        },
        loading: false,
        error: null,
      };
  }
};
