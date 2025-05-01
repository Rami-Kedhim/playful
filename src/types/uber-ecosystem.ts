
/**
 * UberEcosystem Types - Shared types for the broader ecosystem
 */

import { UberPersona } from './uberPersona';

export interface UberBoostSettings {
  enabled: boolean;
  multiplier: number;
  duration: number;
  startTime?: Date;
  endTime?: Date;
  autoRenew?: boolean;
}

export interface PersonaMatch {
  persona: UberPersona;
  score: number;
  matchBasis: string[];
  similarTo?: string[];
}

export interface UberSearchFilters {
  location?: string;
  type?: string[];
  services?: string[];
  availability?: 'now' | 'today' | 'week';
  price?: {
    min?: number;
    max?: number;
  };
  verified?: boolean;
  rating?: number;
  tags?: string[];
}

export interface UberNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'system' | 'chat' | 'booking' | 'payment';
  read: boolean;
  createdAt: Date;
  link?: string;
  entityId?: string;
  entityType?: string;
}

export interface UberBooking {
  id: string;
  clientId: string;
  providerId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  location?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}
