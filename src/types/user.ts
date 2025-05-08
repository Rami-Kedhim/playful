
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ESCORT = 'escort',
  CREATOR = 'creator',
  MODERATOR = 'moderator',
  AI = 'ai'
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  username?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  roles?: string[];
  ubxBalance?: number;
  isVerified?: boolean;
  created_at?: string;
  user_metadata?: {
    aiPreferences?: {
      theme?: string;
    };
    username?: string;
    region?: string;
    lastAiInteraction?: string;
    aiConversationCount?: number;
    verification_request?: any;
    aiFavoriteTopics?: string[];
    aiEnabled?: boolean;
    role?: string;
  };
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName?: string;
  bio?: string;
  location?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  phone?: string;
  website?: string;
  verification_level?: string;
  rates?: any;
  services?: string[];
  languages?: string[];
  availability?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}
