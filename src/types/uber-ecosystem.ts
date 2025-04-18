
import { UberPersona } from './UberPersona';

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
  minRating?: number;
  maxPrice?: number;
  isVerified?: boolean;
  tags?: string[];
  [key: string]: any;
}

export interface UberCoreService {
  initialize(): Promise<boolean>;
  shutdown(): Promise<boolean>;
  searchPersonas(filters: UberSearchFilters): UberPersona[];
  findNearestNeighbors(personaId: string, count?: number): UberPersona[];
  getPersonaById(id: string): UberPersona | undefined;
  getSettings(): UberCoreSettings;
  updateSettings(settings: Partial<UberCoreSettings>): void;
  convertToUberPersona(input: any): UberPersona;
  getMetrics(): Record<string, any>;
}
