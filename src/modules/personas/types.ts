
/**
 * UberPersona Module Types
 * Central type definitions for the UberPersona system
 */
import { UberPersona } from '@/types/UberPersona';

export type PersonaType = 'escort' | 'creator' | 'livecam' | 'ai';

export interface PersonaFilters {
  type?: PersonaType | PersonaType[];
  location?: string | string[];
  services?: string[];
  isVerified?: boolean;
  isOnline?: boolean;
  isPremium?: boolean; 
  minRating?: number;
  tags?: string[];
  searchTerm?: string;
  sortBy?: 'boost' | 'rating' | 'created' | 'price';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PersonaSearchResult {
  personas: UberPersona[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PersonaViewData {
  persona: UberPersona;
  similarPersonas: UberPersona[];
  recommendedServices?: string[];
  boostStatus: {
    isActive: boolean;
    remainingTime?: string;
  };
}

export interface PersonaCreationData {
  type: PersonaType;
  name: string;
  displayName?: string;
  location?: string;
  bio?: string;
  tags?: string[];
  avatarUrl?: string;
  services?: string[];
  languages?: string[];
}

export interface PersonaUpdateData {
  id: string;
  updates: Partial<Omit<UberPersona, 'id' | 'type'>>;
}

export interface PersonaStats {
  views: number;
  engagementRate: number;
  conversionRate: number;
  averageSessionTime: number;
  bookmarkCount: number;
  lastViewedAt?: Date;
}
