
export interface User {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  roles?: string[];
  role?: string; // Adding for backward compatibility
  created_at?: string;
  avatarUrl?: string | null;
  profileImageUrl?: string | null;
  avatar_url?: string | null; // Adding for backward compatibility
  user_metadata?: {
    username?: string;
    avatar_url?: string | null;
    aiPreferences?: any;
    lastAiInteraction?: string;
    aiConversationCount?: number;
    aiFavoriteTopics?: string[];
    aiEnabled?: boolean;
    region?: string;
    role?: string;
    verification_request?: any;
    verification_status?: string;
    verification_level?: string;
    isVerified?: boolean;
  };
  ubxBalance?: number;
  bio?: string;
  website?: string;
  isVerified?: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  username?: string;
  fullName?: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  avatar_url?: string; // Adding for backward compatibility
  preferences?: Record<string, any>;
  verified?: boolean;
  is_verified?: boolean; // Adding for backward compatibility
  createdAt: string;
  updatedAt: string;
  gender?: string;
  location?: string;
  sexual_orientation?: string;
  website?: string;
  phone?: string;
  ubxBalance?: number;
  ubx_balance?: number; // Adding for backward compatibility
  isBoosted?: boolean;
  is_boosted?: boolean; // Adding for backward compatibility
  subscription_tier?: string;
  role?: string;
  roles?: string[];
}

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

