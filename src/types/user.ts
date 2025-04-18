
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  name: string;
  isVerified: boolean;
  createdAt: string;
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
  website: string; // Property explicitly defined
  avatarUrl: string;
  joinedDate: Date;
  avatar_url: string;
  phone: string; // Property explicitly defined
}

// Add AuthResult type needed for SignInForm and SignUpForm
export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  error?: string;
}
