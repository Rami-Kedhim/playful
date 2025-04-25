
import { UberPersona } from '@/types/UberPersona';

export interface UberCoreSettings {
  boostingEnabled: boolean;
  boostingAlgorithm: 'OxumAlgorithm' | 'HermesAlgorithm' | 'StandardAlgorithm';
  orderByBoost: boolean;
  autonomyLevel: number;
  resourceAllocation: number;
  hilbertDimension: number;
  aiEnhancementLevel: number;
}

export interface PersonaProcessingResult extends UberPersona {
  boostScore?: number;
  systemMetadata: {
    source: 'manual' | 'ai_generated' | 'scraped';
    lastSynced: Date;
    tagsGeneratedByAI: boolean;
    hilbertSpaceVector: number[];
    flowScore?: number;
  }
}
