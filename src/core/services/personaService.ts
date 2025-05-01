
import { UberPersona } from '@/types/uberPersona';

export class PersonaService {
  private static instance: PersonaService;
  
  private constructor() {}
  
  public static getInstance(): PersonaService {
    if (!PersonaService.instance) {
      PersonaService.instance = new PersonaService();
    }
    return PersonaService.instance;
  }
  
  public async getPersonaById(id: string): Promise<UberPersona> {
    // Mock implementation - in a real app, this would fetch from an API
    return {
      id,
      name: `Persona ${id.substring(0, 8)}`,
      type: 'escort',
      avatarUrl: `https://picsum.photos/seed/${id}/400/400`,
      location: 'New York, NY',
      rating: 4.8,
      reviewCount: 42,
      boostScore: 85,
      isVerified: true,
      tags: ['VIP', 'Premium'],
      bio: 'This is an example persona profile.',
      systemMetadata: {
        boostScore: 82,
        lastActive: new Date(),
        createdAt: new Date(),
        profileViews: 1250
      }
    };
  }
  
  public async getFeaturedPersonas(limit: number = 6): Promise<UberPersona[]> {
    // Mock implementation - in a real app, this would fetch from an API
    return Array.from({ length: limit }).map((_, index) => ({
      id: `persona-${index + 1}`,
      name: `Featured Persona ${index + 1}`,
      type: index % 3 === 0 ? 'escort' : index % 3 === 1 ? 'creator' : 'livecam',
      avatarUrl: `https://picsum.photos/seed/featured${index}/400/400`,
      location: 'Featured Location',
      rating: 4.5 + (index % 10) / 10,
      reviewCount: 30 + index,
      boostScore: 80 + index,
      isVerified: index % 3 === 0,
      tags: ['Featured', index % 2 === 0 ? 'Premium' : 'VIP'],
      bio: `This is featured persona #${index + 1}.`
    }));
  }
  
  public async searchPersonas(query: string, filters?: any): Promise<UberPersona[]> {
    // Mock implementation - in a real app, this would fetch from an API with actual filtering/searching
    console.log(`Searching personas with query: ${query}`, filters);
    
    return Array.from({ length: 12 }).map((_, index) => ({
      id: `search-${index + 1}`,
      name: `Search Result ${index + 1}`,
      type: index % 3 === 0 ? 'escort' : index % 3 === 1 ? 'creator' : 'livecam',
      avatarUrl: `https://picsum.photos/seed/search${index}/400/400`,
      location: 'Search Location',
      rating: 4.0 + (index % 20) / 10,
      reviewCount: 10 + index * 2,
      boostScore: 70 + index,
      isVerified: index % 2 === 0,
      tags: [query, index % 3 === 0 ? 'Premium' : 'Standard'],
      bio: `This is a search result for "${query}".`
    }));
  }
}

export const personaService = PersonaService.getInstance();
export default personaService;
