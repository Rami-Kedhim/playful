
/**
 * UberEcosystem Types
 * Core types supporting the integrated Uber ecosystem for escorts, 
 * content creators, livecams, and AI companions in Hilbert space
 */

import { Escort } from './escort';
import { ContentCreator } from './creator';
import { LivecamModel } from './livecam';
import { AICompanion } from './ai-companion';
import { UberPersona } from './uberPersona';

// Service types in the Uber ecosystem
export enum UberServiceType {
  IN_PERSON = 'in-person',
  VIRTUAL = 'virtual', 
  CONTENT = 'content',
  HYBRID = 'hybrid',
  AI_COMPANION = 'ai-companion',
  METAVERSE = 'metaverse'
}

// Profile visibility in the Uber ecosystem
export enum UberProfileVisibility {
  PUBLIC = 'public',
  VERIFIED_ONLY = 'verified-only',
  PRIVATE = 'private',
  SUBSCRIPTION_ONLY = 'subscription-only'
}

// Hilbert space positioning interface
export interface HilbertSpacePosition {
  coordinates: number[];
  dimension: number;
  nearestNeighbors?: string[];
  similarityScore?: number;
  clusterAssignment?: string;
}

// UberCore system settings
export interface UberCoreSettings {
  boostingEnabled: boolean;
  boostingAlgorithm: 'OxumAlgorithm' | 'HermesAlgorithm' | 'StandardAlgorithm';
  orderByBoost: boolean;
  autonomyLevel: number;
  resourceAllocation: number;
  hilbertDimension: number;
  aiEnhancementLevel: number;
}

// Mapping interfaces between entity types and UberPersona
export interface PersonaMappingResult<T> {
  originalEntity: T;
  uberPersona: UberPersona;
  hilbertPosition?: HilbertSpacePosition;
  conversionScore: number;
}

// Service provider interface that all entities can implement
export interface ServiceProvider {
  id: string;
  serviceTypes: UberServiceType[];
  availability: {
    isAvailable: boolean;
    availableTimes?: string;
    timezone?: string;
  };
  pricing: {
    basePrice: number;
    currency: string;
    specialPricing?: Record<string, number>;
  };
}

// Unified search filters for the Uber ecosystem
export interface UberSearchFilters {
  serviceTypes?: UberServiceType[];
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  verifiedOnly?: boolean;
  availableNow?: boolean;
  genders?: string[];
  specialties?: string[];
  languages?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'price' | 'rating' | 'popularity' | 'relevance' | 'boost';
  sortDirection?: 'asc' | 'desc';
}

// Integrated analytics for the Uber ecosystem
export interface UberAnalytics {
  viewCount: number;
  clickCount: number;
  conversionRate: number;
  popularServices: Record<UberServiceType, number>;
  peakHours: Record<string, number>;
  userDemographics?: Record<string, number>;
  revenueByServiceType?: Record<UberServiceType, number>;
}

// Type guard functions
export const isEscort = (entity: any): entity is Escort => {
  return entity && (entity.hasOwnProperty('isEscort') || 
    entity.hasOwnProperty('isVerified') || 
    entity.services !== undefined);
};

export const isContentCreator = (entity: any): entity is ContentCreator => {
  return entity && (entity.hasOwnProperty('isCreator') || 
    entity.hasOwnProperty('subscriptionPrice') || 
    entity.contentCount !== undefined);
};

export const isLivecam = (entity: any): entity is LivecamModel => {
  return entity && (entity.hasOwnProperty('isStreaming') || 
    entity.hasOwnProperty('viewerCount') || 
    entity.streamUrl !== undefined);
};

export const isAICompanion = (entity: any): entity is AICompanion => {
  return entity && (entity.hasOwnProperty('isAI') || 
    entity.personality !== undefined ||
    entity.hasOwnProperty('personality_traits'));
};
