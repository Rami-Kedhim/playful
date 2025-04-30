
import { UberPersona } from './UberPersona';

export interface FeaturedPersona {
  id: string;
  name: string;
  displayName: string; // Required in FeaturedPersona
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  avatarUrl?: string;
  location?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  tags?: string[];
}

export interface SystemStatusDisplay {
  operational: boolean;
  components: {
    lucie: string;
    hermes: string;
    oxum: string;
    orus: string;
    wallet: string;
  };
}

// Convert UberPersona array to FeaturedPersona array
export function convertToFeaturedPersonas(personas: UberPersona[]): FeaturedPersona[] {
  return personas.map(persona => ({
    id: persona.id,
    name: persona.name,
    displayName: persona.displayName || persona.name, // Ensure displayName is always provided
    type: persona.type,
    avatarUrl: persona.avatarUrl,
    location: persona.location,
    isVerified: persona.isVerified,
    isOnline: persona.isOnline,
    tags: persona.tags
  }));
}

// Convert raw system status data to SystemStatusDisplay format
export function formatSystemStatus(statusData: Record<string, any>): SystemStatusDisplay {
  return {
    operational: statusData.coreStatus === 'online',
    components: {
      lucie: statusData.hermesStatus || 'unknown',
      hermes: statusData.hermesStatus || 'unknown',
      oxum: statusData.oxumStatus || 'unknown',
      orus: statusData.orusStatus || 'unknown',
      wallet: statusData.walletStatus || 'unknown'
    }
  };
}
