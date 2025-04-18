
import { UberPersona } from './UberPersona';

export interface UberCoreSettings {
  boostingEnabled: boolean;
  boostingAlgorithm: string;
  orderByBoost: boolean;
  autonomyLevel: number;
  resourceAllocation: number;
  hilbertDimension: number;
  aiEnhancementLevel: number;
}

export interface UberSearchFilters {
  type?: string[];
  location?: string;
  minRating?: number;
  maxPrice?: number;
  isVerified?: boolean;
  tags?: string[];
  languages?: string[];
}

export interface PersonaMatch {
  persona: UberPersona;
  score: number;
}

export interface PersonaGroup {
  id: string;
  name: string;
  personas: UberPersona[];
  description?: string;
}

export interface UberBoostSettings {
  active: boolean;
  level: number;
  duration: number;
  startTime: string;
  endTime: string;
}

export interface UberInteraction {
  userId: string;
  personaId: string;
  interactionType: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface UberMetrics {
  viewCount: number;
  interactionRate: number;
  conversionRate: number;
  engagementScore: number;
  boostEffectiveness: number;
}
