
export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  CLIENT = "client",
  ESCORT = "escort",
  CREATOR = "creator"
}

export interface UserProfile {
  id: string;
  userId: string;
  username?: string;
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  preferences?: Record<string, any>;
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VerificationLevel = 'none' | 'basic' | 'full';
export type UserStatus = 'active' | 'suspended' | 'banned' | 'pending';
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'vip';
