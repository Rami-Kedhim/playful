
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'moderator' | 'escort' | 'creator';
  name: string;
  isVerified: boolean;
  createdAt: string;
  phone?: string;
  website?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  avatarUrl?: string;
  user_metadata?: Record<string, any>;
  lucoinsBalance?: number;
  roles?: UserRole[];
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  displayName: string;
  location: string;
  bio: string;
  isVerified: boolean;
  website?: string; 
  avatarUrl: string;
  joinedDate: Date;
  avatar_url: string;
  phone?: string;
  profileImageUrl?: string;
  sexual_orientation?: string;
}

// Add AuthResult type needed for SignInForm and SignUpForm
export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  error?: string;
  session?: any; // Add session property
}

// Add these types needed for Auth components
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Add UserRole enum for AuthPage
export type UserRole = string | { name: string };

// AI Avatar Generator settings
export interface AIAvatarSettings {
  gender: "male" | "female" | "non-binary" | string;
  style: string;
  ageRange: string;
  age: number;
  ethnicity: string;
  hairColor: string;
  hairStyle: string;
  bodyType: string;
  skinTone: string;
  background: string;
}
