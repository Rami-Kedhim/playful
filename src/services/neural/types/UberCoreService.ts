
import type { UberPersona } from '@/types/uberPersona';

export interface UberCoreSettings {
  boostingEnabled: boolean;
  boostingAlgorithm: "OxumAlgorithm" | "HermesAlgorithm" | "StandardAlgorithm";
  orderByBoost: boolean;
  autonomyLevel: number;
  resourceAllocation: number;
  hilbertDimension: number;
  aiEnhancementLevel: number;
}

export interface UberSearchFilters {
  type?: string[];
  location?: string;
  services?: string[];
  tags?: string[];
  minRating?: number;
  maxPrice?: number;
  isVerified?: boolean;
  isOnline?: boolean;
  hasBooking?: boolean;
  hasContent?: boolean;
}

export interface UberCoreService {
  initialize(): Promise<boolean>;
  shutdown(): Promise<void>;
  getSettings(): UberCoreSettings;
  updateSettings(settings: Partial<UberCoreSettings>): void;
  searchPersonas(filters: UberSearchFilters): UberPersona[];
  findNearestNeighbors(personaId: string, count: number): UberPersona[];
  convertToUberPersona(entity: any): UberPersona;
}
