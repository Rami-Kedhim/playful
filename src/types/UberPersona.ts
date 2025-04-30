
import { UberPersonaType, RoleFlags, Capabilities, StatusFlags, BoostStatus, Availability, SystemMetadata, Monetization, Stats } from './uberPersona';

// Re-export interfaces from lowercase file to maintain consistent exports
export { UberPersonaType, RoleFlags, Capabilities, StatusFlags, BoostStatus, Availability, SystemMetadata, Monetization, Stats };

// Comprehensive UberPersona interface that includes all required properties
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  username?: string;
  type: keyof UberPersonaType | string;
  personality?: string;
  traits?: string[];
  interests?: string[];
  mood?: string;
  energyLevel?: number;
  rating?: number;
  avatarUrl?: string;
  imageUrl?: string;
  bio?: string;
  description?: string;
  location?: string;
  age?: number;
  ethnicity?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  verificationLevel?: 'basic' | 'verified' | 'premium';
  isActive?: boolean;
  isAI?: boolean;
  isPremium?: boolean;
  isLocked?: boolean;
  tags?: string[];
  featured?: boolean;
  languages?: string[];
  services?: string[];
  availability?: Availability;
  systemMetadata?: SystemMetadata;
  roleFlags?: RoleFlags;
  capabilities?: Capabilities;
  monetization?: Monetization;
  price?: number;
  stats?: Stats;
  boostStatus?: BoostStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  profileImageUrl?: string;
  galleryImages?: string[];
  status?: string;
}

export interface NeuralModel {
  id: string;
  name: string;
  version?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  capabilities: string[];
  specialization: string | string[];
  size?: number;
  precision?: number;
  parameters?: {
    [key: string]: any;
  };
}
