import { UberPersona } from '@/types/uberPersona';
import { PersonaSearchParams } from '@/types/persona.d';

export class PersonaService {
  private baseUrl = `${process.env.API_URL || ''}/personas`;

  async fetchPersonaById(id: string): Promise<UberPersona> {
    // Mock implementation
    return {
      id,
      name: `Persona ${id}`,
      type: 'escort',
      avatarUrl: 'https://i.imgur.com/0y0tGXn.png',
      description: 'A mock persona',
      location: 'New York',
      services: [],
      languages: ['English'],
      isVerified: true,
      rating: 4.8,
      reviews: [],
      isOnline: true,
      isPremium: true,
      isFeatured: false,
      isAI: false,
    };
  }

  async searchPersonas(params: PersonaSearchParams): Promise<{ data: UberPersona[], pagination: { total: number, page: number, pageSize: number } }> {
    // Mock implementation for search
    const mockPersonas: UberPersona[] = Array(10).fill(null).map((_, index) => ({
      id: `persona-${index}`,
      name: `Persona ${index}`,
      type: 'escort',
      avatarUrl: 'https://i.imgur.com/0y0tGXn.png',
      description: 'A mock persona',
      location: 'New York',
      services: [],
      languages: ['English'],
      available: true,
      isVerified: index % 3 === 0,
      rating: 4.0 + Math.random(),
      reviews: [],
      isOnline: index % 2 === 0,
      isPremium: index % 4 === 0,
      isFeatured: index === 0,
      isAI: index % 5 === 0,
    }));

    return {
      data: mockPersonas,
      pagination: {
        total: 100,
        page: params.page || 1,
        pageSize: params.limit || 10
      }
    };
  }

  async getPersonaById(id: string): Promise<UberPersona> {
    return this.fetchPersonaById(id);
  }

  async getPersonas(params: PersonaSearchParams): Promise<{ data: UberPersona[], pagination: { total: number, page: number, pageSize: number } }> {
    return this.searchPersonas(params);
  }

  async getPersonaTrends(): Promise<any> {
    // Mock implementation
    return {
      popularKeywords: ['luxury', 'massage', 'dinner date'],
      topProfiles: ['profile-1', 'profile-2'],
      trendingSearches: ['high-end', 'verified', 'premium'],
    };
  }
}

export const personaService = new PersonaService();
