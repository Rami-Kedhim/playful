
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
  };
  services?: string[];
  bio?: string;
}
