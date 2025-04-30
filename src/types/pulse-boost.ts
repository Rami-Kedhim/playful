
import { BoostPackage } from './boost';

export interface PulseBoost {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  duration: string;
  visibility: string;
  costUBX: number;
  color?: string;
  badgeColor?: string;
  features: string[];
  visibility_increase?: number;
  price?: number;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  remainingTime?: string;
  visibilityScore?: number;
  activeBoostId?: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  CREATOR = 'creator',
  MODERATOR = 'moderator',
  USER = 'user'
}
