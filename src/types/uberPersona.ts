
/**
 * UberPersona type definitions
 */

export type ID = string;

export type PersonaType = 'escort' | 'creator' | 'livecam' | 'ai' | string;

export interface UberPersona {
  id: ID;
  name: string;
  type: PersonaType;
  displayName?: string;
  avatarUrl?: string;
  location?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  isPremium?: boolean;
  availability?: Array<{ start: Date; end: Date }> | { nextAvailable: Date };
  boostScore?: number;
  systemMetadata?: {
    boostScore?: number;
    lastActive?: Date;
    createdAt?: Date;
    profileViews?: number;
    lastSynced?: Date;
  };
  services?: string[];
  bio?: string;
  description?: string;
  languages?: string[];
  traits?: string[];
  stats?: {
    views?: number;
    likes?: number;
    bookings?: number;
    completion?: number;
    responseRate?: number;
    responseTime?: number;
  };
  monetization?: {
    hourlyRate?: number;
    packages?: Array<{
      id: string;
      name: string;
      price: number;
      duration: string;
      description?: string;
    }>;
    acceptsUbx?: boolean;
    minRate?: number;
    maxRate?: number;
  };
}
