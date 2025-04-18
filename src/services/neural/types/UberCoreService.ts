
import { UberCoreSettings, UberSearchFilters } from '@/types/uber-ecosystem';
import { UberPersona } from '@/types/UberPersona';
import { SystemHealthMetrics } from '@/types/neural/NeuralSystemMetrics';

export interface UberCoreService {
  initialize: () => Promise<boolean>;
  shutdown: () => Promise<void>;
  getSettings: () => UberCoreSettings;
  updateSettings: (settings: Partial<UberCoreSettings>) => void;
  findNearestNeighbors: (personaId: string, count?: number) => UberPersona[];
  searchPersonas: (filters: UberSearchFilters) => UberPersona[];
  convertToUberPersona: (entity: any) => UberPersona | null;
  getStatus: () => Promise<{ status: string; metrics: SystemHealthMetrics }> | any;
  configure: (config: any) => Promise<void>;
  processUserInput: (userId: string, input: string, options?: any) => Promise<any>;
}
