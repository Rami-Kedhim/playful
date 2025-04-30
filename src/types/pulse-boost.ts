
export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  remainingTime?: string;
  visibilityScore?: number;
  packageName?: string;
  expiresAt?: Date; // Added this property
}

export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  duration: string;
  visibility: string;
  costUBX: number;
  color?: string;
  badgeColor?: string;
  features: string[];
  visibility_increase: number;
  price: number;
}

// Add missing types that were referenced in errors
export interface ActiveBoost {
  id: string;
  profileId: string;
  packageId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'expired' | 'cancelled';
}

export enum UserRole {
  USER = 'user',
  CREATOR = 'creator',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}
