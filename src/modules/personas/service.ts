
import { UberPersona } from '@/types/uberPersona';
import { PersonaSearchParams } from './types';

export interface SearchResult {
  data: UberPersona[];
  meta: {
    pagination: {
      total: number;
      page: number;
      pageSize: number;
    };
  };
}

export class PersonaService {
  async searchPersonas(params: PersonaSearchParams): Promise<SearchResult> {
    // Mock implementation
    const mockPersonas: UberPersona[] = Array(10).fill(null).map((_, index) => ({
      id: `persona-${index + 1}`,
      name: `Persona Name ${index + 1}`,
      type: 'escort',
      isVerified: Math.random() > 0.5,
      isPremium: Math.random() > 0.7,
      isOnline: Math.random() > 0.6,
      location: 'New York, US',
      avatarUrl: `/assets/personas/persona-${index + 1}.jpg`
    }));
    
    return {
      data: mockPersonas,
      meta: {
        pagination: {
          total: 100,
          page: params.page || 1,
          pageSize: params.limit || 10
        }
      }
    };
  }
  
  async getPersonaById(id: string): Promise<UberPersona> {
    // Mock implementation
    return {
      id,
      name: 'Persona Name',
      type: 'escort',
      isVerified: true,
      isPremium: true,
      isOnline: true,
      location: 'New York, US',
      avatarUrl: '/assets/personas/default.jpg'
    };
  }
  
  async getPersonas(filters?: Record<string, any>): Promise<UberPersona[]> {
    // Mock implementation
    return Array(5).fill(null).map((_, index) => ({
      id: `persona-${index + 1}`,
      name: `Persona Name ${index + 1}`,
      type: 'escort',
      isVerified: Math.random() > 0.5,
      isPremium: Math.random() > 0.7,
      isOnline: Math.random() > 0.6,
      location: 'New York, US',
      avatarUrl: `/assets/personas/persona-${index + 1}.jpg`
    }));
  }
  
  async updatePersona(id: string, data: Partial<UberPersona>): Promise<UberPersona> {
    // Mock implementation
    return {
      id,
      name: data.name || 'Updated Persona',
      type: data.type || 'escort',
      isVerified: data.isVerified || false,
      isPremium: data.isPremium || false,
      isOnline: data.isOnline || false,
      location: data.location || 'New York, US',
      avatarUrl: data.avatarUrl || '/assets/personas/default.jpg'
    };
  }
  
  async getUserFavorites(userId: string): Promise<UberPersona[]> {
    // Mock implementation
    return Array(3).fill(null).map((_, index) => ({
      id: `favorite-${index + 1}`,
      name: `Favorite Persona ${index + 1}`,
      type: 'escort',
      isVerified: Math.random() > 0.3,
      isPremium: Math.random() > 0.5,
      isOnline: Math.random() > 0.7,
      location: 'New York, US',
      avatarUrl: `/assets/personas/favorite-${index + 1}.jpg`
    }));
  }
  
  async addToFavorites(userId: string, personaId: string): Promise<boolean> {
    // Mock implementation
    console.log(`Adding persona ${personaId} to favorites for user ${userId}`);
    return true;
  }
  
  async removeFromFavorites(userId: string, personaId: string): Promise<boolean> {
    // Mock implementation
    console.log(`Removing persona ${personaId} from favorites for user ${userId}`);
    return true;
  }
}

export const personaService = new PersonaService();
