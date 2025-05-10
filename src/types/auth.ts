
export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  gender?: string;
}

export interface AuthResult {
  user?: AuthUser | null;
  session?: any;
  error?: string | null;
}

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  username?: string;
  avatar_url?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  verified?: boolean;
  user_id?: string;
  gender?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
  is_escort?: boolean;
}

export interface PasswordReset {
  email: string;
}

export interface UserAuthContext {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  register: (credentials: RegisterCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
