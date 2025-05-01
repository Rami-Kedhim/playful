
import { UberPersona } from "@/types/uberPersona";
import { PersonaSearchParams } from "@/types/persona";

export class PersonaService {
  private mockPersonas: UberPersona[] = [];
  
  constructor() {
    // Generate some mock personas for testing
    this.mockPersonas = Array(20).fill(0).map((_, i) => ({
      id: `persona-${i}`,
      name: `Persona ${i}`,
      type: ['escort', 'creator', 'companion'][i % 3] as any,
      avatarUrl: `https://picsum.photos/seed/persona${i}/200/200`,
      imageUrl: `https://picsum.photos/seed/persona${i}/800/600`,
      location: ['New York, US', 'Los Angeles, US', 'Miami, US', 'London, UK'][i % 4],
      isVerified: i % 3 === 0,
      isPremium: i % 5 === 0,
      description: `This is the description for Persona ${i}`,
      tags: [
        ['luxury', 'premium', 'elite'][i % 3],
        ['experienced', 'gentle', 'passionate'][i % 3]
      ],
      monetization: {
        hourlyRate: 200 + (i * 50),
        minRate: 150 + (i * 25),
        maxRate: 350 + (i * 75),
        acceptsUbx: i % 2 === 0
      },
      availability: {
        isOnline: i % 2 === 0,
        nextAvailable: new Date(Date.now() + (i * 8600000))
      }
    }));
  }
  
  /**
   * Search for personas based on the provided params
   */
  async searchPersonas(params: PersonaSearchParams): Promise<{ data: UberPersona[], meta: { total: number, limit: number, offset: number, page: number } }> {
    // Default values
    const limit = params.limit || 10;
    const offset = params.offset || 0;
    const page = params.page || 1;
    
    // Apply filters
    let filtered = [...this.mockPersonas];
    
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query))
      );
    }
    
    if (params.type) {
      filtered = filtered.filter(p => p.type === params.type);
    }
    
    if (params.verified) {
      filtered = filtered.filter(p => p.isVerified);
    }
    
    if (params.tags && params.tags.length > 0) {
      filtered = filtered.filter(p => 
        p.tags && params.tags?.some(tag => p.tags.includes(tag))
      );
    }
    
    // Apply pagination
    const paginatedResults = filtered.slice(offset, offset + limit);
    
    return {
      data: paginatedResults,
      meta: {
        total: filtered.length,
        limit,
        offset,
        page
      }
    };
  }

  /**
   * Get a persona by ID
   */
  async getPersonaById(id: string): Promise<UberPersona | null> {
    const persona = this.mockPersonas.find(p => p.id === id);
    return persona || null;
  }

  /**
   * Get multiple personas
   */
  async getPersonas(options: { ids?: string[], limit?: number } = {}): Promise<UberPersona[]> {
    if (options.ids) {
      return this.mockPersonas.filter(p => options.ids?.includes(p.id));
    }
    
    const limit = options.limit || 10;
    return this.mockPersonas.slice(0, limit);
  }
}

export const personaService = new PersonaService();
export default personaService;
