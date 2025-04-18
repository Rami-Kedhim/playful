
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
  website: string;
  avatarUrl: string;
  joinedDate: Date;
  avatar_url: string; // For backward compatibility
  phone: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: User;
}
