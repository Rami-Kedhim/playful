
// Add this to your existing auth.ts file or create it if it doesn't exist

export enum DatabaseGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  NON_BINARY = 'non_binary',
  TRANS = 'trans'
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser | null;
  session?: any | null; 
  error?: any;
}

export type UserRole = 'admin' | 'moderator' | 'user' | 'escort' | string;

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  roles?: UserRole[];
  aud?: string;
  // Add other user properties as needed
}

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string; 
  email: string;
  bio?: string;
  location?: string;
  gender: DatabaseGender;
  sexual_orientation?: string;
  profile_completeness?: number;
  is_boosted?: boolean;
  created_at: string;
  is_verified?: boolean;
}
