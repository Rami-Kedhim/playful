
import { UserRole } from './user';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role?: UserRole;
  avatarUrl?: string;
  boostPoints?: number;
  lastActive?: Date;
  memberSince?: Date;
  subscriptionTier?: 'free' | 'premium' | 'enterprise';
  verificationStatus?: 'unverified' | 'pending' | 'verified';
  preferredCategories?: string[];
  settings?: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    visibility: 'public' | 'private';
  };
}

export interface BoostPackage {
  id: string;
  name: string;
  points: number;
  price: number;
  discount?: number;
  features: string[];
  duration: number; // in days
}

export interface BoostResult {
  success: boolean;
  pointsUsed: number;
  remainingPoints: number;
  boostScore: number;
  previousRank?: number;
  newRank?: number;
  estimatedViews?: number;
}

export interface PulseScore {
  profileId: string;
  score: number;
  lastUpdated: Date;
  components: {
    activity: number;
    engagement: number;
    quality: number;
    popularity: number;
  };
}
