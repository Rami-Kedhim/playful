
import { BoostStatus } from './boost';

export interface PulseBoost {
  id: string;
  name: string;
  description?: string;
  durationMinutes?: number;
  duration: string;
  visibility: string;
  costUBX: number;
  color?: string;
  badgeColor?: string;
  features: string[];
  visibility_increase: number;
  price: number;
}

export interface EnhancedBoostStatus extends BoostStatus {
  activeBoostId?: string;
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  CREATOR = 'creator'
}

export type UserRole = {
  id: string;
  userId: string;
  role: UserRoleEnum;
  createdAt: Date;
};
