
import { Persona } from "@/types/persona";

// Define the PersonaSearchParams interface here as well to avoid import issues
export interface PersonaSearchParams {
  query?: string;
  type?: string;
  status?: string;
  tags?: string[];
  verified?: boolean;
  limit?: number;
  offset?: number;
  page?: number;
  sort?: string;
  location?: string;
  gender?: string;
  minRating?: number;
  services?: string[];
  features?: string[];
}

class PersonaService {
  private baseUrl: string;
  private mockData: Persona[];
  
  constructor() {
    this.baseUrl = "https://api.example.com/personas";
    this.mockData = [];
    
    // Initialize with some mock data
    for (let i = 0; i < 20; i++) {
      this.mockData.push({
        id: `persona-${i}`,
        name: `Persona ${i}`,
        bio: `Bio for persona ${i}`,
        type: i % 2 === 0 ? "ESCORT" : "CLIENT",
        status: "ACTIVE",
        rating: 4 + Math.random(),
        verified: i % 3 === 0,
        online: i % 2 === 0,
        premium: i % 5 === 0,
      });
    }
  }
  
  async getPersonas(params: PersonaSearchParams): Promise<{ data: Persona[], pagination: { total: number, page: number, pageSize: number } }> {
    // Mock implementation
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = ((page - 1) * limit);
    
    // Filter based on params
    let filtered = [...this.mockData];
    if (params.query) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(params.query!.toLowerCase()));
    }
    if (params.type) {
      filtered = filtered.filter(p => p.type === params.type);
    }
    if (params.verified) {
      filtered = filtered.filter(p => p.verified);
    }
    
    const total = filtered.length;
    const paginatedData = filtered.slice(offset, offset + limit);
    
    return {
      data: paginatedData,
      pagination: { total, page, pageSize: limit }
    };
  }

  async getPersonaById(id: string): Promise<Persona | null> {
    const persona = this.mockData.find(p => p.id === id);
    return persona || null;
  }

  async updatePersona(id: string, data: Partial<Persona>): Promise<Persona> {
    const index = this.mockData.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error("Persona not found");
    }
    
    this.mockData[index] = { ...this.mockData[index], ...data };
    return this.mockData[index];
  }

  async getUserFavorites(userId: string): Promise<Persona[]> {
    // Mock implementation
    return this.mockData.slice(0, 5);
  }

  async addToFavorites(userId: string, personaId: string): Promise<boolean> {
    // Mock implementation
    return true;
  }

  async removeFromFavorites(userId: string, personaId: string): Promise<boolean> {
    // Mock implementation
    return true;
  }
}

export const personaService = new PersonaService();
export default personaService;
